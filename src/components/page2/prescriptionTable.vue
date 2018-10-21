<template>
  <div>
    <prescription-table 
    :store="tableData"
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
        prop="medicine"
        label="药名"
        sortable
      >
      <template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.medicine}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editPrescription.medicine"></el-input></span>
      </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        sortable
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.number}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editPrescription.number"></el-input></span>
      </template>
      </el-table-column>
      <el-table-column
        prop="usage"
        label="用法"
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.usage}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editPrescription.usage"></el-input></span>
      </template>
      </el-table-column>
    </prescription-table>
  </div>
</template>

<script>
import prescriptionTable from '../common/MyTable';

export default {
  data(){
    return{
      addFlag:false,
      tableData:Object.assign([],this.store),
      editPrescription:{
        name:null,
        id:null,
        risk:null,
      }
    }
  },
  props:{
    store:Array,
  },
  watch:{
    store:function(val){
      console.log('in store');
      this.tableData=val;
    }
  },
  components: {
    prescriptionTable,
  },
  methods:{
    addHandler(){
      //modify data locally
      this.addFlag=true;
      this.reseteditPrescription();
      this.tableData.unshift({...this.editPrescription,editFlag:true});
    },
    editHandler(row){
      //modify data locally
      console.log("in editHandler");
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editPrescription=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      //send delete data request
    },
    acceptHandler(row){
      if(this.addFlag){
        this.addFlag=false;
        if(!this.isNewRowValidated(this.editPrescription)){
          alert("药名和用量不能为空");
          return;
        }
      }
      this.editPrescription.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editPrescription);
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
      return (!this.isEmpty(row.medicine)&&!this.isEmpty(row.number));
    },
    isEmpty(string){
      return (string===undefined||string===null||string==="")?true:false;
    },
    reseteditPrescription(){
      this.editPrescription={
        medicine:null,
        number:null,
        usage:null,
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
