import Vue from 'vue'
import Router from 'vue-router'

import page1 from '@/components/page1/page1'
import nurse from '@/components/nurse/nurse'
import table from '@/components/common/PaulExp'

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
      name: 'nurse',
      component: nurse
    },
    {
      path: '/table',
      name: 'table',
      component: table
    }
  ]
})
