const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const {
  resolve,
  makeAliasOfSrc,
  IS_PROD,
  isTrue
} = require('./build/utils')
const { UpyunUploadPlugin } = require('@jomsou/upload-webpack-plugin')
const upyun = require('upyun')

const {
  VUE_APP_TITLE,
  VUE_APP_STATIC_URL,
  UPYUN_WEB_SERVICE,
  UPYUN_WEB_OPERATOR,
  UPYUN_WEB_PASSWD,
  VUE_CDN_REMOTE_FILE_PATH,
  VUE_CDN_FILE_PATH,
  VUE_APP_REPORT,
  VUE_IS_USE_CDN
} = process.env

const plugins = []

if (IS_PROD) {
  plugins.push(
    new CopyPlugin([
      {
        from: resolve('src/assets/font/dist'),
        to: resolve('dist/assets/font')
      }
    ])
  )
  isTrue(VUE_IS_USE_CDN) && plugins.push(new UpyunUploadPlugin({
    sdk: upyun,
    serviceName: UPYUN_WEB_SERVICE,
    operatorName: UPYUN_WEB_OPERATOR,
    password: UPYUN_WEB_PASSWD,
    remoteFilePath: VUE_CDN_REMOTE_FILE_PATH,
    filePath: VUE_CDN_FILE_PATH,
    openConfirm: false
  }))
  isTrue(VUE_APP_REPORT) && plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  publicPath: isTrue(VUE_IS_USE_CDN) ? VUE_APP_STATIC_URL : '/',
  indexPath: 'index.html',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        ...makeAliasOfSrc
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: VUE_APP_TITLE,
        template: resolve('public/index.html'),
        filename: resolve('dist/index.html'),
        inject: true,
        alwaysWriteToDisk: true
      }),
      ...plugins
    ]
  },
  pluginOptions: {
    compression: {
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8
        // deleteOriginalAssets: true
      }
    }
  },
  chainWebpack: config => {
    if (IS_PROD) {
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.90], speed: 4 },
          gifsicle: { interlaced: false }
        })
    }

    return config
  }
}
