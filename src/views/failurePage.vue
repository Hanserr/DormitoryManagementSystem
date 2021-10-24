<template>
<div class="failurePage">
<div class="failurePage-button" @click="back">
<span>GO BACK</span>
</div>
</div>

</template>

<script>
export default {
  name: "failurePage",
  methods:{
    back(){
      //如果没有上一页就返回首页
      if (window.history.length <= 1){
        this.$router.push("/")
      }else{
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/css/500.css";
</style>
