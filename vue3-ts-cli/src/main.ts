import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Skeleton } from 'vant'
import 'normalize.css'
import { utils, share } from '@jomsou/utils'

if (/test/.test(window.location.href)) {
  utils.injectScript(
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vConsole/3.4.0/vconsole.min.js',
    () => new (window as any).VConsole()
  )

  console.log('>>>', share)
}

createApp(App)
  .use(router)
  .use(Button)
  .use(Skeleton)
  .mount('#app')
