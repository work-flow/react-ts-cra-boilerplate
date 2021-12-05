/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module 'hooks'
declare module 'lib' {
  interface IShareData {
    title: string,
    desc: string,
    link: string,
    imgUrl: string,
  }
  
  function jrShare(shareData: IShareData): void
}
// declare module 'lib/*'
declare module 'utils'
declare module 'types/*'
declare module 'assets/*'

declare module 'axios-jsonp'
