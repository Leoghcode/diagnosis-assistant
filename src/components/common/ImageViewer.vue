<template>
<div>
  <el-carousel :autoplay="false" height="" @change="carouselChange">
    <el-carousel-item v-for="image in images" :key="image.name">
      <img width="300" height="300" :src="image.image" @click="openDialog(image.image)">
    </el-carousel-item>
  </el-carousel>
  <div>
    <el-row>
      <el-dialog top="0" :modal="true" :close-on-click-modal="true" :visible.sync="imageMode">
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