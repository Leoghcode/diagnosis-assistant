<template>
  <div>
    <my-table></my-table>
  </div>
</template>

<script>
  import MyTable from '../common/MyTable';

  export default {
    name: 'searchPatient',
    props: ['name', 'phone', 'idNumber'],
    components: {
      MyTable: MyTable
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
  .margin-bottom-10 {
    margin-bottom: 10px;
  }
</style>
