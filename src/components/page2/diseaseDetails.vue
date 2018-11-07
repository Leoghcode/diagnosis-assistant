<template>
  <div id="illDetails">
    <el-tabs v-loading="loading" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图片库" name="image-tab">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="text-left">
              <el-upload
                action="/api/disease/uploadPhotos"
                name="photos"
              >
                <el-button size="small" type="primary">添加图片</el-button>
              </el-upload>
            </div>
          </el-col>
          <el-col :sm="24" :md="{span: 15, offset: 9}">
            <image-viewer :img-list="images" @imgchange="updateNote"></image-viewer>
          </el-col>
          <!-- <el-col :sm="24" :md="9">
            <el-card v-show="disease!=''">
              <div slot="header">
                <span>图片备注</span>
              </div>
              <div class="margin-top-m20 text-left">
                <p><strong>拍摄时间:</strong> {{ curImgNote['time'] }} </p>
                <p><strong>疾病：</strong> {{ curImgNote['result'] }} </p>
                <p><strong>严重程度：</strong> {{ curImgNote['level'] }} </p>
                <p><strong>备注：</strong> {{ curImgNote['advice'] }}</p>
              </div>
            </el-card>
          </el-col> -->
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="病情资料" name="ill-tab">
        <div class="passage-box">
          <h1>{{ disease }}</h1>
          <p class="passage">{{ descriptions }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
  import ImageViewer from '../common/ImageViewer';
  import diseaseDetails from '../../assets/mock/mockDiseaseDetail';

  export default {
    name: 'diseaseDetails',
    props: ['disease', 'loading'],
    components: {
      ImageViewer: ImageViewer
    },
    data() {
      return {
        activeName: 'image-tab',
        images: [],
        curImg: 0,
        descriptions: ''
      }
    },
    watch: {
      disease: function(val) {
        if(val == '') {
          this.images = [];
          this.descriptions = '';
        } else {
          var self = this;
          window.setTimeout(function(){
            self.$emit('update:loading', false);
            self.getDiseaseDetail();
          }, 800);
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      updateNote(index) {
        this.curImg = index;
      },
      getDiseaseDetail() {
        var self = this;
        self.$axios({
          method: 'get',
          url: '/api/'
        })
      }
    },
    computed: {
      curImgNote: function() {
        if(this.images.length == 0) {
          return {result: '', level: '', advice: '', time: ''};
        } else {
          const res = this.images[this.curImg];
          if(res == undefined) {
            return {result: '', level: '', advice: '', time: ''};
          }
          res['time'] = '2018-10-18 11:00:00';
          return res;
        }
      }
    }
  }


</script>

<style type="text/css">
  #illDetails {
    /*padding: 10px;*/
    /*background-color: cyan;*/
  }
  .passage-box {
    height: 300px;
    overflow: auto;
  }
  .passage {
    text-align: left;
    margin: 5px 30px;
    line-height: 1.5em;
    text-indent: 2em;
  }
  .margin-top-m20 {
    margin-top: -20px;
  }
  .text-left {
    text-align: left;
  }
</style>