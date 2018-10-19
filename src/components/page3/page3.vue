<template>
  <div id="page1">
    <el-row class="row1" :gutter="15">
      <el-col :sm="24" :md="8">
        <el-card class="box-card-400">
          <columnChart></columnChart>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8">
        <el-card class="box-card-400">
          <lineChart></lineChart>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8">
        <el-card class="box-card-400">
          <pieChart></pieChart>
        </el-card>
      </el-col>    
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import columnChart from './columnChart'
  import lineChart from './lineChart'
  import pieChart from './pieChart'

  export default {
    name: 'page3',
    components: {
      columnChart: columnChart,
      lineChart: lineChart,
      pieChart: pieChart,
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