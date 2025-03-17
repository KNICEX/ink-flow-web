import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/LayoutView.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/home/HomeView.vue'),
        },
        {
          path: '/user/:account',
          name: 'user',
          component: () => import('../views/user/UserView.vue'),
        },
      ],
    },
    {
      path: '/dashboard/:account',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('../views/dashboard/DashboardHome.vue'),
        },
        {
          name: 'editor',
          path: 'editor/:id?',
          component: () => import('../views/dashboard/InkEditor.vue'),
        },
        {
          path: 'ink/:status?',
          name: 'ink',
          component: () => import('../views/dashboard/InkView.vue'),
        },
        {
          path: 'draft',
          name: 'draft',
          component: () => import('../views/dashboard/DraftView.vue'),
        },
      ],
    },
  ],
})

router.afterEach(() => {
  nextTick(() => {
    window.scrollTo({ top: 0 })
  })
})

export default router
