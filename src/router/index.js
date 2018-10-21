import Vue from 'vue'
import Router from 'vue-router'

import page1 from '@/components/page1/page1'
import nurse from '@/components/nurse/nurse'
import columnChart from '@/components/page3/columnChart'
import lineChart from '@/components/page3/lineChart'
import pieChart from '@/components/page3/pieChart'
import page3 from '@/components/page3/page3'
import patientTable from '@/components/page1/patientTable'
import storageTable from '@/components/page3/storageTable'
import presTemplateTable from '@/components/page2/presTemplateTable'
import prescriptionTable from '@/components/page2/prescriptionTable'
import diseaseTable from '@/components/page2/diseaseTable'
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
    },
    {
      path: '/storageTable',
      name: 'storageTable',
      component: storageTable
    },
    {
      path: '/presTemplateTable',
      name: 'presTemplateTable',
      component: presTemplateTable
    },
    {
      path: '/prescriptionTable',
      name: 'prescriptionTable',
      component: prescriptionTable
    },
    {
      path: '/diseaseTable',
      name: 'diseaseTable',
      component: diseaseTable
    },

  ]
})
