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
        viewable
        @my-add="addHandler"
        @my-edit="editHandler"
        @my-delete="deleteHandler"
        @accept="acceptHandler"
        @cancel="cancelHandler"
        @viewable="searchHistory"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="patient-info">
                <el-form-item label="性别">
                  <span>{{ props.row.gender ? '男' : '女' }}</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{{ props.row.age }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

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
            prop="riskDegree"
            label="风险等级"
          ><template slot-scope="scope">
            <span v-show="!scope.row.editFlag">{{scope.row.riskDegree}}</span>
            <span v-show="scope.row.editFlag"><el-input v-model="editPatient.riskDegree"></el-input></span>
          </template>
          </el-table-column>
        </patient-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import patientTable from '../common/MyTable';
// import patients from '../../assets/mock/mockPatients';

export default {
  data(){
    return{
      addFlag:false,
      tableData: [],
      queryString:null,
      placeholder:"请输入姓名",
      editPatient:{
        name:null,
        id:null,
        riskDegree:null,
      }
    }
  },
  components: {
    patientTable,
  },
  props: [
    'patientId', 'loading'
  ],
  watch: {
    patientId: function(val) {
      // emulate the data call from backend
      if(val != '') {
        var self = this;
        window.setTimeout(function(){
          self.getPatientInfo();
        }, 800);
      } else {
        this.tableData = [];
        this.$emit('show-history', []);
      }
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
    },
    getPatientInfo() {
      var self = this;
      var url = '/api/patient/home/' + self.patientId;
      self.$axios({
        method: 'get',
        url: url
      }).then(function(res) {
        self.$emit('update:loading', false);
        var patientInfo = res.data.patient;
        if(patientInfo) {
          self.tableData = [patientInfo];
          self.$emit('show-history', res.data.caseHistoryList);
        }
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
  .patient-info {
    font-size: 0;
  }
  .patient-info label {
    width: 90px;
    color: lightgray;
  }
  .patient-info .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }
</style>