import Vue from 'vue'
import Router from 'vue-router'

import page1 from '@/components/page1/page1'
import nurse from '@/components/nurse/nurse'
import page2 from '@/components/page2/page2'
import page3 from '@/components/page3/page3'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/nurse',
      name: 'page4',
      component: nurse
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
    }
  ]
})
