<template>
  <div class="selfIntroduction">
<!--    视频背景-->
    <video src="../assets/video/video.mp4" autoplay="autoplay" loop="loop" ref="video" muted="muted" v-show="isLoaded"></video>
    <img src="../assets/img/selfIntroduction/bgvideo.png" alt="bg" v-show="!isLoaded" class="selfIntroduction-bgPic">
<!--    中间内容部分-->
    <div class="selfIntroduction-container">
<!--      顶部-->
      <div class="selfIntroduction-top" ref="selfIntroductionTop">
<!--        顶部头像区域-->
        <div class="selfIntroduction-top-avatar">
          <img src="../assets/img/selfIntroduction/avatar.jpg" style="width: 80px;height: 80px;border-radius: 40px">
        </div>
        <span style="font-size: 20px;position: relative;left: 620px;top: -30px;color: #9b9b9b">-人形BUG制造机-</span>
        <div class="selfIntroduction-top-banner" ref="topBanner">
          <div><img src="../assets/img/selfIntroduction/bilibili-autumn-1.jpg"></div>
          <div><img src="../assets/img/selfIntroduction/bilibili-autumn-2.jpg"></div>
          <div><img src="../assets/img/selfIntroduction/bilibili-autumn-3.jpg"></div>
          <div><img src="../assets/img/selfIntroduction/bilibili-autumn-4.jpg"></div>
          <div><img src="../assets/img/selfIntroduction/bilibili-autumn-5.jpg"></div>
          <div><img src="../assets/img/selfIntroduction/bilibili-autumn-6.jpg"></div>
        </div>
      </div>
<!--      中间-->
      <div class="selfIntroduction-middle">
        <div class="selfIntroduction-middle-favSinger">
          <div class="selfIntroduction-title" style="  border-radius: 10px;">
            <span style="font-size: 20px;position: relative;top: 20px;left: 20px;color: #cfadf3">EDM×国风</span>
          </div>
<!--        歌手详情-->
          <div class="selfIntroduction-middle-favSinger-detail">
            <div v-for="(detail,index) in favList" class="selfIntroduction-middle-favSinger-detail-son" :style="{background:'url('+(detail.src)+') no-repeat',backgroundSize:'200px 150px',boxShadow: index%2===0?'0 0 10px 5px #b2c8d9':'0 0 10px 5px #F7A997'}">
              <div class="selfIntroduction-middle-favSinger-detail-intro" >
                <span style="color: #ffffff">{{detail.name}}</span>
                <br>
                <span style="color: #cbf4f8;font-size: 15px">{{detail.intro}}</span>
              </div>
            </div>
              <Vbutton style="position: relative;top: 10px;left: -230px" value='Tomorrowland Official' width="200px" text-color="white" @click.native="toTomorrowland"></Vbutton>
              <Vbutton style="position: relative;top: -140px;left: 230px" value='UMF Official' width="200px" text-color="white" @click.native="toUMF"></Vbutton>
          </div>

        </div>
<!--运动-->
        <div class="selfIntroduction-middle-favSport">
          <div class="selfIntroduction-title" style="  border-radius: 10px;">
            <span style="color: yellow;font-size: 20px;position: relative;top: 20px;left: 20px">不同于大众化的球类运动. 公路自行车的局限性注定了这项运动只能是少数人的狂欢</span>
          </div>
          <div class="selfIntroduction-middle-favSport-bannerA" ref="bannerA" style="  border-radius: 10px;margin-top: 10px">
            <div style="position:relative;top: 650px;left: -250px;transition: 0.3s linear" ref="bannerATitle">
              <span style="font-weight: bold;color: white">Le Tour de France</span>
              <br>
              <span style="font-size: 50px;color: white;margin-top: 600px">一骑化身</span>
              <br>
              <span style="font-size: 50px;color: white">城市探险家</span>
              <br>
              <button style="border-radius: 5px;height: 40px;width: 120px;border: none;cursor: pointer" @click="toOfficial" >环法官网</button>
              <button style="border-radius: 5px;height: 40px;width: 120px;border: none;cursor: pointer;margin-left: 5px" @click="toCNofficial">环法中国官网</button>
            </div>
          </div>
          <div class="selfIntroduction-middle-favSport-bannerB" ref="bannerB" style="  border-radius: 10px;margin-top: 10px">
            <div style="position:relative;top: 650px;left: 1400px;transition: 0.3s linear" ref="bannerBtitle">
              <span style="font-size: 50px;color: white;margin-top: 600px">骑行路上</span>
              <br>
              <span style="font-size: 50px;color: white">并不是孤身一人</span>
            </div>
          </div>
        </div>
<!--摄影-->
        <div class="selfIntroduction-middle-favPhotograph">
          <div class="selfIntroduction-title" style="  border-radius: 10px;margin-top: 30px">
            <span style="font-size: 20px;position: relative;top: 20px;left: 20px;color: #4cb3d2">不要忘了走出去感受这个世界的美好</span>
          </div>
          <div class="favPhotoC">
          </div>
          <div class="favPhotoA" style="border-radius: 10px;margin-top: 10px">
          </div>
          <div class="favPhotoB" style="border-radius: 10px;margin-top: 10px">
          </div>
        </div>
      </div>

      <div class="selfIntroduction-bottom" ref="bottom">
        <span ref="poemSpan" style="font-size: 40px;color: #4d4d4d;position: relative;top: 40px">{{this.poetry[0]}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import Vbutton from "../components/Vbutton";
export default {
  name: "selfIntroduction",
  components: {Vbutton},
  data(){
    return{
      //歌手详情列表
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
      poetry:[
        '惊起归鸿不成字，辞柯落叶最知秋。',
        '明夜扁舟去，和月载离愁。',
        '扪萝正意我，折桂方思君。',
        '满堂花醉三千客，一剑霜寒十四州。',
        '一年将尽夜，万里未归人。',
        '九万里风鹏正举。风休住，蓬舟吹取三山去！',
        '风翻白浪花千片，雁点青天字一行。',
        '星散白鸥三四点，数笔横塘秋意。',
        '看白鹤无声，苍云息影，物外行藏。',
        '禅外更无今古，醉归明月千松。',
        '正碧落尘空，光摇半壁，月在万松顶。',
        '贾岛形模元自瘦，杜陵言语不妨村。',
        '问几曾夜宿，月明起看，剑水星纹。',
        '起绕中庭独步，一天星斗文章。',
        '紫垣星月，禁阶灯火，朝马闹晨钟。',
        '铁马晓嘶营壁冷，楼船夜渡风涛急。',
        '黄云万里动风色，白波九道流雪山。',
        '蚂蚁缘槐夸大国，蚍蜉撼树谈何易。',
        '落月满屋梁，犹疑照颜色。',
        '万帐穹庐人醉，星影摇摇欲坠。',
        '云海尘清，山河影满，桂冷吹香雪。',
        '东厢月，一天风露，杏花如雪。',
        '浮云吹作雪 ，世味煮成茶。',
        '短篷南浦雨，疏柳断桥烟。',
        '怀家寒食夜，中酒落花天。',
      ],
      isLoaded:false,
      poemTimer:null,
    }
  },
  methods:{
    //环法官网
    toOfficial(){
      window.open("https://www.letour.fr")
    },
    //环法中国官网
    toCNofficial(){
      window.open("http://www.china-letour.com")
    },
    //明日世界官网
    toTomorrowland(){
      window.open('https://www.tomorrowland.com/home/')
    },
    //UMF官网
    toUMF(){
      window.open('https://www.ultramusicfestival.com')
    },
    // 模仿b站秋季主题banner
    // 头部banner监听器(未熟练掌握)
    changeImg(){
      const imgList = []
      for (let i = 1;i <= 6 ;i++){
        imgList.push(document.querySelector(`.selfIntroduction-top-banner :nth-child(${i}) img`))
      }
      this.$refs.topBanner.addEventListener('mousemove',(e)=>{
        //鼠标x轴/窗口宽度=当前鼠标x轴上的百分比
        let percentage = e.clientX/window.outerWidth
        let ratio = 10*percentage
        let blur = 10
        //循环改变图片位移和模糊
        imgList.forEach((image,index) => {
          //位移时取消过渡
          image.style.transition = 'none'
          ratio *= 1.3
          //越靠后的图片模糊度越高
          blur *= Math.abs((index+1) / 6 - percentage)
          image.style.transform = `translateX(${ratio}px)`
          image.style.filter = `blur(${blur}px)`
        })
      })
      //鼠标离开banner后过渡恢复原位
      this.$refs.topBanner.addEventListener('mouseleave',(e) => {
        imgList.forEach((image) => {
        image.style.transition = '0.1s linear'
        image.style.filter = 'none'
        image.style.transform = 'none'
        })
      })
    },

    //监听滚动条高度。动态设置标题位置
    moveSlogan(){
      window.addEventListener("scroll",e=>{
        let i = document.documentElement.scrollTop || document.body.scrollTop
        if (i >= 856 && i <= 1666){
          this.$refs.bannerATitle.style.left = 100+'px'
        }else if (i <= 555 || i >= 1666){
          this.$refs.bannerATitle.style.left = -250+'px'
        }
        if (i >= 1704 && i <= 2616){
          this.$refs.bannerBtitle.style.left = 900+'px'
        }else if (i >= 2617 || i <= 1380){
          this.$refs.bannerBtitle.style.left = 1300+'px'
        }
      })
    },

    //背景视频加载完成后再显示，否则显示图片
    canPlay(){
      this.$refs.video.oncanplaythrough = (e) => {
        this.isLoaded = true
      }
    },

    //诗歌刷新
    flushPoem(){
      let sum = 0
      this.poemTimer = setInterval((e) => {
        if (sum === this.poetry.length-1){
          sum = 0
        }
        this.$refs.poemSpan.innerText = this.poetry[sum]
        sum++
      },30000)
    },

  },
  //挂载结束后执行的函数
  mounted() {
    this.canPlay()
    this.moveSlogan()
    this.changeImg()
    this.flushPoem()
    console.log("%c%s",'color:red','三百六十行，行行出BUG 🌝')
  },
  //销毁组件前清除定时器
  beforeDestroy() {
    clearInterval(this.poemTimer)
  }
}
</script>

<style scoped>
@import "../assets/css/selfIntroduction.css";
.selfIntroduction-top-banner div{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.selfIntroduction-top-banner img{
  display: block;
  width: 130%;
  height: 100%;
  vertical-align: middle;
  object-fit: cover;
}
</style>
