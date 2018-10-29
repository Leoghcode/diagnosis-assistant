<!--
  公共组件，用于展示多张图片,图片可以放大显示。
  编辑功能待添加。
  需要的参数： imgList.
  imgList的形式是 [{id: '', imageUrl: obj}]
  obj是image图片。
 -->
<template>
<div>
  <span class="notice">{{ notice }}</span>
  <el-carousel ref="carouselSm" v-show="emptyImgList" :autoplay="false" height="" @change="carouselChange">
    <el-carousel-item v-for="image in images" :key="image.id">
      <img :width="imgWidth" :height="imgHeight" :src="image.imageUrl" @click="openDialog()">
    </el-carousel-item>
  </el-carousel>
  <div>
    <el-row>
      <el-dialog top="0" custom-class="img-dialog" :fullscreen="true" :modal="true" :visible.sync="imageMode">
        <!-- <img width="50%" :src="dialogImg"> -->
        <span class="notice">{{ notice }} {{curImg}}</span>
        <el-carousel ref="carouselBg" :initial-index="curImg" :autoplay="false" height="600px" @change="carouselChange2">
          <el-carousel-item v-for="image in images" :key="image.id">
            <img width="50%" :src="image.imageUrl">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </el-row>
  </div>
</div>
</template>

<script type="text/javascript">

export default {
  name: 'ImageViewer',
  data() {
    return {
      images: this.imgList,
      imageMode: false,
      dialogImg: '',
      curImg: 0
    }
  },
  props: ['imgList', 'width', 'height'],
  watch: {
    imgList: {
      handler(val) {
        // 当外部的imgList改变时，imgViewer的副本images也需要相应改变。
        // 当内部的images因为编辑改变时，同样需要改变外部的imgList。
        this.images = this.imgList;
      }
    }
  },
  computed: {
    notice: function() {
      return this.images.length ? '第(' + (this.curImg + 1) + '/' + this.images.length + ')张图片' : '';
    },
    emptyImgList: function() {
      return this.images.length ? true : false;
    },
    imgWidth: function() {
      return this.width ? this.width : 300;
    },
    imgHeight: function() {
      return this.height ? this.height : 300;
    }
  },
  methods: {
    openDialog(imagePath) {
      this.imageMode = true;
    },
    carouselChange(itemIndex) {
      this.curImg = itemIndex;
      if(this.$refs.carouselBg) {
        this.$refs.carouselBg.setActiveItem(this.curImg);
      }
      this.$emit('imgchange', itemIndex);
    },
    carouselChange2(itemIndex) {
      this.curImg = itemIndex;
      this.$refs.carouselSm.setActiveItem(this.curImg);
      this.$emit('imgchange', itemIndex);
    }
  }
}
</script>

<style scoped>
  /*.img-dialog {
    background: transparent!important;
  }*/
  .notice {
    display: block;
    font-size: 14px;
  }
</style>