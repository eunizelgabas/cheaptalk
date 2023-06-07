import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostView from '../views/PostView.vue'
import DashboardView from '../views/DashboardView.vue'
import AddViews from '../views/AddViews.vue'
import WallView from '../views/WallView.vue'

import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta:{
        requiresAuth:true
      }
    },
 
    {
      path: '/post',
      name: 'post',
      component: PostView,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/add',
      name: 'add',
      component: AddViews,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/:uid/wall',
      name: 'wall',
      component: WallView,
      meta:{
        requiresAuth:true
      }
    },

  ]
})
router.beforeEach((to, from,next)=>{
  if(to.path ==='/login' && auth.currentUser){
    if(auth.currentUser.emailVerified){
      next('/dashboard')
      return;
    }
  }

  if(to.matched.some(record=>record.meta.requiresAuth)&& !auth.currentUser){
    next('login')
    return;
  }
  next();
})
export default router
