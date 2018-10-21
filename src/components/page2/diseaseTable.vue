<template>
  <div>
    <h1>this is a table for diseases</h1>
    <disease-table 
    :queryString="queryString" 
    :store="tableData"
    :placeholder="placeholder"
    searchColName="name"
    editFlagName="editFlag"
    deletable
    editable
    @my-add="addHandler"
    @my-edit="editHandler"
    @my-delete="deleteHandler"
    @accept="acceptHandler"
    @cancel="cancelHandler"
    >
      <el-table-column
        prop="disease"
        label="病名"
        sortable
      >
      <template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.disease}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editDisease.disease"></el-input></span>
      </template>
      </el-table-column>
      <el-table-column
        prop="rank"
        label="等级"
        sortable
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.rank}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editDisease.rank"></el-input></span>
      </template>
      </el-table-column>
    </disease-table>
  </div>
</template>

<script>
import diseaseTable from '../common/MyTable';
import {diseaseArray} from '../../assets/mock/mockPresTemplates';

export default {
  data(){
    return{
      addFlag:false,
      tableData:diseaseArray,
      queryString:null,
      placeholder:"请输入病名",
      editDisease:{
        disease:null,
        rank:null,
      }
    }
  },
  components: {
    diseaseTable,
  },
  methods:{
    addHandler(){
      //modify data locally
      this.addFlag=true;
      this.reseteditDisease();
      this.tableData.unshift({...this.editDisease,editFlag:true});
    },
    editHandler(row){
      //modify data locally
      console.log("in editHandler");
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editDisease=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      //send delete data request
    },
    acceptHandler(row){
      if(this.addFlag){
        this.addFlag=false;
        if(!this.isNewRowValidated(this.editDisease)){
          alert("病名不能为空");
          return;
        }
      }
      this.editDisease.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editDisease);
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
      return (!this.isEmpty(row.disease));
    },
    isEmpty(string){
      return (string===undefined||string===null||string==="")?true:false;
    },
    reseteditDisease(){
      this.editDisease={
        disease:null,
        rank:null,
      }
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
