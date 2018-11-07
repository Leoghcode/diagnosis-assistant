<template>
  <div class="history">
    <el-row v-loading="loading">
      <!--<h1>{{ msg }}</h1>-->
      <div class="text-right margin-bottom-10">
        <el-button type="primary" plain @click="openIllForm">创建新病例</el-button>
      </div>
      <hr />
      <el-table
        :data="filterHistories"
        style="width: 100%"
        height="250"
        size="mini"
        :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="dateTime"
          label="日期"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="description"
          label="诊断结果"
          >
        </el-table-column>
        <el-table-column
          prop="fee"
          label="费用"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="checkDetail(scope.row)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <ill-case-form :open.sync="illFormOpen" :patient-id="patientId" :pre-case-data="preCaseData" @newcase="addNewCase"></ill-case-form>
      </el-row>
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
        illFormOpen: false,
        filterHistories: []
      }
    },
    props: [
      'patientId', 'caseHistory','loading', 'preCaseData'
    ],
    watch: {
      caseHistory: {
        handler: function(val){
          // emulate the data call from backend
          var self = this;
          window.setTimeout(function(){
            self.$emit('update:loading', false);
            // prop 'query' is a string used for search
            self.search(val);
          }, 800);
        }
      }
    },
    methods: {
      openIllForm() {
        this.illFormOpen = true;
      },
      search(val){
        // 首先清空
        this.filterHistories = this.caseHistory;

      },
      checkDetail(val){
        this.$emit('check-detail', val.id);
      },
      addNewCase(newCase) {
        // {id: 3, fee: 200, onset: null, dateTime: "43162", description: "情况严重"}
        this.filterHistories.push(newCase);
      }
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
