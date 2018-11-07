<template>
  <div id="app">
    <my-header :cur-index="curIndex" @rchange="changeRoute"></my-header>
    <router-view/>
  </div>
</template>

<script>
import myHeader from './components/common/header';

export default {
  name: 'App',
  components: {
    myHeader: myHeader
  },
  methods: {
    changeRoute(pageIndex) {
      var pageName = 'page' + pageIndex;
      this.$router.push({name: pageName});
    }
  },
  computed: {
    curIndex: function() {
      return this.$route.name[this.$route.name.length - 1];
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
