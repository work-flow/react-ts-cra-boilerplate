import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import { isTrue, makeAliasOfSrc } from './build/utils'
import createVitePlugins from './build/vite/plugin'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_STATIC_URL, VITE_IS_USE_CDN } = env
  return {
    base: isBuild && isTrue(VITE_IS_USE_CDN) ? VITE_APP_STATIC_URL : '/',
    resolve: {
      alias: {
        ...makeAliasOfSrc
      }
    },
    build: {
      sourcemap: isBuild ? false : 'inline'
    },
    plugins: createVitePlugins(isBuild, env),
    server: {
      proxy: {
        // 字符串简写写法
        '/foo': 'http://localhost:4567',
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
