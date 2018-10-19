<template>
  <div id="table">
    <el-row v-loading="loading">
      <h1>{{msg}}</h1>
      <el-row class="margin-bottom-10">
        <el-col :span="1" >
          <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </el-col>
        <el-col :span="6" :offset="17">
          <el-input
          placeholder="请输入姓名"
          v-model="inputName"
          clearable
          prefix-icon="el-icon-search"
          @change="inputChangeHandler"
          ></el-input>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        style="width:100%"
        border
        highlight-current-row
        :default-sort="{prop: 'index',order: 'ascending'}"
      >
        <el-table-column
          prop="index"
          label="序号"
          sortable
        ></el-table-column>
        <el-table-column
          prop="value"
          label="姓名"
          sortable
        ></el-table-column>
        <el-table-column
          prop="id"
          label="手机号"
          sortable
        ></el-table-column>
        <el-table-column
          prop="risk"
          label="风险等级"
          :filters="filters"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="searchHistory(scope.row)" type="text" size="small">查看历史</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import patients from '../../assets/mock/mockPatients';

export default {
  name: 'searchPatient',
  data(){
    return{
      tableData:[],
      store:[],
      msg:'',
      // placeholder:'请输入姓名',
      inputName:'',
      filters:[{text:'一级',value:1},{text:'二级',value:2},{text:'三级',value:3}],
      timeout:null,
    };
  },
  props: [
    'query', 'loading'
  ],
  watch: {
    query: function(val) {
      // emulate the data call from backend
      var self = this;
      window.setTimeout(function(){
        self.$emit('update:loading', false);
        self.inputName = val;
        self.inputChangeHandler(self.inputName);
      }, 800);
    }
  },
  methods:{
    loadAll(){
      var tableData=patients;
      return tableData;
    },
    filterHandler(value,row,cloumn){
      return row.risk===value;
    },
    queryAsync(queryString,cb){
      var tableData=this.tableData;
      var result=queryString?tableData.filter(this.createStateFilter(queryString)):tableData;

      console.log(result);

      clearTimeout(this.timeout);
      this.timeout=setTimeout(()=>{
        cb(result);
      },3000*Math.random());
    },
    createStateFilter(queryString){
      return (state)=>{
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase())===0);
      };
    },
    inputChangeHandler(queryString){
      var tableData=this.store;
      this.tableData=queryString?tableData.filter(this.createStateFilter(queryString)):tableData;
    },
    searchHistory(row) {
      this.$emit('check-history', row.value);
    }
  },
  mounted(){
    this.store=this.loadAll();
    this.tableData=this.store;
  }
};
</script>

<style scoped>
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
</style>