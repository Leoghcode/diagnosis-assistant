<template>
  <div id="page1">
    <el-row class="row1">
      <el-card>
        <charts></charts>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <storage-table></storage-table>
      </el-card>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import charts from './charts';
  import storageTable from './storageTable';

  export default {
    name: 'page3',
    components: {
      charts: charts,
      storageTable: storageTable
    },
    data() {
      return {
      }
    },
    watch: {
    },
    methods: {
    }
  }
</script>

<style scoped>
  #page1 {
    padding: 10px 20px;
  }

  .row1 {
    margin-bottom: 10px;
  }
</style>