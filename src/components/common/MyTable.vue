<template>
  <div id="table">
    <h1>{{msg}}</h1>
    <el-row class="margin-bottom-10">
      <el-col :span="1" >
        <el-button @click="signalAdd()" type="primary" icon="el-icon-plus" circle></el-button>
      </el-col>
      <el-col :span="6" :offset="17">
        <el-input
        :placeholder="placeholder"
        v-model="inputName"
        clearable
        prefix-icon="el-icon-search"
        @change="inputChangeHandler"
        ></el-input>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width:100%"
      border
      highlight-current-row
      :default-sort="{prop: 'index',order: 'ascending'}"
    >
      <slot></slot>
      <el-table-column label="操作" width="100">
              <template slot-scope="scope" >
                <!-- 耦合editFlag -->
                <span v-show="!scope.row.editFlag">
                  <el-button v-show="editable" @click="signalEdit(scope.row)" type="text">修改 </el-button>
                  <el-button v-show="deletable" @click="signalDelete(scope.row)" type="text">删除 </el-button>
                </span>
                <span v-show="scope.row.editFlag">
                  <el-button v-show="editable" @click="signalAccept(scope.row)" type="text">确认 </el-button>
                  <el-button v-show="editable" @click="signalCancel(scope.row)" type="text">取消 </el-button>
                </span>
              </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'tableTemplate',
  data() {
    return {
      colNum: null,
      tableData: [],
      msg: '',
      inputName: '',
      editLock: false,
    };
  },
  props: {
    'name':String,
    'store':Array|Object,
    'placeholder':String,
    'deletable':Boolean,
    'editable':Boolean,
  },
  watch: {
    name: function(val) {
      this.inputName = val;
      this.inputChangeHandler(this.inputName);
    },
    store: function(val){
      this.tableData=val;
      console.log("in watch store");
    }
  },
  methods:{
    createStateFilter(queryString){
      return (state)=>{
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase())===0);
      };
    },
    inputChangeHandler(queryString){
      var tableData=this.store;
      this.tableData=queryString?tableData.filter(this.createStateFilter(queryString)):tableData;
    },
    signalDelete(row) {
      if(this.editLock){
        this.triggerEditLock();
        return;
      }
      this.$emit('my-delete', row);
      console.log("signal delete");
    },
    signalEdit(row){
      if(this.editLock){
        this.triggerEditLock();
        return;
      }
      this.editLock=true;
      this.$emit('my-edit',row);
      console.log("signal edit");
    },
    signalAdd(){
      if(this.editLock){
        this.triggerEditLock();
        return;
      }
      this.editLock=true;
      this.$emit('my-add');
      console.log("signal add");
    },
    signalAccept(row){
      this.editLock=false;
      this.$emit('accept',row);
    },
    signalCancel(row){
      this.editLock=false;
      this.$emit('cancel',row);
    },
    triggerEditLock(){
      //handle modification conflict
      alert("请先完成当前条目的编辑");
    },
  },
  mounted(){
    this.tableData=this.store;
    // var rootElem = this.$el;
    // this.tableElem = rootElem.getElementsByTagName("table")[0];
    // this.colNum = this.tableElem.rows[0].cells.length;
  }
};
</script>

<style scoped>
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
</style>