import { createRouter, createWebHistory } from 'vue-router'
import QQGroups from '../views/QQGroups.vue'
import FriendLinks from '../views/FriendLinks.vue'
import GitHub from '../views/GitHub.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'qq-groups',
      component: QQGroups
    },
    {
      path: '/friend-links',
      name: 'friend-links',
      component: FriendLinks
    },
    {
      path: '/github',
      name: 'github',
      component: GitHub
    }
  ]
})

export default router
