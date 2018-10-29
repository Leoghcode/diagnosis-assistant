<template>
  <div>
    <el-row v-loading="loading">
      <h1>处方模板</h1>
      <pres-template-table
      :queryString="queryString"
      :store="tableData"
      :placeholder="placeholder"
      searchColName="name"
      editFlagName="editFlag"
      deletable
      editable
      viewable
      @my-add="addHandler"
      @my-edit="editHandler"
      @my-delete="deleteHandler"
      @accept="acceptHandler"
      @cancel="cancelHandler"
      @view="viewHandler"
      >
        <el-table-column
          prop="name"
          label="处方名"
          sortable
        >
        <template slot-scope="scope">
          <span v-show="!scope.row.editFlag">{{scope.row.name}}</span>
          <span v-show="scope.row.editFlag"><el-input v-model="editPresTemplate.name"></el-input></span>
        </template>
        </el-table-column>
      </pres-template-table>
    </el-row>
  </div>
</template>

<script>
import presTemplateTable from '../common/MyTable';
import prescriptionTable from './prescriptionTable';
import {presOptions2, presDetails} from '../../assets/mock/mockPresTemplates';

export default {
  data(){
    return{
      addFlag:false,
      tableData: [],
      queryString:null,
      placeholder:"请输入处方名",
      editPresTemplate:{
        name:null,
        medicines:null,
      }
    }
  },
  props: ['disease', 'loading'],
  components: {
    presTemplateTable,
    prescriptionTable,
  },
  watch: {
    disease: function(val) {
      if(val == '') {
        self.tableData = [];
      } else {
        var self = this;
        window.setTimeout(function(){
          self.$emit('update:loading', false);
          self.getPresTemplate();
        }, 800);
      }
      this.$emit('pres-reset');
    }
  },
  methods:{
    addHandler(){
      //modify data locally
      this.addFlag=true;
      this.reseteditPresTemplate();
      this.tableData.unshift({...this.editPresTemplate,editFlag:true});
    },
    editHandler(row){
      //modify data locally
      console.log("in editHandler");
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editPresTemplate=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      //send delete data request
    },
    acceptHandler(row){
      if(this.addFlag){
        this.addFlag=false;
        if(!this.isNewRowValidated(this.editPresTemplate)){
          alert("处方名不能为空");
          return;
        }
      }
      this.editPresTemplate.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editPresTemplate);
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
    viewHandler(row) {
      this.$emit("view", presDetails[row.name]);
    },
    isNewRowValidated(row){
      return (!this.isEmpty(row.name));
    },
    isEmpty(string){
      return (string===undefined||string===null||string==="")?true:false;
    },
    reseteditPresTemplate(){
      this.editPresTemplate={
        name:null,
        medicines:null,
      }
    },
    getPresTemplate() {
      var self = this;
      self.$axios({
        method: 'get',
        url: '/api/disease/getTemplate',
        params: {
          diseaseId: self.disease
        }
      }).then(function(res) {
        self.tableData = res.data.diseaseTemplateList;
      }).catch(function(res) {

      });
    }
  },
  mounted(){
    this.tableData.forEach((elem,index)=>{
      elem.editFlag=false;//设置每条记录的编辑标签名为editFlag
    });
    this.tableData = Object.assign([],this.tableData);
    console.log(this.tableData);
  }
}
</script>
