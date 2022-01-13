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
          <input @focus="onfocus" @blur="onblur" type="text" v-model="admin.username"></input>
          <label style="position: absolute;top: 0;left: 3px" @click="(e)=>{e.target.previousElementSibling.focus()}">手机号</label>
        </div>

        <div class="adminLoginPage-container-inp2">
          <input @focus="onfocus" @blur="onblur" v-model="admin.password" type="password" ref="pwdInput"></input>
          <label style="position: absolute;top: 0;left: 3px" @click="(e)=>{e.target.previousElementSibling.focus()}">密码</label>
          <img :src=pwdImg @mousedown="pwdVisible" @mouseup="pwdInvisible">
        </div>

        <div class="adminLoginPage-verify">
          <input @focus="onfocus" @blur="onblur" v-model="admin.code"></input>
          <label style="position: absolute;top: 0;left: 3px"  @click="(e)=>{e.target.previousElementSibling.focus()}">验证码</label>
          <img :src=captchaUrl @click="getCaptcha">
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
      pwdImg:require("../../assets/img/AdminPage/pwdInvisible.webp"),
      showPwdVisible:false,
      captchaUrl:null,
      admin:{
        username:'',
        password:'',
        code:'',
        token:'',
      }
    }
  },
  methods:{
    //输入框聚焦时提示文字上移
    onfocus(e){
      e.target.nextElementSibling.style.top = '-30px'
      e.target.nextElementSibling.style.fontSize = '15px'
    },
    //输入框失焦时提示文字下移
    onblur(e){
      if (e.target.value === ''){
        e.target.nextElementSibling.style.top = '0'
        e.target.nextElementSibling.style.fontSize = '20px'
      }
    },
    //密码显示
    pwdVisible(){
        this.pwdImg = require('../../assets/img/AdminPage/pwdVisible.webp')
        this.$refs.pwdInput.type = 'text'
    },
    //密码隐藏
    pwdInvisible(){
        this.pwdImg = require('../../assets/img/AdminPage/pwdInvisible.webp')
        this.$refs.pwdInput.type = 'password'
    },
    //点击登录
    checkAdminAccount(){
      //加载遮罩设为true
      this.loading = true
      // 手机号正则验证
      const regPhone = /^1[0-9]{10}$/

      if (regPhone.test(this.admin.username) && !this.$strIsNull(this.admin.code)){
          let url = "/adminLogin"
          axios.post(url,this.admin).then((res) => {
            if (res.data.code === 200){
              const jwt = res.headers['authorization']
              console.log(jwt)
              this.$store.commit('SET_TOKEN',jwt)
              if (this.$store.state.token){
                this.$router.push('/AdminPage')
              }else{
                this.$message.error('登陆失败')
              }
            }else{
              this.$message.warning(res.data.msg)
            }
          }).catch((e) => {
            console.log(e)
            this.$message.error("登陆失败")
          }).finally(() => {
            this.loading = false
          })
      }else{
        this.loading = false
        this.$message.warning("请检查用户名或密码格式")
      }
    },

    //获取验证码图片和token
    getCaptcha(){
      //清空验证码
      this.axios.get("/getCaptcha").then((res)=>{
        this.captchaUrl = res.data.data.captchaImg;
        this.admin.token = res.data.data.token;
      })
    }
  },
  mounted() {
    this.getCaptcha();
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/adminLoginPage.css";
</style>
