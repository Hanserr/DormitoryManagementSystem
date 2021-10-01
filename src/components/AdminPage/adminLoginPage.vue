<template>
  <div class="adminLoginPage"
       v-loading="loading"
       element-loading-text= "登陆中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       style="width: 100%">

    <div class="adminLoginPage-container">

      <span>Login</span>

      <div class="adminLoginPage-container-inp1">
        <input @focus="onfocus" @blur="onblur" v-model="admin.account" type="text"></input>
        <label style="position: relative;top: -30px;left: 3px" ref="l1" @click="(e)=>{e.target.previousElementSibling.focus()}">邮箱或手机号</label>
      </div>

      <div class="adminLoginPage-container-inp2">
        <input @focus="onfocus" @blur="onblur" v-model="admin.password" type="password" ref="pwdInput"></input>
        <label style="position: relative;top: -30px;left: 3px" ref="l2" @click="(e)=>{e.target.previousElementSibling.focus()}">密码</label>
        <img :src=pwdImg @click="switchImg">
      </div>

      <button @click="checkAdminAccount">Sign in</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "adminLoginPage",
  data(){
    return{
      loading:false,
      pwdImg:require("../../assets/img/AdminPage/pwdInvisible.png"),
      showPwdVisible:false,
      admin:{
        account:null,
        password:null
      }
    }
  },
  methods:{
    //输入框聚焦时提示文字上移
    onfocus(e){
      e.target.nextElementSibling.style.top = '-55px'
      e.target.nextElementSibling.style.fontSize = '15px'
    },
    //输入框失焦时提示文字下移
    onblur(e){
      if (e.target.value === ''){
        e.target.nextElementSibling.style.top = '-30px'
        e.target.nextElementSibling.style.fontSize = '20px'
      }
    },
    //密码是否可见
    switchImg(){
      if (this.showPwdVisible){
        this.pwdImg = require('../../assets/img/AdminPage/pwdInvisible.png')
        this.showPwdVisible = false
        this.$refs.pwdInput.type = 'password'
      }else{
        this.pwdImg = require('../../assets/img/AdminPage/pwdVisible.png')
        this.showPwdVisible = true
        this.$refs.pwdInput.type = 'text'
      }
    },
    //点击登录
    checkAdminAccount(){
      //加载遮罩设为true
      this.loading = true
      //邮箱正则验证
      const regEmail = /^([a-zA-Z0-9-._])+\@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      //密码正则验证 必须包含数字、英文字母、特殊符号且大于等于8位 特殊符号包括: ~!@#$%^&*
      const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/
      //手机号正则验证
      const regPhone = /^1[0-9]{10}$/
      let url = '/adminLogin'

      if (regEmail.test(this.admin.account)){
        if (regPassword.test(this.admin.password)){
          axios.post(url,this.admin).then((res) => {
            if (res.data.code === 200){
              this.loading = false
            }else{
              this.loading = false
              this.$message.warning('登陆失败,账号或密码不匹配')
            }
          }).catch(() => {
            this.loading = false
            this.$message.error("登陆失败")
          })
        }else{
          this.loading = false
          this.$message.warning('密码错误')
        }
      }else if (regPhone.test(this.admin.account)){
        if (regPassword.test(this.admin.password)){
          axios.post(url,this.admin).then((res) => {
            if (res.data.code === 200){
              this.loading = false
            }else{
              this.loading = false
              this.$message.warning('登陆失败,账号或密码不匹配')
            }
          }).catch(() => {
            this.loading = false
            this.$message.error("登陆失败")
          })
        }else{
          this.loading = false
          this.$message.warning('密码错误')
        }
      }else{
        this.loading = false
        this.$message.warning('账号格式错误')
      }

    }
  },
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/adminLoginPage.css";
</style>
