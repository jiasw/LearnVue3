import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      alias: '/login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      meta: { requiresAuth: false },
      redirect: '/home/user',
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/userinfo/index.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/about.vue'),
        },
      ],
    },
  ],
})

export default router
