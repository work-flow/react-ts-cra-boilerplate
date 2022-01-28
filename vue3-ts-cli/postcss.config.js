module.exports = ({
  file
}) => {
  return {
    plugins: {
      'postcss-pxtorem': {
        rootValue ({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75
        },
        propList: ['*']
      },
      autoprefixer: {
        browsers: ['> 1%', 'last 5 versions']
      }
    }
  }
}
