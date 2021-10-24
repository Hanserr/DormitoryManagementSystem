<template>
  <div class="welcome-main">
    <img :src="imgSrc" style="background-size: cover">
    <div class="banner">
    <span class="s1">宿舍管理系统Alpha</span>
      <br>
    <span class="s2">By：Gu</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "welcome",
  data(){
    return{
      imgSrc:require('../../assets/img/wel.webp')
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/welcome.css";
</style>
