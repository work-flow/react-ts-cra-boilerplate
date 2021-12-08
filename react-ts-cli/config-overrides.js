/* config-overrides.js */
// https://github.com/timarney/react-app-rewired
// https://github.com/arackaf/customize-cra/blob/master/api.md#setwebpacktargettarget
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  override,
  addLessLoader,
  addWebpackPlugin,
  addWebpackAlias,
  addBundleVisualizer,
  overrideDevServer,
  watchAll,
  addPostcssPlugins
} = require('customize-cra')
const {
  resolve,
  makeAliasOfSrc,
  isTrue
} = require('./lib/utils')
const { UpyunUploadPlugin } = require('@jomsou/upload-webpack-plugin')
const upyun = require('upyun')

const {
  REACT_APP_TITLE,
  // REACT_APP_STATIC_URL,
  UPYUN_WEB_SERVICE,
  UPYUN_WEB_OPERATOR,
  UPYUN_WEB_PASSWD,
  REACT_CDN_REMOTE_FILE_PATH,
  REACT_CDN_FILE_PATH,
  REACT_BUILD_REPORT,
  REACT_IS_USE_CDN
} = process.env

module.exports = {
  webpack: override(
    addLessLoader(),
    addPostcssPlugins([require('autoprefixer')]),
    addPostcssPlugins([require('postcss-px2rem')({ remUnit: 37.5 })]),
    addWebpackAlias(makeAliasOfSrc),
    addWebpackPlugin(new HtmlWebpackPlugin({
      title: REACT_APP_TITLE,
      template: resolve('public/index.html'),
      filename: resolve('dist/index.html'),
      inject: true,
      alwaysWriteToDisk: true
    })),
    isTrue(REACT_IS_USE_CDN) && addWebpackPlugin(
      new UpyunUploadPlugin({
        sdk: upyun,
        serviceName: UPYUN_WEB_SERVICE,
        operatorName: UPYUN_WEB_OPERATOR,
        password: UPYUN_WEB_PASSWD,
        remoteFilePath: REACT_CDN_REMOTE_FILE_PATH,
        filePath: REACT_CDN_FILE_PATH,
        openConfirm: false
      })
    ),
    isTrue(REACT_BUILD_REPORT) && addBundleVisualizer()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
}
