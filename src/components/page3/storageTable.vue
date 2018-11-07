<template>
  <div>
    <h1>库存表</h1>
    <storage-table
    :queryString="queryString"
    :store="tableData"
    :placeholder="placeholder"
    searchColName="medicine"
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
        <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.medicine"></el-input></span>
      </template>
      </el-table-column>
      <el-table-column
        prop="stock"
        label="数量"
        sortable
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.stock}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.stock"></el-input></span>
      </template>
      </el-table-column>
      <el-table-column
        prop="cost"
        label="成本"
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.cost}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.cost"></el-input></span>
      </template>
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="单价"
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.unitPrice}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.unitPrice"></el-input></span>
      </template>
      </el-table-column>
    </storage-table>
  </div>
</template>

<script>
import storageTable from '../common/MyTable';
import storage from '../../assets/mock/mockStorage';

export default {
  data(){
    return{
      addFlag:false,
      tableData:[],
      queryString:null,
      placeholder:"请输入药名",
      editMedicine:{
        medicine:null,
        stock:null,
        cost:null,
        unitPrice:null,
      }
    }
  },
  components: {
    storageTable,
  },
  created: function() {
    this.getStocks();
  },
  methods:{
    addHandler(){
      //modify data locally
      this.addFlag=true;
      this.reseteditMedicine();
      this.tableData.unshift({...this.editMedicine,editFlag:true});
    },
    editHandler(row){
      //modify data locally
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editMedicine=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      this.deleteStock(row.id);
    },
    acceptHandler(row){
      var isAdd = false;
      if(this.addFlag){
        this.addFlag=false;
        isAdd = true;
        if(!this.isNewRowValidated(this.editMedicine)){
          alert("药名不能为空");
          return;
        }
      }
      this.editMedicine.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editMedicine);
      //send modify data request
      if(isAdd) {
        this.addNewStock(this.tableData[0]);
      } else {
        this.editStock();
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
    isNewRow(row){
      return (row.id===null)?true:false;
    },
    isNewRowValidated(row){
      return (!this.isEmpty(row.medicine));
    },
    isEmpty(string){
      return (string===undefined||string===null||string==="")?true:false;
    },
    reseteditMedicine(){
      this.editMedicine={
        medicine:null,
        stock:null,
        cost:null,
        unitPrice:null,
      }
    },
    getStocks() {
      var self = this;
      self.$axios({
        method: 'get',
        url: '/api/stock/list'
      }).then(function(res) {
        self.tableData = res.data.stockList;
      }).catch(function(res) {

      });
    },
    addNewStock(row) {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/stock/add',
        data: {
          medicine: row.medicine,
          stock: row.stock,
          unitPrice: row.unitPrice,
          cost: row.cost,
          threshold: 0
        }
      }).then(function(res) {
        console.log(res.data);
        row.id = res.data.id;
      }).catch(function(res) {

      });
    },
    editStock() {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/stock/edit',
        data: {
          id: self.editMedicine.id,
          medicine: self.editMedicine.medicine,
          stock: self.editMedicine.stock,
          unitPrice: self.editMedicine.unitPrice,
          cost: self.editMedicine.cost,
          threshold: 0
        }
      }).then(function(res) {
        console.log(res.data);
      }).catch(function(res) {

      });
    },
    deleteStock(id) {
      var self = this;
      self.$axios({
        method: 'post',
        url: '/api/stock/delete',
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
