<template>
  <div id="page2">
    <el-row class="row1" :gutter="15">
      <el-col :sm="24" :md="12">
        <el-card class="box-card-300">
          <disease-table @view="showDiseaseDetail">
          </disease-table>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12">
        <el-card class="box-card-300">
          <disease-details class="margin-top-m13" :disease="disease" :loading.sync="detailSearch">
          </disease-details>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :sm="24" :md="8">
        <el-card class="box-card-300">
          <pres-template-table :disease="disease" :loading.sync="presSearch" @view="showPresDetail" @pres-reset="cleanPresDetail"></pres-template-table>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="16">
        <el-card class="box-card-300">
          <prescription-table :pres-detail="presDetail" :loading.sync="presDetailSearch"></prescription-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import diseaseTable from './diseaseTable';
  import diseaseDetails from './diseaseDetails';
  import presTemplateTable from './presTemplateTable';
  import prescriptionTable from './prescriptionTable';

  export default {
    name: 'page2',
    components: {
      diseaseTable: diseaseTable,
      diseaseDetails: diseaseDetails,
      presTemplateTable: presTemplateTable,
      prescriptionTable: prescriptionTable
    },
    data() {
      return {
        disease: '',
        detailSearch: false,
        presSearch: false,
        presDetail: null,
        presDetailSearch: false
      }
    },
    methods: {
      showDiseaseDetail(disease) {
        this.disease = disease;
        if(disease != '') {
          this.detailSearch = true;
          this.presSearch = true;
        }
      },
      showPresDetail(presDetail) {
        // console.log("in showPresDetail: " + presDetail);
        this.presDetail = presDetail;
        if(presDetail != {}) {
          this.presDetailSearch = true;
        }
      },
      cleanPresDetail() {
        this.presDetail = {};
      }
    }
  }
</script>

<style scoped>
  #page2 {
    padding: 10px 20px;
  }

  .row1 {
    margin-bottom: 10px;
  }

  .box-card-300 {
    padding: 3px;
    height: 400px;
    overflow: auto;
  }

  .margin-top-m13 {
    margin-top: -13px;
  }
</style>