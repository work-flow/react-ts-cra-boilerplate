import { Router } from 'vue-router'

export default function refresh (router: Router) {
  router.go(0)
}
