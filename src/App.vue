<template>
  <!-- 头部 -->
  <Header ></Header>
  <!-- 路由出口 -->
  <RouterView />
    <!-- 底部 -->
    <Footer></Footer>

</template>

<script >
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

export default{
  components:{
    Header,Footer
  }
 
}
</script>

<style scoped>

</style>
