import path from 'path'
import {
  lstatSync,
  readdirSync
} from 'fs'

export const resolve = function (pathname: string) {
  return path.join(__dirname, '../', pathname)
}

const isDirectory = (source: string) => lstatSync(source).isDirectory()
// 获取 src 下的所有目录

const getDirectories = (source: string) =>
  readdirSync(source)
    .map(name =>
      path.join(source, name)
    ).filter(isDirectory)
    .map(file =>
      file.slice(file.lastIndexOf('/') + 1)
    )

// 将 src 下的目录拼接成 alias
export const makeAliasOfSrc = getDirectories(
  path.resolve(process.cwd(),
    'src'
  )).map(key => {
  return {
    [key]: path.resolve(process.cwd(), `src/${key}`)
  }
}).reduce((acc, cur) => {
  acc = {
    ...acc,
    ...cur
  }
  return acc
})

export const isTrue = val => val === 'true'
