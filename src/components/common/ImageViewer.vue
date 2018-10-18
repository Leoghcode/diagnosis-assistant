<!--
  公共组件，用于展示多张图片,图片可以放大显示。
  编辑功能待添加。
  需要的参数： imgList.
  imgList的形式是 [{name: '', image: obj}]
  obj是image图片。
 -->
<template>
<div>
  <el-carousel :autoplay="false" height="" @change="carouselChange">
    <el-carousel-item v-for="image in images" :key="image.name">
      <img width="300" height="300" :src="image.image" @click="openDialog(image.image)">
    </el-carousel-item>
  </el-carousel>
  <div>
    <el-row>
      <el-dialog top="0" :modal="true" :visible.sync="imageMode">
        <img width="100%" :src="dialogImg">
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
      curImg: ''
    }
  },
  props: ['imgList'],
  watch: {
    imgList: function(val) {
      // 当外部的imgList改变时，imgViewer的副本images也需要相应改变。
      // 当内部的images因为编辑改变时，同样需要改变外部的imgList。
      this.images = this.imgList;
    }
  },
  methods: {
    openDialog(imagePath) {
      this.imageMode = true;
      this.dialogImg = imagePath;
    },
    carouselChange(itemIndex) {
      this.curImg = itemIndex;
      this.$emit('imgchange', itemIndex);
    },
  }
}
</script>