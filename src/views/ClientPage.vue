<template>
  <div class="ClientPage-Container">
    <VueAudio></VueAudio>

    <div class="ClientPage">
      <div class="ClientPage-Top">
        <div class="ClientPage-Top-left">
          <div class="ClientPage-Top-left-img"></div>
          <H1 style="color: #c5c5c5">Hogwarts School Dormitory Management System</H1>
          <H4 style="color: #504f4f">Draco Dormiens Nunquam Titillandus</H4>
        </div>
    <!--      avatar area on the right side-->
        <div class="ClientPage-Top-right">
    <!--      user avatar-->
            <div class="ClientPage-Top-right-avatar-img" @mouseenter="displayMenu" @mouseleave="hideMenu" @click="openUserCenter"></div>
            <!--      user operation-->
            <transition name="fade">
              <div class="ClientPage-Top-right-avatar-background" v-show="isDisplay" @mouseenter="displayMenu" @mouseleave="hideMenu">
      <!--            username-->
                <div class="ClientPage-Top-right-avatar-name" style="margin-top: 35px;cursor: default"><span>username</span></div>
                <hr style=" width: 160px;height: 1px;background-color: #eaeaea;border: none">
      <!--            personal center-->
                <div class="ClientPage-Top-right-avatar-operation" @click="openUserCenter">个人中心</div>
                <div class="ClientPage-Top-right-avatar-operation" @click="detail">宿舍详情</div>
                <hr style=" width: 160px;height: 1px;background-color: #eaeaea;border: none">
                <!--            logout-->
                <div class="ClientPage-Top-right-avatar-operation" @click="logout">注销</div>
              </div>
            </transition>
        </div>
      </div>
      <div class="ClientPage-Middle">
      </div>
      <div class="ClientPage-Bottom">
        <div class="ClientPage-Bottom-Top">
          <div class="ClientPage-Bottom-Top-Icon">
            <i class="el-icon-phone" style="font-size: 40px"></i>
            <br>
            <span>800-900-1212</span>
          </div>
          <div class="ClientPage-Bottom-Top-Icon">
            <i class="el-icon-message" style="font-size: 40px"></i>
            <br>
            <span>hogwarts@gmail.com</span>
          </div>
          <div class="ClientPage-Bottom-Top-Icon">
            <i class="el-icon-location-outline" style="font-size: 40px"></i>
            <br>
            <span>Queen RO, London, UK</span>
          </div>
        </div>
        <transition name="BottomEnterAndLeave">
          <div class="ClientPage-Bottom-Bottom" :style="{top:bottomTop+'px'}">
            <span style="color: #838383;margin-left: 220px;width: 115px">Developed By</span>
            <router-link style="color: #0fa451;text-decoration: none;margin-top: 15px;margin-left: -8px" to="/introduction" target="_blank">Gu</router-link>
            <span style="color: #838383;width: 210px">. © 2021 All Rights Reserved</span>
            <span style="color: #838383;margin-left: 300px">Follow me&nbsp;&nbsp;</span>
            <img src="../assets/img/clientPage/github.png" alt="github" class="ClientPage-Bottom-Bottom-Icon" @click="openGithub">
            <img src="../assets/img/clientPage/bilibili.png" alt="bilibili" class="ClientPage-Bottom-Bottom-Icon" @click="openBilibili" style="width: 55px;height: 55px;margin-top: -5px">
            <img src="../assets/img/clientPage/NEM.png" alt="NEM" class="ClientPage-Bottom-Bottom-Icon" @click="openNEM">
            <div style="width: 100px;height: 30px;margin-left: 100px;margin-top: 10px">
              <router-link to="/adminLogin" style="text-decoration: none" target="_blank">Admin Entry</router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>
</div>
</template>

<script>
import VueAudio from "../components/VueAudio";
export default {
  components:{VueAudio},
  name: "StuPage",
  data(){
    return{
      isDisplay:false,
      timeOutLoading:0,
      bottomTop:50,
    }
  },
  methods:{
    test(){
      this.$router.push('/AdminPage')
    },

    //mouseenter event
    //when mouse enter the element, it will display
    displayMenu(){
      if (this.timeOutLoading !== 0){
        window.clearTimeout(this.timeOutLoading);
      }
      this.timeOutLoading = setTimeout(()=>{
        this.isDisplay = true
      },300)
    },

    //mouse leave event
    //when mouse leaving, it will hide
    hideMenu(){
      if (this.timeOutLoading !== 0){
        window.clearTimeout(this.timeOutLoading);
      }
      this.timeOutLoading = setTimeout(()=>{
        this.isDisplay = false
      },500)
    },

    //click will skip to the personal center
    openUserCenter(){
      let {href} = this.$router.resolve('/userInfo')
      window.open(href,'_blank')
    },


    //click will skip to the Dormitory detail
    detail(){

    },

    //click will logout the current account
    logout(){

    },

    //when the scroll bar scrolling to the page bottom,the hidden div on the bottom will display
    handleScroll(){
      //height of the scroll bar from the top
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      //visible area height
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      //height of scroll bar
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      //When scrollTop + windowHeight == scrollHeight,the top attribute of scroll bar will
      //become from 50px to 0px and displaying hidden bottom div originally.
      //But after testing, i find a situation when the scroll bar scrolling to the page bottom,
      //the scrollHeight can not equals scrollTop + windowHeight because of some error value.
      //So i added a value of -0.15px to the scrollHeight to eliminate this gap.
      if (scrollTop+windowHeight >= scrollHeight-0.15){
          this.bottomTop = 0
      }else
        this.bottomTop = 50
    },
    openGithub(){
      window.open('https://github.com/Hanserr','_blank')
    },
    openBilibili(){
      window.open('https://space.bilibili.com/53957641','_blank')
    },
    openNEM(){
        window.open('https://music.163.com/#/user/home?id=592543891')
    },

  },
  mounted() {
    addEventListener('scroll',this.handleScroll)
  },
}
</script>

<style scoped>
@import "../assets/css/ClientPage.css";
@import "../assets/css/font.css";
</style>
