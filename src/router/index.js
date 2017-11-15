import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/index'
import Manage from '@/components/manage/manage'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/manage',
      name: 'Manage',
      component: Manage
    }
  ]
})
