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
  import mockHistory from '../../assets/mock/mockHistory';


  export default {
    name: 'diagnosisHistory',
    components: {
      illCaseForm: illCaseForm
    },
    data () {
      return {
        msg: '病例列表与诊断历史图片界面展示',
        tableData3: mockHistory,
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
