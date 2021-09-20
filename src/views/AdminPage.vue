<template>
  <div id="AdminPage">
    <div class="AdminPage-nav">
      <leftNav></leftNav>
    </div>
    <div class="AdminPage-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage"
}
</script>

<style scoped>
@import "../assets/css/AdminPage.css";
@import "../assets/css/font.css";
input{
  cursor: pointer;
}
</style>
