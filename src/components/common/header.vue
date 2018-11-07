<template>
  <div class="header-container">
    <el-menu
      mode="horizontal"
      class="self-header"
      @select="handleSelect"
      background-color="#00bcd4"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="curIndex"
    >
      <el-menu-item index="1">诊治主页</el-menu-item>
      <el-menu-item index="2">疾病库</el-menu-item>
      <el-menu-item index="3">统计中心</el-menu-item>
      <el-menu-item index="4">实例表登记</el-menu-item>
    </el-menu>
<!--     <div class="self-header">
      <ul class="navigation">
        <li>
          <router-link to="page1">诊治主页</router-link>
        </li>
        <li>
          <router-link to="page2">疾病库</router-link>
        </li>
        <li>
          <router-link to="page3">统计中心</router-link>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'self-header',
    props: ['curIndex'],
    data() {
      return {
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log("" + key + ", " + keyPath);
        this.$emit("rchange", key);
      }
    }
  }
</script>

<style scoped>
  .header-container {
    padding-bottom: 70px;
  }
  .self-header {
    padding-left: 65px;
    position: fixed;
    top: 0;
    width: 100%;
    height: auto;
    z-index: 10;
  }
  .self-header a {
    display: block;
    text-decoration: none;
    font-size: 16px;
  }
</style>