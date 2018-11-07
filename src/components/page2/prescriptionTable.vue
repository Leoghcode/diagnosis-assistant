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
            prop="totalDose"
            label="数量"
            sortable
          ><template slot-scope="scope">
            <span v-show="!scope.row.editFlag">{{scope.row.totalDose}}</span>
            <span v-show="scope.row.editFlag"><el-input v-model="editPrescription.totalDose"></el-input></span>
          </template>
          </el-table-column>
          <el-table-column
            prop="instruction"
            label="用法"
          ><template slot-scope="scope">
            <span v-show="!scope.row.editFlag">{{scope.row.instruction}}</span>
            <span v-show="scope.row.editFlag"><el-input v-model="editPrescription.instruction"></el-input></span>
          </template>
          </el-table-column>
        </prescription-table>
      </el-col>
      <el-col :sm="24" :md="9">
        <el-card class="margin-top-30">
          <div slot="header">
            <span>处方说明</span>
          </div>
          <div class="margin-top-m20 text-left">
            <p>{{note}}</p>
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
        medicine: null,
        totalDose: null,
        instruction: null,
        note: null
      },
      note: ''
    }
  },
  props:{
    // prescription: String,
    loading: Boolean,
    presDetail: Object
  },
  watch:{
    presDetail: {
      handler(val) {
        console.log(val);
        if(val != null && val != {}) {
          var self = this;
          window.setTimeout(function(){
            self.$emit('update:loading', false);
            self.tableData = val.medicineTemplateRecords;
            self.note = "aaa";
          }, 800);
        } else {
          self.tableData = [];
          self.note = "";
        }
      }
    }
  },
  components: {
    prescriptionTable,
  },
  methods:{
    addHandler(){
      this.addFlag=true;
      this.reseteditPrescription();
      this.tableData.unshift({...this.editPrescription,editFlag:true});
    },
    editHandler(row){
      row.editFlag=true;
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editPrescription=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      this.deleteRecord(row.id);
    },
    acceptHandler(row){
      var isAdd = false;
      if(this.addFlag){
        this.addFlag=false;
        isAdd = true;
        if(!this.isNewRowValidated(this.editPrescription)){
          alert("药名和用量不能为空");
          return;
        }
      }
      this.editPrescription.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editPrescription);
      //send modify data request
      if(isAdd) {
        this.addNewRecord(this.tableData[0]);
      } else {
        this.editOriginRecord();
      }
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
      return (!this.isEmpty(row.medicine)&&!this.isEmpty(row.totalDose));
    },
    isEmpty(string){
      return (string===undefined||string===null||string==="")?true:false;
    },
    reseteditPrescription(){
      this.editPrescription={
        medicine:null,
        totalDose:null,
        instruction:null,
        note: null
      }
    },
    addNewRecord(row) {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/disease/addTemplateRecord',
        data: {
          templateId: self.presDetail.id,
          medicineTemplateRecord: {
            medicine: row.medicine,
            totalDose: row.totalDose,
            instruction: row.instruction,
            note: row.note
          }
        }
      }).then(function(res) {
        console.log(res.data);
        row.id = res.data.id;
      }).catch(function(res) {

      });
    },
    editOriginRecord() {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/disease/editTemplateRecord',
        data: {
          id: this.editPrescription.id,
          medicine: this.editPrescription.medicine,
          totalDose: this.editPrescription.totalDose,
          instruction: this.editPrescription.instruction,
          note: this.editPrescription.note
        }
      }).then(function(res) {
        console.log(res.data);
        row.id = res.data.id;
      }).catch(function(res) {

      });
    },
    deleteRecord(id) {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/disease/deleteTemplateRecord',
        data: {
         id: id
        }
      }).then(function(res) {
        console.log(res.data);
      }).catch(function(res) {

      });
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