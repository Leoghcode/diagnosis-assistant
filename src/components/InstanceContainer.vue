<template>
  <div class="instanceContainer">
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
          <el-col :span="16">
            <ImageViewer :img-list="images" @imgchange="carouselChange"></ImageViewer>
          </el-col>
          <el-col :span="8">
            <div class="text-left padding-bottom-3">
              <el-button class="margin-5" type="primary" v-on:click="goBackList()">返回</el-button>
              <el-button class="margin-5" type="success" v-on:click="openIllForm()">创建新病例</el-button>
            </div>
            <div>
              <el-card class="box-card text-left">
                <div slot="header" class="clearfix">
                  <span>预测描述</span>
                  <el-button class="btn-right" type="text">操作按钮</el-button>
                </div>
                <div class="margin-top-m20">
                  <p><strong>当前照片:</strong> {{curImg.name}}</p>
                  <p><strong>预测结果为：</strong> {{curImg.result}}</p>
                  <p><strong>严重程度：</strong> {{curImg.level}}</p>
                  <p><strong>建议：</strong> {{curImg.advice}}</p>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-dialog title="新建病例" :visible.sync="illFormMode">
            <el-row>
              <el-col :span="16" :offset="4">
                <el-form :model="illForm" label-width="80px">
                  <el-form-item label="病人">
                    <el-col :span="10">
                      <el-input v-model="illForm.name" clearable></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="时间">
                    <div class="text-left">
                      <el-date-picker v-model="illForm.datetime" type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item label="照片">
                    <el-upload
                      action="http://localhost:8888/upload"
                      list-type="picture-card"
                      multiple>
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="处方">
                    <el-input type="textarea" v-model="illForm.prescription"
                     :autosize="{minRows: 3, maxRows: 6}"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-dialog>
        </el-row>
      </div>
  </div>
</template>

<script>
import ImageViewer from './common/ImageViewer';

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
      showDetail: false,
      images: images,
      curImg: {},
      illFormMode: false,
      illForm: {
        name: '',
        datetime: '',
        prescription: ''
      }
    }
  },
  components: {
    ImageViewer: ImageViewer
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
    carouselChange(imgIndex) {
      this.curImg = this.images[imgIndex];
    },
    openIllForm() {
      this.illFormMode = true;
    }
  }
}
</script>

<style scoped>
  .instanceContainer {
    width: 50%;
    border: 1px solid lightgray;
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