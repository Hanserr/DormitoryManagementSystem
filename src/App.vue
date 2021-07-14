<template>
  <div id="app">
    <div class="nav">
      <leftNav></leftNav>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  method:{
  }
}
</script>
<style scoped>
  @import "./assets/css/app.css";
</style>
