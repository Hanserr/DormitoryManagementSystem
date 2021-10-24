<template>
  <div class="userInfo">
    <div class="userInfo-container">
      <div class="userInfo-container-top">
        <div class="userInfo-container-top-left" @click="uploadAva">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data(){
    return{

    }
  },
  methods:{
    uploadAva(){
      this.$router.push('/uploadAvatar','_blank')
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/ClientPage/userInfo.css";
</style>
