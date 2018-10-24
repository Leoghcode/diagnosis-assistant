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
        prop="count"
        label="数量"
        sortable
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.count}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.count"></el-input></span>
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
        prop="price"
        label="售价"
      ><template slot-scope="scope">
        <span v-show="!scope.row.editFlag">{{scope.row.price}}</span>
        <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.price"></el-input></span>
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
      tableData:storage,
      queryString:null,
      placeholder:"请输入药名",
      editMedicine:{
        medicine:null,
        count:null,
        cost:null,
        price:null,
      }
    }
  },
  components: {
    storageTable,
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
      console.log("in editHandler");
      row.editFlag=true;
      // this.tableData = Object.assign([],this.tableData);
      this.$set(this.tableData,this.tableData.indexOf(row),row);
      this.editMedicine=Object.assign({},row);
    },
    deleteHandler(row){
      this.tableData.splice(this.tableData.indexOf(row),1);
      //send delete data request
    },
    acceptHandler(row){
      if(this.addFlag){
        this.addFlag=false;
        if(!this.isNewRowValidated(this.editMedicine)){
          alert("药名不能为空");
          return;
        }
      }
      this.editMedicine.editFlag=false;
      this.$set(this.tableData,this.tableData.indexOf(row),this.editMedicine);
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
        count:null,
        cost:null,
        price:null,
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
