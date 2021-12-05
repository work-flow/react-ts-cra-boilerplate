import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vitePluginImport from 'vite-plugin-babel-import'
import html from 'vite-plugin-html'
import { configImageminPlugin } from './imagemin'
import { configCompressPlugin } from './compress'
import { upyunPlugin } from '@jomsou/vite-plugin-upload'
import upyun from 'upyun'
import { configVisualizerConfig } from './visualizer'
import { isTrue } from '../../utils'
import { IEnv } from '../../types'

export default function createVitePlugins (
  isBuild: boolean,
  env: IEnv
): Plugin[] {
  const {
    VITE_APP_TITLE,
    VITE_CDN_REMOTE_FILE_PATH,
    VITE_CDN_FILE_PATH,
    VITE_BUILD_REPORT,
    VITE_IS_USE_CDN
  } = env

  const {
    UPYUN_WEB_SERVICE,
    UPYUN_WEB_OPERATOR,
    UPYUN_WEB_PASSWD
  } = process.env

  const importLib1 = {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style (name: string) {
      return `vant/es/${name}/index.css`
    }
  }
  const vitePlugins: Plugin[] = [
    vue(),
    vueJsx(),
    // vite-plugin-html
    // @ts-ignore
    html({
      inject: {
        data: {
          title: VITE_APP_TITLE
        }
      }
    }),
    vitePluginImport([
      // @ts-ignore
      importLib1
    ])
  ]

  if (isBuild) {
    // @vitejs/plugin-legacy
    vitePlugins.push(legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }))

    // vite-plugin-imagemin
    vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(
      // @ts-ignore
      configCompressPlugin('gzip', false)
    )

    // vite-plugin-upload
    isTrue(VITE_IS_USE_CDN) && vitePlugins.push(upyunPlugin({
      sdk: upyun,
      serviceName: UPYUN_WEB_SERVICE,
      operatorName: UPYUN_WEB_OPERATOR,
      password: UPYUN_WEB_PASSWD,
      remoteFilePath: VITE_CDN_REMOTE_FILE_PATH,
      filePath: VITE_CDN_FILE_PATH,
      openConfirm: false
    }))

    // rollup-plugin-visualizer
    isTrue(VITE_BUILD_REPORT) && vitePlugins.push(
      // @ts-ignore
      configVisualizerConfig(isBuild)
    )
  }
  return vitePlugins
}
