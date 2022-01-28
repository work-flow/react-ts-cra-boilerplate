import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

const IS_PROD = process.env.NODE_ENV === 'production'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/Home/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('pages/NotFound/index.vue')
  }
]

const router = createRouter({
  history: IS_PROD
    ? createWebHistory('/activity/vue3-ts-vite/')
    : createWebHashHistory('/'),
  routes
})

export default router
