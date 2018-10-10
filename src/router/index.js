import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InstanceContainer from '@/components/InstanceContainer'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ic',
      name: 'InstanceContainer',
      component: InstanceContainer
    }
  ]
})
