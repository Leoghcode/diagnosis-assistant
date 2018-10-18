<template>
  <div class="history">
    <!--<h1>{{ msg }}</h1>-->
    <div class="text-right margin-bottom-10">
      <el-button type="primary" plain @click="openIllForm">创建新病例</el-button>
    </div>
    <hr />
    <el-table
      :data="tableData3"
      style="width: 100%"
      height="250"
      :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="hospital"
        label="就诊地点"
        >
      </el-table-column>
      <el-table-column
        prop="diagnose_res"
        label="诊断结果"
        >
      </el-table-column>
      <el-table-column
        prop="prescription"
        label="处方"
        >
      </el-table-column>
    </el-table>
    <el-row>
      <ill-case-form :open.sync="illFormOpen"></ill-case-form>
    </el-row>
  </div>
</template>

<script>
  import illCaseForm from './sub/illCaseForm';

  export default {
    name: 'diagnosisHistory',
    components: {
      illCaseForm: illCaseForm
    },
    data () {
      return {
        msg: '病例列表与诊断历史图片界面展示',
        tableData3: [{
          date: '2018-05-07',
          name: '王小虎',
          hospital: '嘉定中心医院',
          diagnose_res: '湿疹',
          prescription: '盐酸左氧氟沙星0.4g静脉输液',
        },{
          date: '2018-07-05',
          name: '王小虎',
          hospital: '嘉定中心医院',
          diagnose_res: '湿疹',
          prescription: '上清片',
        },{
          date: '2018-07-12',
          name: '王小虎',
          hospital: '嘉定中心医院',
          diagnose_res: '湿疹',
          prescription: '甲硝锉片',
        },{
          date: '2018-07-27',
          name: '王小虎',
          hospital: '嘉定中心医院',
          diagnose_res: '湿疹',
          prescription: '盐酸左氧氟沙星0.4g静脉输液',
        },{
          date: '2018-08-23',
          name: '王小虎',
          hospital: '同济大学校医院',
          diagnose_res: '粉刺',
          prescription: '维生素C0.5g静脉输液',
        },{
          date: '2018-08-30',
          name: '王小虎',
          hospital: '嘉定中心医院',
          diagnose_res: '粉刺',
          prescription: '盐酸左氧氟沙星0.4g静脉输液',
        },{
          date: '2018-09-07',
          name: '王小虎',
          hospital: '同济大学校医院嘉定分院',
          diagnose_res: '股癣',
          prescription: '股癣药膏',
        },{
          date: '2018-09-22',
          name: '王小虎',
          hospital: '嘉定中心医院',
          diagnose_res: '股癣',
          prescription: '股癣药膏',
        }],
        illFormOpen: false,
      }
    },
    methods: {
      openIllForm() {
        this.illFormOpen = true;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .text-right {
    text-align: right;
  }
  .history {
  }
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
</style>
