<template>
  <div class="picture">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="病例图片" name="first">
        <div>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
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
  export default {
    data() {
      return {
        activeName: 'first'
      };
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
    width: 50%;
  }
  .prescription {
    text-align: left;
  }
</style>
