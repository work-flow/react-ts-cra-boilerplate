module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }, 'vant'
    ],
    [
      'import', {
        libraryName: '@jomsou/utils',
        libraryDirectory: 'dist'
      }, '@jomsou/utils'
    ],
    ['@babel/plugin-transform-runtime', {
      include: ['./node_modules/vue-i18n'],
      exclude: []
    }]
    // ['@jomsou/clear-log', {
    //   disable: false
    // }]
  ]
}
