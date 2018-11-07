<template>
  <div>
    <el-row>
      <h1>病种库</h1>
      <disease-table
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
          prop="level"
          label="等级"
          sortable
        ><template slot-scope="scope">
          <span v-show="!scope.row.editFlag">{{scope.row.level}}</span>
          <span v-show="scope.row.editFlag"><el-input v-model="editDisease.level"></el-input></span>
        </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          sortable
        ><template slot-scope="scope">
          <span v-show="!scope.row.editFlag">{{scope.row.note}}</span>
          <span v-show="scope.row.editFlag"><el-input v-model="editDisease.note"></el-input></span>
        </template>
        </el-table-column>
      </disease-table>
    </el-row>
  </div>
</template>

<script>
import diseaseTable from '../common/MyTable';
// import {diseaseArray} from '../../assets/mock/mockPresTemplates';

export default {
  data(){
    return{
      addFlag:false,
      tableData: [],
      queryString:null,
      placeholder:"请输入病名",
      editDisease:{
        disease:null,
        level:null,
        note:null
      }
    }
  },
  components: {
    diseaseTable,
  },
  created: function() {
    var self = this;
    self.$axios({
      method: 'get',
      url: '/api/disease/list'
    }).then(function(res) {
      self.tableData = res.data.diseaseList;
    }).catch(function(res) {

    });
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
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editDisease=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      this.deleteDiseaseById(row.id);
    },
    acceptHandler(row){
      var isAdd = false;
      if(this.addFlag){
        this.addFlag=false;
        isAdd = true;
        if(!this.isNewRowValidated(this.editDisease)){
          alert("病名不能为空");
          return;
        }
      }
      this.editDisease.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editDisease);

      if(isAdd) {
        this.addNewDisease(this.tableData[0]);
      } else {
        this.postEditDisease();
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
    viewHandler(row) {
      this.$emit('view', row.id);
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
        level:null,
        note:null
      }
    },
    addNewDisease(row) {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/disease/add',
        data: {
          disease: self.editDisease.disease,
          level: self.editDisease.level,
          note: self.editDisease.note
        }
      }).then(function(res) {
        console.log(res.data);
        row.id = res.data.id;
      }).catch(function(res) {

      });
    },
    postEditDisease() {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/disease/edit',
        data: {
          id: self.editDisease.id,
          disease: self.editDisease.disease,
          level: self.editDisease.level,
          note: self.editDisease.note
        }
      }).then(function(res) {
        console.log(res.data);
      }).catch(function(res) {

      });
    },
    deleteDiseaseById(id) {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/disease/delete',
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