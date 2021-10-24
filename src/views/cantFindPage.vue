<template>
<div class="page404">
  <div class="title404">It looks like you're lost...</div>
  <div class="button404" @click="backHome">
    <span style="line-height: 45px">GO BACK HOME</span>
  </div>
</div>
</template>

<script>
export default {
  name: "cantFindPage",
  methods:{
    backHome(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
@import "../assets/css/404.css";
</style>
