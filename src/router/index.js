import Vue from 'vue'
import Router from 'vue-router'
/* Layout */

import Layout from '../views/layout/Layout'
Vue.use(Router)

export const route = [
  { path: '/404', component: () => import('@/views/404') },
  {
    path: '/',
    component: Layout,
    redirect: '/device',
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/device/index'),
        meta: {
          title: ''
        },
      }
    ]
  },
  
  {
    path: '/device',
    component: Layout,
    name: 'device',
    redirect: '/device/index',
    meta: {
      title: '计量器管理'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/device/index'),
        meta: {
          title: '计量器列表'
        }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/device/add'),
        meta: {
          title: '添加计量器'
        }
      },
      {
        path: 'view',
        name: 'view',
        component: () => import('@/views/device/add'),
        meta: {
          title: '查看计量器'
        }
      },
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/device/add'),
        meta: {
          title: '修改计量器'
        }
      }
    ]
  },



 
  //路由添加 404 需放置最后一位


  { path: '*', redirect: '/404' }
]
export default new Router({
  // mode: 'history'
  scrollBehavior: () => ({ y: 0 }),
  routes: route
})
