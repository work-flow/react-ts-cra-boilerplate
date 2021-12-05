import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button } from 'vant'
import 'normalize.css'

if (/test/.test(window.location.href)) {
  new (window as any).VConsole()
}

createApp(App)
  .use(router)
  .use(Button)
  .mount('#app')
