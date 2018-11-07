<template>
  <div class="illInstance">
      <div v-show="!showDetail" class="">
        <h2>实例登记表</h2>
        <el-table :data="instances" stripe border height="200"
          size="mini" highlight-current-row>
          <el-table-column sortable prop="preCaseId" label="id" width="100">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <!-- image group show -->
      <div v-show="showDetail" class="">
        <!-- <div>
          <el-button type="primary" v-on:click="goBackList()">返回</el-button>
        </div>
        <span class="demonstration">skin images</span> -->
        <el-row :gutter="20">
          <el-col :span="16">
            <ImageViewer :img-list="images" @imgchange="carouselChange"></ImageViewer>
          </el-col>
          <el-col :span="8">
            <div class="text-left padding-bottom-3">
              <el-button class="margin-5" type="primary" v-on:click="goBackList()">返回</el-button>
            </div>
            <div>
              <el-card class="box-card text-left">
                <div slot="header" class="clearfix">
                  <span>预测描述</span>
                  <el-button class="btn-right" type="text">操作按钮</el-button>
                </div>
                <div class="margin-top-m20">
                  <p><strong>当前照片:</strong> {{curImg.name}}</p>
                  <p><strong>预测结果为：</strong> {{curImg.predictResult}}</p>
                  <p><strong>严重程度：</strong> {{curImg.level}}</p>
                  <p><strong>建议：</strong> {{curImg.advice}}</p>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import ImageViewer from '../common/ImageViewer';
// import images from '../../assets/mock/FakeImageData';
// import instances from '../../assets/mock/mockInstances';

export default {
  name: 'illInstance',
  data(){
    return {
      userId: 1,
      instances: [],
      showDetail: false,
      images: [],
      curImg: {},
    }
  },
  components: {
    ImageViewer: ImageViewer
  },
  created: function() {
    this.getPreCase();
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.images = row.images;
      this.showDetail = true;
      var patient = {
        patientId: row.patientId,
        preCaseData: {
          preCaseId: row.preCaseId,
          preCaseImages: row.images
        }
      };
      this.$emit('choose', patient);
    },
    goBackList() {
      this.showDetail = false;
      var emptyPatient = {patientId: '', preCaseData: {preCaseId: '', preCaseImages: []}};
      this.$emit('choose', emptyPatient);
    },
    carouselChange(imgIndex) {
      this.curImg = this.images[imgIndex];
    },
    getPreCase() {
      var self = this;
      self.$axios({
        method: 'get',
        url: '/api/case-history/getPreCase',
        params: {
          userId: self.userId
        }
      }).then(function(res) {
        // console.log(res.data);

        for(var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          var preCase = {preCaseId: '', patientId: '', name: '', phone: '', images: []};
          preCase.preCaseId = item.id;
          preCase.patientId = item.patient.id;
          preCase.name = item.patient.name;
          preCase.phone = item.patient.phone;
          preCase.images = item.symptomFigureList;
          for(var j = 0; j < preCase.images.length; j++) {
            var url = preCase.images[j]['imageUrl'];
            url = '/getimages/getPhoto?type=predictCase&photoId=' + url;
            preCase.images[j]['imageUrl'] = url;
          }
          self.instances.push(preCase);
        }
      }).catch(function(res) {

      });
    }
  }
}
</script>

<style scoped>
  .illInstance {

  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    max-height: 242px;
  }

  .margin-top-m20 {
    margin-top: -20px;
  }
  .padding-bottom-3 {
    padding-bottom: 3px;
  }
  .margin-5 {
    margin: 5px;
  }

  .btn-right {
    float: right;
    padding: 3px 0;
  }

  .text-left {
    text-align: left;
  }
</style>