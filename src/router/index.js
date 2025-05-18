import { createRouter, createWebHistory } from 'vue-router'
import QQGroups from '../views/QQGroups.vue'
import FriendLinks from '../views/FriendLinks.vue'
import GitHub from '../views/GitHub.vue'
import Comments from '../views/Comments.vue'
import Promotion from '../views/Promotion.vue'

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
    },
    {
      path: '/comments',
      name: 'comments',
      component: Comments
    },
    // {
    //   path: '/promotion',
    //   name: 'promotion',
    //   component: Promotion
    // }
  ]
})

export default router
