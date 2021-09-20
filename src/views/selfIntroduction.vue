<template>
  <div class="selfIntroduction">
    <video src="../assets/video/vidio.mp4" autoplay="autoplay" loop="loop"></video>
    <div class="selfIntroduction-top" ref="selfIntroductionTop">
      <div class="selfIntroduction-top-avatar">
        <img src="../assets/img/selfIntroduction/avatar.jpg" style="width: 80px;height: 80px;border-radius: 40px">
      </div>
      <span style="font-size: 20px;position: relative;left: 655px;top: -30px;color: #ffffff">-hedwig-</span>
    </div>
    <div class="selfIntroduction-middle">
      <div class="selfIntroduction-middle-favSinger">
        <div class="selfIntroduction-middle-favSinger-title">
          <span style="font-size: 20px">喜欢的歌手/乐队？</span>
          <span style="font-size: 20px">My favourite singers or bands?</span>
          <img src="../assets/img/selfIntroduction/favSong.png" style="width: 40px;height: 40px;position: relative;top: 12px">
        </div>
        <div class="selfIntroduction-middle-favSinger-detail">
          <div v-for="(detail,index) in favList" class="selfIntroduction-middle-favSinger-detail-son" :style="{background:'url('+(detail.src)+') no-repeat',backgroundSize:'200px 150px',boxShadow: index%2===0?'0 0 10px 5px #b2c8d9':'0 0 10px 5px #F7A997'}">
            <div class="selfIntroduction-middle-favSinger-detail-intro">
              <span style="color: #ffffff">{{detail.name}}</span>
              <br>
              <span style="color: #cbf4f8;font-size: 15px">{{detail.intro}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="selfIntroduction-middle-favSport">

      </div>
    </div>
    <div class="selfIntroduction-bottom">

    </div>
  </div>
</template>

<script>
export default {
  name: "selfIntroduction",
  data(){
    return{
      favList:[
        {name:'The Chainsmokers',src:require('../assets/img/selfIntroduction/chainsmokers.png'),intro:'美国电子音乐组合，由DJ兼歌手Andrew Taggart 以及DJ Alex Pall 组成'},
        {name:'ILLENIUM',src:require('../assets/img/selfIntroduction/illenium.png'),intro: '来自美国丹佛的制作人ILLENIUM是目前最成功的跨界电子音乐艺人之一'},
        {name: 'Marshmello',src:require('../assets/img/selfIntroduction/marshmello.png'),intro: '原名克里斯·康斯托克（Chris Comstock），美国DJ、电音制作人'},
        {name: 'Vicetone',src:require('../assets/img/selfIntroduction/vicetone.png'),intro: '来自荷兰格罗宁根的DJ及电子音乐双人组，由成员Ruben Den Boer和Victor Pool组成'},
        {name: '泠鸢yousa',src:require('../assets/img/selfIntroduction/yousa.png'),intro: '脱胎于三次元真人的虚拟艺人，中国本土原创最具人气的虚拟偶像之一。粉丝爱称冷鸟'},
        {name: '双笙',src:require('../assets/img/selfIntroduction/shuangsheng.png'),intro: '双笙，本名陈元汐，中国内地古风女歌手'},
        {name: 'Martin Garrix',src:require('../assets/img/selfIntroduction/martin.png'),intro: '荷兰DJ、音乐制作人，毕业于赫尔曼育学院'},
        {name: 'LinkinPark',src:require('../assets/img/selfIntroduction/linkinpark.png'),intro: '林肯公园（Linkin Park），美国摇滚乐队，1996年成立于美国加利福尼亚州'},
        {name: 'ColdPlay',src:require('../assets/img/selfIntroduction/coldplay.png'),intro: '酷玩乐队（Coldplay），英国摇滚乐队，1996年成立于伦敦'},
        {name: '鎖那',src:require('../assets/img/selfIntroduction/sana.png'),intro: '活跃于niconico动画上的歌い手，2010年开始在niconico动画上投稿，主打治愈系声线'},
        {name: 'Taylor Swift',src:require('../assets/img/selfIntroduction/TW.png'),intro: '泰勒·斯威夫特，出生于美国宾夕法尼亚州，美国女歌手、词曲作者、音乐制作人、演员'},
        {name: '司南',src:require('../assets/img/selfIntroduction/sinan.png'),intro: '司南，中国内地女歌手'},
      ],

    }
  },
  methods:{

  },
}
</script>

<style scoped>
@import "../assets/css/selfIntroduction.css";
</style>
