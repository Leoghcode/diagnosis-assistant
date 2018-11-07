<template>
  <medicine-table
    :store="tableData"
    tableSize="mini"
    deletable
    editable
    :placeholder="placeholder"
    editFlagName="editFlag"
    @my-add="addHandler"
    @my-edit="editHandler"
    @my-delete="deleteHandler"
    @accept="acceptHandler"
    @cancel="cancelHandler"
  >
    <el-table-column prop="medicine" label="药名" sortable>
    <template slot-scope="scope">
      <span v-show="!scope.row.editFlag">{{scope.row.medicine}}</span>
      <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.medicine"></el-input></span>
    </template>
    </el-table-column>
    <el-table-column prop="totalDose" label="数量" sortable>
    <template slot-scope="scope">
      <span v-show="!scope.row.editFlag">{{scope.row.totalDose}}</span>
      <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.totalDose"></el-input></span>
    </template>
    </el-table-column>
    <el-table-column prop="instruction" label="用法">
    <template slot-scope="scope">
      <span v-show="!scope.row.editFlag">{{scope.row.instruction}}</span>
      <span v-show="scope.row.editFlag"><el-input v-model="editMedicine.instruction"></el-input></span>
    </template>
    </el-table-column>
  </medicine-table>
</template>

<script type="text/javascript">
  import medicineTable from '../../common/MyTable';
  export default {
    name: 'medicineRecord',
    props: [
      'medicines'
    ],
    watch: {
      medicines: {
        handler: function(val) {
          this.tableData = val;
        }
      },
      tableData: {
        handler: function(val) {
          this.$emit('update:medicines', val);
        }
      }
    },
    components: {
      medicineTable: medicineTable
    },
    data() {
      return {
        addFlag:false,
        tableData: [],
        editMedicine: {
          medicine: '',
          totalDose: '',
          instruction: ''
        },
        placeholder: '请输入姓名'
      }
    },
    methods: {
      addHandler(){
        //modify data locally
        this.addFlag=true;
        this.resetEditMedicine();
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
        //send delete data request
      },
      acceptHandler(row){
        if(this.addFlag){
          this.addFlag=false;
          if(!this.isNewRowValidated(this.editMedicine)){
            alert("药名和用量不能为空");
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
      resetEditMedicine(){
        this.editMedicine={
          medicine:null,
          totalDose:null,
          instruction:null,
        }
      },
      isNewRowValidated(row){
        return (!this.isEmpty(row.medicine)&&!this.isEmpty(row.totalDose));
      },
      isEmpty(string){
        return (string===undefined||string===null||string==="")?true:false;
      },
    },
    mounted(){
      this.tableData.forEach((elem,index)=>{
        elem.editFlag=false;//设置每条记录的编辑标签名为editFlag
      });
      this.tableData = Object.assign([],this.tableData);
    }
  }
</script>