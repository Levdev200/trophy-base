import { createRouter, createWebHistory } from 'vue-router'
import TrofeosView from '../views/TrofeosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'trofeos',
      component: TrofeosView,
    },
  ],
})

export default router