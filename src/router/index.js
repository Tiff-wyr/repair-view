import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import authRoutes from './authRoutes'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/


export const constantRouterMap = [
  {path: '/',component: Layout,},
  // {path: '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true},
   {path: '/404', component: () => import('@/views/404'), hidden: true},
   // {path: '/forgetPass', component: () => import('@/views/forgetPass'), hidden: true},
   {path: '/dashboard', name: 'dashboard', component: () => import('@/views/dashboard/index'), hidden: true},
]

const router = new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  const level = store.state.userInfo.level
  let routers = []
  if(level == 0){
    router.addRoutes(authRoutes.repairRoutes)
    routers = authRoutes.repairRoutes
  }
  router.options.routes = [...constantRouterMap, ...routers]
  next()
})

export default router
