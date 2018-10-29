<template>
  <div class="picture">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="病例图片" name="first">
        <div>
          <image-viewer :img-list="imgList"></image-viewer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="病例处方" name="second">
        <el-row>
          <div class="prescription">
            <el-table :data="presList" stripe border max-height="250"
              highlight-current-row>
              <el-table-column prop="medicine" label="药名">
              </el-table-column>
              <el-table-column prop="totalDose" label="剂量">
              </el-table-column>
              <el-table-column prop="totalPrice" label="费用">
              </el-table-column>
              <el-table-column prop="instruction" label="说明">
              </el-table-column>
              <el-table-column prop="note" label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!--<el-carousel indicator-position="outside">-->
      <!--<el-carousel-item v-for="item in 4" :key="item">-->
        <!--<h3>{{ item }}</h3>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->
  </div>
</template>

<script>
  import ImageViewer from "../common/ImageViewer";

  export default {
    props: [
      'caseId'
    ],
    watch: {
      caseId: function(val) {
        if(val == '') {
          this.imgList = [];
          this.presList = [];
        } else {
          this.getCaseDetail();
        }
      }
    },
    data() {
      return {
        activeName: 'first',
        imgList: [],
        presList: []
      };
    },
    components: {
        ImageViewer: ImageViewer
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      getCaseDetail() {
        var self = this;
        self.$axios({
          method: 'get',
          url: '/api/case-history/query',
          params: {
            caseHistoryId: self.caseId
          }
        }).then(function(resp) {
          self.imgList = resp.data.prescriptionList;
          self.presList = resp.data.medicineRecordList;
        }).catch(function(resp) {

        });
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
  .picture {
  }
  .prescription {
    text-align: left;
  }
</style>
