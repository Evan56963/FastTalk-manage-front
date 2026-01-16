import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import DashBoard from '../views/DashBoard.vue'
import Login from '../views/Login.vue'

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
      component: Admin,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
})

export default router

// route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/DashBoard.vue'),