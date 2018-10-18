<template>
  <div id="table">
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
    </el-table>
  </div>
</template>

<script>
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
    'name'
  ],
  watch: {
    name: function(val) {
      this.inputName = val;
      this.inputChangeHandler(this.inputName);
    }
  },
  methods:{
    loadAll(){
      var tableData=[{
        index:1,
        value:"王小虎",//the input suggestion can only be called "value"
        id:"4502031",
        risk:1
      },{
        index:2,
        value:"王小刚",
        id:"4502032",
        risk:3
      },{
        index:3,
        value:"王晓协",
        id:"4502033",
        risk:2
      }];
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