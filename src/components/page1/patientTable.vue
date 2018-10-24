<template>
  <div id="table">
    <el-row v-loading="loading">
      <div>
        <!-- <h1>this is a table for patients</h1> -->
        <patient-table
        :queryString="queryString"
        :store="tableData"
        :placeholder="placeholder"
        searchColName="name"
        editFlagName="editFlag"
        tableSize="mini"
        deletable
        editable
        @my-add="addHandler"
        @my-edit="editHandler"
        @my-delete="deleteHandler"
        @accept="acceptHandler"
        @cancel="cancelHandler"
        @row-click="searchHistory"
        >
          <el-table-column
            prop="name"
            label="姓名"
            sortable
          >
          <template slot-scope="scope">
            <span v-show="!scope.row.editFlag">{{scope.row.name}}</span>
            <span v-show="scope.row.editFlag"><el-input v-model="editPatient.name"></el-input></span>
          </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="就诊号"
            sortable
          ><template slot-scope="scope">
            <span v-show="!scope.row.editFlag">{{scope.row.id}}</span>
            <span v-show="scope.row.editFlag"><el-input v-model="editPatient.id"></el-input></span>
          </template>
          </el-table-column>
          <el-table-column
            prop="risk"
            label="风险等级"
          ><template slot-scope="scope">
            <span v-show="!scope.row.editFlag">{{scope.row.risk}}</span>
            <span v-show="scope.row.editFlag"><el-input v-model="editPatient.risk"></el-input></span>
          </template>
          </el-table-column>
        </patient-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import patientTable from '../common/MyTable';
import patients from '../../assets/mock/mockPatients';

export default {
  data(){
    return{
      addFlag:false,
      tableData:patients,
      queryString:null,
      placeholder:"请输入姓名",
      editPatient:{
        name:null,
        id:null,
        risk:null,
      }
    }
  },
  components: {
    patientTable,
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
        self.queryString = val;
      }, 800);
    }
  },
  methods:{
    addHandler(){
      //modify data locally
      this.addFlag=true;
      this.resetEditPatient();
      this.tableData.unshift({...this.editPatient,editFlag:true});
    },
    editHandler(row){
      //modify data locally
      // console.log("in editHandler");
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editPatient=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      //send delete data request
    },
    acceptHandler(row){
      if(this.addFlag){
        this.addFlag=false;
        if(!this.isNewRowValidated(this.editPatient)){
          alert("姓名和就诊号不能为空");
          return;
        }
      }
      this.editPatient.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editPatient);
      //send modify data request
    },
    cancelHandler(row){
      if(this.addFlag){
        this.addFlag=false;
        this.tableData.shift();
      }
      row.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      //abort modification
    },
    isNewRowValidated(row){
      return (!this.isEmpty(row.id)&&!this.isEmpty(row.name));
    },
    isEmpty(string){
      return (string===undefined||string===null||string==="")?true:false;
    },
    resetEditPatient(){
      this.editPatient={
        name:null,
        id:null,
        risk:null,
      }
    },
    searchHistory(row) {
      this.$emit('check-history', row.name);
    }
  },
  mounted(){
    this.tableData.forEach((elem,index)=>{
      elem.editFlag=false;//设置每条记录的编辑标签名为editFlag
    });
    this.tableData = Object.assign([],this.tableData);
  }
}
</script>
