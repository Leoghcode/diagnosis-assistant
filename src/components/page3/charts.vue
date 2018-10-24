<template>
  <div>
    <el-row class="row1" :gutter="20">
      <el-col :sm="24" :md="8">
        <columnChart></columnChart>
      </el-col>
      <el-col :sm="24" :md="8">
        <lineChart></lineChart>
      </el-col>
      <el-col :sm="24" :md="8">
        <pieChart></pieChart>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import columnChart from './sub/columnChart';
  import lineChart from './sub/lineChart';
  import pieChart from './sub/pieChart';
  export default {
    name: 'charts',
    props: [],
    components: {
      columnChart: columnChart,
      lineChart: lineChart,
      pieChart: pieChart
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .row1 {
    margin-bottom: 10px;
  }

  .box-card-300 {
    padding: 3px;
    height: 350px;
  }
  .box-card-400 {
    padding: 3px;
    height: 400px;
  }
</style>