import Vue from 'vue'
import Router from 'vue-router'

import page1 from '@/components/page1/page1'
import nurse from '@/components/nurse/nurse'
<<<<<<< HEAD
import columnChart from '@/components/page3/columnChart'
import lineChart from '@/components/page3/lineChart'
import pieChart from '@/components/page3/pieChart'
import page3 from '@/components/page3/page3'
=======
import table from '@/components/common/PaulExp'
>>>>>>> paul

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
<<<<<<< HEAD
      path: '/columnChart',
      name: 'columnChart',
      component: columnChart
    },
    {
      path: '/lineChart',
      name: 'lineChart',
      component: lineChart
    },
    {
      path: '/pieChart',
      name: 'pieChart',
      component: pieChart
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
=======
      path: '/table',
      name: 'table',
      component: table
>>>>>>> paul
    }
  ]
})
