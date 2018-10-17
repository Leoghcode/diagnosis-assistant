<template>
  <div class="picture">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="病例图片" name="first">
        <div>
          <image-viewer :img-list="images"></image-viewer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="病例处方" name="second">
        <el-row>
          <div class="prescription">
            <h2 class="">处方如下：</h2>
            <div class="">
              <div class="text item">
                1. xxxxxxxxxx
              </div>
              <div class="text item">
                2. xxxxxxxxxxxxxxxxxxx
              </div>
              <div class="text item">
                3. xxxxxxxxxxx
              </div>
              <div class="text item">
                4. xxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </div>
              <div class="text item">
                5. xxxxxxxxxxx
              </div>
            </div>
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
  import skin_1 from '../../assets/skin/skin_1.jpg'
  import skin_2 from '../../assets/skin/skin_2.jpg'
  import skin_3 from '../../assets/skin/skin_3.jpg'
  import skin_4 from '../../assets/skin/skin_4.jpg'
  const images = [
    {image: skin_1, name: 'skin_1.jpg', result: '皮肤病A', level: '轻微', advice: '自行买皮肤药'},
    {image: skin_2, name: 'skin_2.jpg', result: '皮肤病B', level: '中度', advice: '就医，买药'},
    {image: skin_3, name: 'skin_3.jpg', result: '皮肤病C', level: '严重', advice: '立即就医'},
    {image: skin_4, name: 'skin_4.jpg', result: '皮肤病D', level: '紧急', advice: '立即就医'}
  ];
  export default {
    data() {
      return {
        activeName: 'first',
        images: images
      };
    },
    components: {
        ImageViewer: ImageViewer
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
