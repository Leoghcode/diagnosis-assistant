<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" plain>主要按钮</el-button>
    <el-table
      :data="tableData3"
      style="width: 50%"
      height="250"
      :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="hospital"
        label="就诊地点"
        width="120">
      </el-table-column>
      <el-table-column
        prop="diagnose_res"
        label="诊断结果"
        width="120">
      </el-table-column>
      <el-table-column
        prop="prescription"
        label="处方"
        width="300">
      </el-table-column>
    </el-table>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '病例列表与诊断历史图片界面展示',
      tableData3: [{
        date: '2018-05-07',
        name: '王小虎',
        hospital: '嘉定中心医院',
        diagnose_res: '湿疹',
        prescription: '盐酸左氧氟沙星0.4g静脉输液',
      },{
      date: '2018-07-05',
        name: '王小虎',
        hospital: '嘉定中心医院',
        diagnose_res: '湿疹',
        prescription: '上清片',
      },{
        date: '2018-07-12',
        name: '王小虎',
        hospital: '嘉定中心医院',
        diagnose_res: '湿疹',
        prescription: '甲硝锉片',
      },{
        date: '2018-07-27',
        name: '王小虎',
        hospital: '嘉定中心医院',
        diagnose_res: '湿疹',
        prescription: '盐酸左氧氟沙星0.4g静脉输液',
      },{
        date: '2018-08-23',
        name: '王小虎',
        hospital: '同济大学校医院',
        diagnose_res: '粉刺',
        prescription: '维生素C0.5g静脉输液',
      },{
        date: '2018-08-30',
        name: '王小虎',
        hospital: '嘉定中心医院',
        diagnose_res: '粉刺',
        prescription: '盐酸左氧氟沙星0.4g静脉输液',
      },{
        date: '2018-09-07',
        name: '王小虎',
        hospital: '同济大学校医院嘉定分院',
        diagnose_res: '股癣',
        prescription: '股癣药膏',
      },{
        date: '2018-09-22',
        name: '王小虎',
        hospital: '嘉定中心医院',
        diagnose_res: '股癣',
        prescription: '股癣药膏',
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
