import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard', 
      meta: { requiresAuth: true },
      component: () => import('../views/DashBoard.vue'),
     
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    }
  ],
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isLogin) {
      return { path: '/login'}
    }
    else{
      return true
    }
  })
export default router

// route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/DashBoard.vue'),