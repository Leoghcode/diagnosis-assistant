<template>
  <div>
    <h1>this is a table for patients</h1>
    <storage-table 
    :name="queryString" 
    :store="tableData"
    :placeholder="placeholder"
    deletable
    editable
    @my-add="addHandler"
    @my-edit="editHandler"
    @my-delete="deleteHandler"
    @accept="acceptHandler"
    @cancel="cancelHandler"
    >
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      >
      <template slot-scope="scope">
        <span :key="span1" v-show="!scope.row.editFlag">{{scope.row.name}}</span>
        <span :key="span2" v-show="scope.row.editFlag"><el-input v-model="editPatient.name"></el-input></span>
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
    </storage-table>
  </div>
</template>

<script>
import storageTable from './MyTable';
import patients from '../../assets/mock/mockPatients';

export default {
  data(){
    return{
      tableData:patients,
      span1:1,
      span2:2,
      queryString:null,
      placeholder:"请输入药名",
      editPatient:{
        name:null,
        id:null,
        risk:null,
      }
    }
  },
  components: {
    storageTable,
  },
  methods:{
    addHandler(){
      console.log("in addHandler");
      //modify data locally
      this.resetRow();
      this.tableData.unshift({editFlag:true});
      console.log(this.tableData);
    },
    editHandler(row){
      console.log("in editHandler");
      //modify data locally
      row.editFlag=true;
      this.editPatient=row;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
    },
    deleteHandler(row){
      console.log("in deleteHandler");
      this.tableData.splice(this.tableData.indexOf(row),1);
      //send delete data request
    },
    acceptHandler(row){
      console.log("in acceptHandler");
      row.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      //send modify data request
    },
    cancelHandler(row){
      console.log("in cancelHandler");
      if(this.isNewRow(row)){
        this.tableData.shift();
        return;
      }
      row.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),row);      
      //abort modification
    },
    isNewRow(row){
      console.log(row.id===undefined);
      return (row.id===undefined&&row.name===undefined&&row.risk===undefined)?true:false;
    },
    resetRow(){
      this.editPatient={
        name:null,
        id:null,
        risk:null,
      }
    }
  },
  mounted(){
    this.tableData.forEach((elem,index)=>{
      elem.editFlag=false;
    });
    this.tableData = Object.assign([],this.tableData);
  }
}
</script>
