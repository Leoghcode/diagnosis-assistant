import Vue from 'vue'
import Router from 'vue-router'
import diagnosisHistory from '@/components/diagnosisHistory'
import diagnosisPicture from '@/components/diagnosisPicture'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/history',
      name: 'diagnosisHistory',
      component: diagnosisHistory
    },{
      path: '/picture',
      name: 'diagnosisPicture',
      component: diagnosisPicture
    }
  ]
})
