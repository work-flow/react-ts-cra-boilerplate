/* config-overrides.js */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rewireLess = require('react-app-rewire-less-modules')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const {
  resolve,
  makeAliasOfSrc,
  isTrue
} = require('./lib/utils')
const { UpyunUploadPlugin } = require('@jomsou/upload-webpack-plugin')
const upyun = require('upyun')

const {
  REACT_APP_TITLE,
  REACT_APP_STATIC_URL,
  UPYUN_WEB_SERVICE,
  UPYUN_WEB_OPERATOR,
  UPYUN_WEB_PASSWD,
  REACT_CDN_REMOTE_FILE_PATH,
  REACT_CDN_FILE_PATH,
  REACT_BUILD_REPORT,
  REACT_IS_USE_CDN
} = process.env

module.exports = function override (config, env) {
  // config = rewireLess(config, env)

  // // with loaderOptions
  // config = rewireLess.withLoaderOptions({
  // })(config, env)

  config.resolve.alias = {
    ...makeAliasOfSrc
  }

  config.plugins.push(
    new HtmlWebpackPlugin({
      title: REACT_APP_TITLE,
      template: resolve('public/index.html'),
      filename: resolve('dist/index.html'),
      inject: true,
      alwaysWriteToDisk: true
    })
  )

  // config.devServer = configFunction => {
  //   return (proxy, allowedHost) => {
  //     const config = configFunction(proxy, allowedHost)
  //     config.proxy = {}
  //   }
  // }

  if (env === 'production') {
    config.output = {
      // libraryTarget: 'umd',
      path: resolve('dist'),
      // filename: 'assets/js/[name].[contenthash:5].js',
      // chunkFilename: 'assets/js/chunk.[name].[chunkhash:5].js',
      publicPath: REACT_APP_STATIC_URL
    }

    isTrue(REACT_IS_USE_CDN) && config.plugins.push(
      new UpyunUploadPlugin({
        sdk: upyun,
        serviceName: UPYUN_WEB_SERVICE,
        operatorName: UPYUN_WEB_OPERATOR,
        password: UPYUN_WEB_PASSWD,
        remoteFilePath: REACT_CDN_REMOTE_FILE_PATH,
        filePath: REACT_CDN_FILE_PATH,
        openConfirm: false
      })
    )

    isTrue(REACT_BUILD_REPORT) && config.plugins.push(
      new BundleAnalyzerPlugin()
    )
  }
  return config
}
