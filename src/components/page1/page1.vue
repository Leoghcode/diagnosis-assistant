<template>
  <div id="page1">
    <el-row class="row1" :gutter="15">
      <el-col :sm="24" :md="12">
        <el-card class="box-card-300">
          <ill-instance @choose="handleInstanceChoose($event)"></ill-instance>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card-300">
          <search-patient :name="searchName"></search-patient>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :sm="24" :md="12">
        <el-card class="box-card-400">
          <diagnosis-history></diagnosis-history>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card-400">
          <diagnosis-picture></diagnosis-picture>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import illInstance from './illInstance'
  import searchPatient from './searchPatient'
  import diagnosisHistory from './diagnosisHistory'
  import diagnosisPicture from './diagnosisPicture'

  export default {
    name: 'page1',
    components: {
      illInstance: illInstance,
      searchPatient: searchPatient,
      diagnosisHistory: diagnosisHistory,
      diagnosisPicture: diagnosisPicture
    },
    data() {
      return {
        searchName: ''
      }
    },
    methods: {
      handleInstanceChoose(patientName) {
        this.searchName = patientName;
      }
    }
  }
</script>

<style scoped>
  #page1 {
    padding: 10px 20px;
  }

  .row1 {
    margin-bottom: 10px;
  }

  .box-card-300 {
    padding: 3px;
    height: 350px;
  }
  .box-card-400 {
    padding: 3px;
    height: 400px;
  }
</style>