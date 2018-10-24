<template>
  <div>
    <el-row v-loading="loading" :gutter="15">
      <h1 class="margin-bottom-10">处方详情</h1>
      <el-col :sm="24" :md="15">
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
      </el-col>
      <el-col :sm="24" :md="9">
        <el-card class="margin-top-30">
          <div slot="header">
            <span>处方说明</span>
          </div>
          <div v-show="tableData.length != 0" class="margin-top-m20 text-left">
            <p>东营中医院藏医科推荐经典藏药-- 二十五味珊瑚丸，在治疗神经疼痛方面有独特的疗效，特别是偏头疼，癫痫，神经疼等。</p>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import prescriptionTable from '../common/MyTable';
// import {presDetails} from '../../assets/mock/mockPresTemplates';

export default {
  data(){
    return{
      addFlag:false,
      // tableData: Object.assign([],this.store),
      tableData: [],
      editPrescription:{
        name:null,
        id:null,
        risk:null,
      }
    }
  },
  props:{
    // prescription: String,
    loading: Boolean,
    store:Array
  },
  watch:{
    store: {
      handler(val) {
        var self = this;
        window.setTimeout(function(){
          self.$emit('update:loading', false);
          self.tableData = val;
        }, 800);
      }
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

<style scoped>
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
  .margin-top-30 {
    margin-top: 30px;
  }
  .margin-top-m20 {
    margin-top: -20px;
  }
  .text-left {
    text-align: left;
  }
</style>