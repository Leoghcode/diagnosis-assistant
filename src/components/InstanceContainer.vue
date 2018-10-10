<template>
  <div style="width: 50%; border: 1px solid lightgray">
      <div v-show="!showDetail" class="">
        <h2>实例登记表</h2>
        <el-table :data="instances" stripe border height="250"
          size="mini" highlight-current-row>
          <el-table-column sortable prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
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
          <el-col :span="8">
            <div style="text-align: left; padding-bottom: 3px;">
              <el-button style="margin: 5px;" type="primary" v-on:click="goBackList()">返回</el-button>
            </div>
            <div>
              <el-card class="box-card" style="text-align: left;">
                <div slot="header" class="clearfix">
                  <span>预测描述</span>
                  <el-button style="float: right; padding: 3px 0;" type="text">操作按钮</el-button>
                </div>
                <div style="margin-top: -20px;">
                  <p><strong>当前照片:</strong> {{currentImage.name}}</p>
                  <p><strong>预测结果为：</strong> {{currentImage.result}}</p>
                  <p><strong>严重程度：</strong> {{currentImage.level}}</p>
                  <p><strong>建议：</strong> {{currentImage.advice}}</p>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="16">
            <el-carousel autodisplay="false" height="" @change="carouselChange">
              <el-carousel-item v-for="image in images" :key="image.name">
                <img width="300" height="300" :src="image.image" @click="openDialog(image.image)">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-row>
          <el-dialog top="0" modal="true" close-on-click-modal="true" fullscreen="true" :visible.sync="dialogOpen">
            <img :src="dialogImg">
          </el-dialog>
        </el-row>
      </div>
  </div>
</template>

<script>
const instances = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路1518弄'
  },
  {
    date: '2017-07-03',
    name: '王小刚',
    address: '上海市普陀区金沙江路1519弄'
  },
  {
    date: '2018-02-20',
    name: '王晓协',
    address: '上海市普陀区金沙江路1520弄'
  },
  {
    date: '2018-09-02',
    name: '王晓航',
    address: '上海市普陀区金沙江路1521弄'
  },
    {
    date: '2017-07-03',
    name: '王小刚',
    address: '上海市普陀区金沙江路1519弄'
  },
  {
    date: '2018-02-20',
    name: '王晓协',
    address: '上海市普陀区金沙江路1520弄'
  },
  {
    date: '2018-09-02',
    name: '王晓航',
    address: '上海市普陀区金沙江路1521弄'
  }
];

import skin_1 from '../assets/skin/skin_1.jpg'
import skin_2 from '../assets/skin/skin_2.jpg'
import skin_3 from '../assets/skin/skin_3.jpg'
import skin_4 from '../assets/skin/skin_4.jpg'
const images = [
  {image: skin_1, name: 'skin_1.jpg', result: '皮肤病A', level: '轻微', advice: '自行买皮肤药'},
  {image: skin_2, name: 'skin_2.jpg', result: '皮肤病B', level: '中度', advice: '就医，买药'},
  {image: skin_3, name: 'skin_3.jpg', result: '皮肤病C', level: '严重', advice: '立即就医'},
  {image: skin_4, name: 'skin_4.jpg', result: '皮肤病D', level: '紧急', advice: '立即就医'}
];

export default {
  name: 'InstanceContainer',
  data(){
    return {
      instances: instances,
      images: images,
      showDetail: false,
      currentImage: {},
      dialogOpen: false,
      dialogImg: ''
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      console.log(row.address);
      this.showDetail = true;
    },
    goBackList() {
      this.showDetail = false;
    },
    carouselChange(itemIndex) {
      this.currentImage = images[itemIndex];
    },
    openDialog(imagePath) {
      this.dialogOpen = true;
      this.dialogImg = imagePath;
    }
  }
}
</script>

<style scoped>
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
</style>