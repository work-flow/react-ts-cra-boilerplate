const path = require('path')
const {
  lstatSync,
  readdirSync
} = require('fs')

const resolve = function (pathname) {
  return path.join(__dirname, '../', pathname)
}

const isDirectory = source => lstatSync(source).isDirectory()
// 获取 src 下的所有目录

const getDirectories = source =>
  readdirSync(source)
    .map(name =>
      path.join(source, name)
    ).filter(isDirectory)
    .map(file =>
      file.slice(file.lastIndexOf('/') + 1)
    )

// 将 src 下的目录拼接成 alias
const makeAliasOfSrc = getDirectories(
  path.resolve(process.cwd(),
    'src'
  )).map(key => {
  const arr = {
    [key]: path.resolve(process.cwd(), `src/${key}`)
  }
  return arr
}).reduce((acc, cur) => {
  return {
    ...acc,
    ...cur
  }
})

const isTrue = val => val === 'true'

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  resolve,
  makeAliasOfSrc,
  IS_PROD,
  isTrue
}
