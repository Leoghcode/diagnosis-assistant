<template>
  <div id="page1">
    <el-row class="row1" :gutter="15">
      <el-col :sm="24" :md="12">
        <el-card class="box-card-300">
          <patient-table :patient-id="patientId" :loading.sync="autoSearch1" @show-history="showHistory($event)"></patient-table>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card-300">
          <ill-instance @choose="handleInstanceChoose($event)"></ill-instance>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :sm="24" :md="12">
        <el-card class="box-card-400">
          <diagnosis-history :patient-id="patientId" :pre-case-data="preCaseData" :case-history="caseHistory" @check-detail="checkDetail($event)" :loading.sync="autoSearch2"></diagnosis-history>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card-400">
          <diagnosis-picture :case-id="historyDetailId"></diagnosis-picture>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import illInstance from './illInstance'
  import patientTable from './patientTable'
  import diagnosisHistory from './diagnosisHistory'
  import diagnosisPicture from './diagnosisPicture'

  export default {
    name: 'page1',
    components: {
      illInstance: illInstance,
      patientTable: patientTable,
      diagnosisHistory: diagnosisHistory,
      diagnosisPicture: diagnosisPicture
    },
    data() {
      return {
        patientId: '',
        preCaseData: {preCaseId: '', preCaseImages: []},
        caseHistory: [],
        historyDetailId: '',
        autoSearch1: false,
        autoSearch2: false,
      }
    },
    watch: {
      patientId: function(val) {
        if(val != '') {
          this.autoSearch1 = true;
        }
      },
      caseHistory: {
        handler: function(val) {
          this.emptyDetail();
          if(val.length != 0) {
            this.autoSearch2 = true;
          }
        }
      }
    },
    methods: {
      handleInstanceChoose(patient) {
        this.patientId = patient.patientId;
        this.preCaseData = patient.preCaseData;
      },
      checkDetail(historyId) {
        this.historyDetailId = historyId;
      },
      showHistory(caseHistory) {
        this.caseHistory = caseHistory;
      },
      emptyDetail() {
        this.historyDetailId = '';
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