import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Skeleton } from 'vant'
import 'normalize.css'
import { imageService, utils, share, Validator, is } from '@jomsou/utils'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

if (/test/.test(window.location.href)) {
  utils.injectScript(
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vConsole/3.4.0/vconsole.min.js',
    () => new (window as any).VConsole()
  )

  console.log('>>>', share(axios, jsonpAdapter, {
    title: '测试',
    desc: '测试',
    link: 'http://test.jomsou.com/',
    imgUrl: 'http://test.jomsou.com/static/img/logo.png'
  }))

  imageService.getWebpImage('', {
  })

  const a = ''
  let b
  const c = ''
  const validates1 = [
    {
      params: a,
      rule: 'isNonEmpty,isEmail',
      errMsg: '邮箱不能为空,邮箱格式不正确'
    },
    {
      params: c,
      rule: [{
        isValidName () {
        }
      }, 'isNonEmpty'],
      errMsg: 'c不为姓名,c姓名不能为空'
    },
    {
      params: b,
      rule: 'isNonEmpty',
      errMsg: 'b不能为空'
    }
  ]
  const validator = new Validator()
  validator.validate(validates1)
  validator.addRule({
    isValidName () {
    }
  })
}

createApp(App)
  .use(router)
  .use(Button)
  .use(Skeleton)
  .mount('#app')
