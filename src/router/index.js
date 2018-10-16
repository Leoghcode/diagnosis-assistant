import Vue from 'vue'
import Router from 'vue-router'

import diagnosisHistory from '@/components/diagnosisHistory'
import diagnosisPicture from '@/components/diagnosisPicture'
import HelloWorld from '@/components/HelloWorld'
import InstanceContainer from '@/components/InstanceContainer'
import MyTable from '@/components/MyTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/history',
      name: 'diagnosisHistory',
      component: diagnosisHistory
    },
    {
      path: '/picture',
      name: 'diagnosisPicture',
      component: diagnosisPicture
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ic',
      name: 'InstanceContainer',
      component: InstanceContainer
    },
    {
      path: '/table',
      name: 'MyTable',
      component: MyTable
    }
  ]
})
