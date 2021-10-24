<template>
<div class="body">
  <div class="warning">
    <span>仅支持PNG/JPG/JPEG/GIF格式的图片</span>
    <br>
    <span>你也可以从我们提供的图片中选一张作为头像</span>
    <button class="backToPrevious" @click="backToPrevious">返回上一页</button>
  </div>
  <el-divider></el-divider>

  <div class="middle">

  <div class="left">
  <el-upload
    class="avatar-uploader"
    action="http://localhost:8090/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    v-loading="loading">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  </div>

  <div class="right">

    <div class="ri-span">
    <span>头像预览</span>
    </div>

    <div class="ri-img">
      <img :src="this.avaUrl">
    </div>

    <div class="butt">
      <button @click="saveAva">确定</button>
    </div>
  </div>

  </div>
  <el-divider></el-divider>

    <span class="spanava">下列是我们准备好的头像</span>
  <div class="bottom">
    <div v-for="pic in preAva" class="ava"  @click="selectAva(pic.src)">
      <img :src="pic.src">
    </div>
  </div>


</div>
</template>

<script>
import axios from "axios";
import {client,getFileNameUUID} from "../../oss";

export default {
  name: "uploadAvatar",
  data(){
    return{
      imageUrl: '',
      avaUrl:require('../../assets/img/clientPage/preparedAva/blank.webp'),
      loading:false,
      preAva:[
        {src:require('../../assets/img/clientPage/preparedAva/ava1.webp')},
        {src:require('../../assets/img/clientPage/preparedAva/ava2.webp')},
        {src:require('../../assets/img/clientPage/preparedAva/ava3.webp')},
        {src:require('../../assets/img/clientPage/preparedAva/ava4.webp')},
        {src:require('../../assets/img/clientPage/preparedAva/ava5.webp')},
      ]
    }
  },
  methods:{
    //头像上传成功
    handleAvatarSuccess(res, file) {
      this.avaUrl = this.imageUrl = URL.createObjectURL(file.raw);
      this.loading = false
    },
    //头像上传失败
    handleAvatarError(){
        this.loading = false
        this.$message.error('头像上传失败!');
    },
    //头像上传前
    beforeAvatarUpload(file) {
      this.loading = true
      const check = file.type === 'image/jpeg'||'image/jpg'||'image/png'||'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!check) {
        this.loading = false
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return check && isLt2M;
    },
    //选择备用头像
    selectAva(src){
      this.avaUrl = src
      this.imageUrl = ''
    },
    //保存头像
    saveAva(){
      let url = 'http://localhost:8090/uploadAva';
      axios.post(url,this.avaUrl).then((res)=>{

      })
      this.$router.push('/userCenter')
    },
    //返回上一页
    backToPrevious(){
      if (window.history.length > 1){
        this.$router.go(-1);
      }
    }
    //

  }
}
</script>

<style scoped>
@import'../../assets/css/ClientPage/uploadAvatar.css';
</style>

