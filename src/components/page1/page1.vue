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
          <search-patient :query="searchQueryString" :loading.sync="autoSearch1" @check-history="checkHistory($event)"></search-patient>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :sm="24" :md="12">
        <el-card class="box-card-400">
          <diagnosis-history :query="historyQueryString" @check-detail="checkDetail($event)" :loading.sync="autoSearch2"></diagnosis-history>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card-400">
          <diagnosis-picture :img-list="historyDetail.imgList" :details="historyDetail.presDetail"></diagnosis-picture>
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
        searchQueryString: '',
        historyQueryString: '',
        historyDetail: {
          imgList: [],
          presDetail: ''
        },
        autoSearch1: false,
        autoSearch2: false,
      }
    },
    watch: {
      searchQueryString: function(val) {
        if(val != '') {
          this.autoSearch1 = true;
        }
      },
      historyQueryString: function(val) {
        this.emptyDetail();
        if(val != '') {
          this.autoSearch2 = true;
        }
      }
    },
    methods: {
      handleInstanceChoose(patientId) {
        this.searchQueryString = patientId;
        this.historyQueryString = patientId;
      },
      checkDetail(patientHistory) {
        this.historyDetail.imgList = patientHistory.images;
        this.historyDetail.presDetail = patientHistory.prescriptionDetail;
      },
      checkHistory(historyQueryString) {
        this.historyQueryString = historyQueryString;
      },
      emptyDetail() {
        this.historyDetail.imgList = [];
        this.historyDetail.presDetail = '';
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