<template>
  <div class="VueAudio" style="width: 293px;height: 180px;overflow: hidden;position: fixed;top: 500px;left: 0" ref="VueAudio">
    <audio ref="audio" preload="auto"></audio>
<!--黑胶碟片-->
    <div class="VueAudio-disk" :style="{top:diskTop+'px','animation-play-state':showRotate}">
      <img :src="this.song.coverPath" alt="cover" class="VueAudio-disk-cover">
    </div>
<!--控制-->
    <div class="VueAudio-control" ref="player" v-drag>
      <div class="VueAudio-control-panel">
        <img src="../assets/img/player/previous.webp" alt="上一首" @click="previous()">
        <img :src="this.playImgSrc" alt="播放" @click="play()">
        <img src="../assets/img/player/next.webp" alt="下一首" @click="next()">
      </div>
      <!--    标题；歌手-->
      <div class="VueAudio-title">
<!--          歌曲名-->
        <div class="VueAudio-title-container" style="left:140px;top:3px">
          <div id="VueAudio-title-musicName" ref="musicTitle">
            <span>{{this.song.musicTitle}}</span>
          </div>
        </div>
<!--          歌手名-->
        <div class="VueAudio-title-container" style="left: 140px;top: 23px">
          <div class="VueAudio-title-artist"  ref="musicSinger">
            <span>{{this.song.artist}}</span>
          </div>
        </div>
      </div>
<!--      进度条-->
      <p style="left:35px" class="VueAudio-control-time">{{formatTime(this.song.currentTime)}}</p>

      <div class="VueAudio-control-progressArea" @mouseenter="displayPoint" @mouseleave="hidePoint" @mousedown="mouseBarDown" @mouseup="mouseBarUp">
        <div class="VueAudio-control-buffered"  style="width: 0;" ref="progressBuffer"></div>
        <div class="VueAudio-control-progressBar" style="width: 0" ref="progressBar" @mousedown.stop="mouseBarDown" @mousemove.stop="moveBar" @mouseup="mouseBarUp"></div>
        <div class="VueAudio-control-point" @mouseenter="mouseBarEnter" @mousedown.stop="mousePointDown" @mousemove.stop="moveBar" @mouseup="mouseBarUp" @mouseleave="mouseBarLeave" style="left: 0" ref="progressPoint" v-show="showPoint"></div>
      </div>
      <p style="left: 215px" class="VueAudio-control-time">{{formatTime(this.song.duration)}}</p>

<!--      音量-->
      <div class="VueAudio-control-volume">
        <div class="VueAudio-control-volumeBar" style="height: 90px" v-show="showVolume" @mouseenter="displayVolume" @mouseleave="hideVolume" @mousedown.stop="startVolumeEvent" @mousemove.stop="volumeEvent" @mouseup="endVolumeEvent">
          <div class="VueAudio-control-volumeBar-inside" ref="volumeBarInside" style="height:40%"></div>
        </div>
        <img :src="volumeImg" alt="volume" @click.stop="muted" @mouseenter="displayVolume" @mouseleave="hideVolume">
      </div>
<!--     播放模式选择 -->
      <div class="VueAudio-control-mode">
        <img :src="modeImg" :title="modeDescription" alt="mode" @click="chooseMode(playerMode)" style="width: 20px;height: 20px;margin-left: 5px">
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "VueAudio",
  data(){
    return{
      diskTop:40, //黑胶盘片距顶部高度
      playImgSrc:require("../assets/img/player/pause.webp"), //暂停图标
      volumeImg:require('../assets/img/player/volume.webp'), //音量图标
      showVolume:false, //显示音量条
      showVolumeTimer:null, //音量条显示定时器
      showRotate:'pause', //黑胶片旋转
      controlVolumeMark:false, //是否正在控制音量条,
      tempVolume:0, //音量临时存储
      currentSong:0, //当前歌曲链接id
      pointCurrentPercentage:0, //进度点当前百分比
      downed:false, //鼠标是否落下
      showPoint:false, //是否显示进度点
      playerMode:1, //播放方式：1顺序 2随机 3单曲循环
      modeImg:require("../assets/img/player/inOrder.webp"),//播放方式图片
      modeDescription:null,//对播放模式的说明

      song:{
        coverPath:'',//封面路径
        musicPath:'',//歌曲路径
        musicTitle:'',//歌曲标题
        artist:'',//歌手
        duration:0, //总时长
        currentTime:0, //当前时长
      },

      songList:[
        1392089491,//keep you mine
        1457707546,//love story
        28481404,//endless road
        1442466883,//花に亡霊
        1810759818,//今日重到苏澜桥
        1830490788,//爱就一个字
        631060,//人形ノ涙
        1482647103,//你不在故事里
      ],

    }
  },
  methods: {
    //控制播放或暂停
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.playImgSrc = require("../assets/img/player/play.webp")
        this.diskTop = 10
        this.showRotate = 'running'
      } else {
        this.playImgSrc = require("../assets/img/player/pause.webp")
        this.diskTop = 40
        this.showRotate = 'paused'
        this.tempVolume = this.$refs.audio.volume
        this.$refs.audio.pause()
      }
    },

    //随机播放
    randomNum(){
      let i = Math.floor(Math.random()*(this.songList.length+1))
      return this.songList[i]
    },

    //播放模式选择
    chooseMode(currentMode){
      switch (currentMode){
        case 1:
          this.playerMode = 2
          this.modeImg = require("../assets/img/player/random.webp")
          this.modeDescription = '随机播放'
          break
        case 2:
          this.playerMode = 3
          this.modeImg = require("../assets/img/player/cycle.webp")
          this.modeDescription = '单曲循环'
          break
        case 3:
          this.playerMode = 1
          this.modeImg = require("../assets/img/player/inOrder.webp")
          this.modeDescription = '顺序播放'
          break
      }
    },

    //上一首
    previous(){
      let currentSongId = null
      let previousSongId = null
      this.$refs.progressBuffer.style.width = 0+'%'
      for (let i = 0;i<this.songList.length;i++){
        if (this.songList[i] === this.currentSong){
          currentSongId = i
          break
        }
      }
      if (currentSongId-1 < 0){
        previousSongId = this.songList.length-1
      }else{
        previousSongId = currentSongId-1
      }
      this.updateMusic(this.songList[previousSongId])
    },
    //下一首
    next(){
      let currentSongId = null
      let nextSongId = null
      this.$refs.progressBuffer.style.width = 0+'%'
      for (let i = 0;i<this.songList.length;i++){
        if(this.songList[i] === this.currentSong){
          currentSongId = i
          break
        }
      }
      if (currentSongId+1 === this.songList.length){
        nextSongId = 0
      }else{
        nextSongId = currentSongId+1

      }
      switch (this.playerMode){
        case 1:
          this.updateMusic(this.songList[nextSongId]);
          break;
        case 2:
          this.updateMusic(this.randomNum())
          break
        case 3:
          this.updateMusic(this.songList[currentSongId])
      }

    },

    //更新音乐的方法；传入id
    updateMusic(id){
      let musicUrl = 'https://api.imjad.cn/cloudmusic/?type=song&id='+id+'&br=320000'
      let detailUrl = 'https://api.imjad.cn/cloudmusic/?type=detail&id='+id
      axios.get(detailUrl).then((res) => {
        //获取音乐细节
        this.song.musicTitle = res.data.songs[0].name//歌名
        this.song.artist = res.data.songs[0].ar[0].name//歌手
        this.song.coverPath = res.data.songs[0].al.picUrl//封面路径
        axios.get(musicUrl).then((res) => {
          //音乐链接
          this.song.musicPath = res.data.data[0].url
          //歌曲id存入当前音乐
          this.currentSong = id
          //音乐链接赋给audio
          this.$refs.audio.src = this.song.musicPath
          //开始播放
          this.play()
        }).catch(() => {
            this.$message.error('获取歌曲错误')
        })
      }).catch(() => {
        this.$message.error('未能成功获取音乐详情')
      })
    },

    //遍历获取当前元素距窗口顶部总高度,直到最外层父元素
    getTotalHeight(el){
      let height = el.offsetTop
      let parent = el.offsetParent
      while(parent != null){
        height += parent.offsetTop
        parent = parent.offsetParent
      }
      return height
    },

    //遍历获取当前元素距窗口左侧总长度,直到最外层父元素
    getTotalWidth(el){
      let width = el.offsetLeft
      let parent = el.offsetParent
      while(parent != null){
        width += parent.offsetLeft
        parent = parent.offsetParent
      }
      return width
    },

    //修改样式的公共方法；返回鼠标距进度条左侧的距离
    commonModifyCSS(e){
      let globalToLeft = 0
      let left = this.getTotalWidth(this.$refs.progressBar)+6
      //鼠标距页面左侧距离
      let mouseToLeft = e.pageX
      //鼠标距进度条左侧距离
      //防止进度条越界，对距离判断完再赋值
      if (mouseToLeft - left < -6){
        globalToLeft =  -6
      }else if (mouseToLeft - left > 124){
        globalToLeft  = 124
      }else{
        globalToLeft = mouseToLeft - left
      }
      this.$refs.progressBar.style.width = (globalToLeft+6)/130*100+'%'
      this.$refs.progressPoint.style.left = (globalToLeft)/130*100+'%'
      return globalToLeft+6
    },

    //初始化
    create(){
      //默认关闭盘片旋转
      this.showRotate = 'paused'
      //默认音量40%
      this.$refs.audio.volume = 0.4
      //当前音量赋给临时音量
      this.tempVolume = this.$refs.audio.volume
      //获取歌曲相关信息;br:码率;默认播放第一首歌
      this.currentSong = this.songList[0]
      let url = 'https://api.imjad.cn/cloudmusic/?type=song&id='+this.currentSong+'&br=320000'
      axios.get("https://api.imjad.cn/cloudmusic/?type=detail&id="+this.currentSong).then((res) => {
        this.song.musicTitle = res.data.songs[0].name//歌名
        this.song.artist = res.data.songs[0].ar[0].name//歌手
        this.song.coverPath = res.data.songs[0].al.picUrl//封面路径
        axios.get(url).then((res) => {
          this.song.musicPath = res.data.data[0].url
          this.$refs.audio.src = this.song.musicPath
        }).catch(() => {
          this.$message.error('获取歌曲失败')
        })
      }).catch(() => {
        this.$message.error('获取歌曲详情失败')
      })

      //加载歌曲时缓冲
      this.$refs.audio.onprogress = () => {
        if (this.$refs.audio.buffered.length > 0){
          for (let i = 0; i<this.$refs.audio.buffered.length; i++){
            let start = this.$refs.audio.buffered.start(i)
            let end = this.$refs.audio.buffered.end(i)
            this.$refs.progressBuffer.style.width = (end - start)/this.song.duration*100+'%'
          }
        }
      }

      //产生打断事件后缓冲
      this.$refs.audio.onseeked  = () => {
        if (this.$refs.audio.buffered.length > 0){
          for (let i = 0; i<this.$refs.audio.buffered.length; i++){
            let start = this.$refs.audio.buffered.start(i)
            let end = this.$refs.audio.buffered.end(i)
            this.$refs.progressBuffer.style.width = (end - start)/this.song.duration*100+'%'
          }
        }
      }

      //音频时长变化;得到时长数据
      this.$refs.audio.ondurationchange = () =>{
        this.song.duration = this.$refs.audio.duration
      }

      // 当前数据可以触发
      this.$refs.audio.oncanplay = () => {
      }

      //正在播放;把当前时间赋给全局变量
      this.$refs.audio.ontimeupdate = () => {
        this.song.currentTime = this.$refs.audio.currentTime
      }

      // 音频播放完毕
      // 设置盘片停止旋转；播放键变暂停键
      this.$refs.audio.onended = () => {
        this.showRotate = 'paused'
        this.diskTop = 40
        this.playImgSrc = require("../assets/img/player/pause.webp")
        setTimeout(()=>{
          this.next()
        },2000)
      }

      // 错误
      this.$refs.audio.onerror = () => {
        this.$message.error('音乐加载出错')
      }

    },

    //格式化时间，返回时间字符串
    formatTime(time){
      //未获取到时间返回00:00
      if (!time){
        return `00:00`
      }
      let min = Math.floor(time/60).toString().padStart(2,'0')
      let sec = Math.floor(time%60).toString().padStart(2,'0')
      return `${min}:${sec}`
    },

    //鼠标进入进度条时显示进度点
    displayPoint(){
      this.showPoint = true
    },

    //监听已播放时间
    progressWatcher(){
      return this.$watch('song.currentTime',(newVal,oldVal) => {
        let i = (newVal/this.$refs.audio.duration)*130-4+'px';
        this.$refs.progressBar.style.width = (newVal/this.$refs.audio.duration)*100+'%'
        this.$refs.progressPoint.style.left = i
      })
    },

    //鼠标进入进度点后取消进度条监听
    mouseBarEnter(){
      this.unWatch()
    },

    // 同时处理点击进度条跳转事件
    mouseBarDown(e){
      this.$refs.audio.currentTime =  Math.floor(this.$refs.audio.duration*(this.commonModifyCSS(e)/124))
      this.playImgSrc = require("../assets/img/player/play.webp")
      this.diskTop = 10
      this.showRotate = 'running'
      this.$refs.audio.play()
    },

    //进度点处落下鼠标
    mousePointDown(e){
      this.downed = true
      this.commonModifyCSS(e)
    },

    //拖进度条
    moveBar(e){
      this.unWatch()
        if (this.downed){
          this.commonModifyCSS(e)
        }
      },

    //鼠标松开时进度条时标识设为false
    mouseBarUp(e){
      this.downed = false
      this.$refs.audio.currentTime = Math.floor(this.$refs.audio.duration*(this.commonModifyCSS(e)/130))
    },

    //鼠标离开进度点时继续监听进度条
    mouseBarLeave(){
      this.unWatch = this.progressWatcher()
    },

    //鼠标离开进度条时隐藏进度点
    hidePoint(e) {
      this.showPoint = false
      this.downed = false
    },

    //控制静音或取消静音
    muted(){
      if(this.$refs.audio.muted) {
        this.volumeImg = require('../assets/img/player/volume.webp')
        this.$refs.audio.muted = false
        //取消静音时把音量恢复到静音前数据
        this.$refs.audio.volume = this.tempVolume
        //高度相应的变化
        this.$refs.volumeBarInside.style.height = this.tempVolume*100+'%'
      }else{
        this.volumeImg = require('../assets/img/player/muted.webp')
        //静音时把音量条高度设为0%
        this.$refs.volumeBarInside.style.height = 0+'%'
        this.$refs.audio.muted = true
      }
    },

    //显示音量条
    displayVolume(){
      clearTimeout(this.showVolumeTimer)
        this.showVolume = true
    },

    //隐藏音量条
    hideVolume(){
      //设置延时防止鼠标移到音量条的过程中音量条消失;进度条消失时把音量调节标识设为false
      this.showVolumeTimer =  setTimeout(() => {
        this.showVolume = false
        this.controlVolumeMark = false
      },200)
    },

    //开始控制音量:同时处理鼠标点击修改音量的方法
    startVolumeEvent(e){
      this.$refs.audio.muted = false
      this.volumeImg = require('../assets/img/player/volume.webp')
      // 音量条顶端至窗口顶端的距离
      let barTop = this.getTotalHeight(this.$refs.volumeBarInside)
      // 音量条底端至窗口顶端的距离
      let barDistance = this.$refs.volumeBarInside.offsetHeight + barTop
      // 鼠标在音量条内距底部的距离
      let mouseToBar = barDistance - e.pageY
      // 根据鼠标距离算得音量条高度,同时设置音量
      this.$refs.volumeBarInside.style.height = (mouseToBar/90)*100+'%'
      this.$refs.audio.volume = (mouseToBar/90)
      this.tempVolume = this.$refs.audio.volume
      // 鼠标落下，开始控制音量条，将标识设为true
      this.controlVolumeMark = true
    },

    //正在控制音量:滑动调节音量
    volumeEvent(e){
      clearTimeout(this.showVolumeTimer)
      //只有当鼠标按下移动后(controlVolumeMark标识为true)才能触发此方法
      if (this.controlVolumeMark){
        // 音量条底端到窗口顶端距离
        let barTop = this.getTotalHeight(this.$refs.volumeBarInside)
        // 音量条底端至窗口顶端的距离
        let barDistance = this.$refs.volumeBarInside.offsetHeight + barTop
        // 鼠标在音量条内距底部的距离
        let mouseToBar = barDistance - e.pageY
        // 根据鼠标距离算得音量条高度
        this.$refs.volumeBarInside.style.height = (mouseToBar/90)*100+'%'
        // 设置音量;为了避免高度误差产生的bug,判断完鼠标运动高度后才会赋值
        if (mouseToBar < 0){
          this.$refs.volumeBarInside.style.height = 0+'%'
          this.$refs.audio.volume = 0
        }else if (mouseToBar > 90){
          this.$refs.volumeBarInside.style.height = 100+'%'
          this.$refs.audio.volume = 1
        }else{
          this.$refs.audio.volume = (mouseToBar/90)
        }
        this.tempVolume = this.$refs.audio.volume
      }
    },
    //结束控制音量
    endVolumeEvent(){
      this.controlVolumeMark = false
    }
  },
  created() {
    this.unWatch = this.progressWatcher()
  },
  mounted() {
    this.create()
  },
  beforeDestroy() {
    clearTimeout(this.showVolumeTimer)
  },

}
</script>
<style scoped>
body{
  margin: 0;
  padding: 0;
  font-family: Harmony;
}
/*黑胶旋转*/
@keyframes move {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
/*标题滚动*/
@keyframes titleMove {
  0%{
    transform: translateX(100px);
  }
  100%{
    transform: translateX(-300px);
  }
}

.VueAudio {
  /*禁止选择*/
  -moz-user-select:none; /* Firefox私有属性 */
  -webkit-user-select:none; /* WebKit内核私有属性 */
  -ms-user-select:none; /* IE私有属性(IE10及以后) */
  -khtml-user-select:none; /* KHTML内核私有属性 */
  -o-user-select:none; /* Opera私有属性 */
  user-select:none; /* CSS3属性 */
  z-index: 9999;
  font-family: Harmony;
}
.VueAudio-disk{
  background: url("../assets/img/player/diskBackground.webp")no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: relative;
  left: 20px;
  z-index: 99;
  transition: all linear 0.2s;
  animation: move 15s linear infinite;
}
.VueAudio-disk-cover{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  position: relative;
  top: 10px;
  left: 10px;
}
.VueAudio-control{
  position: relative;
  background-color: #559bac;
  width: 280px;
  height: 120px;
  top: -50px;
  left: 5px;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 1px #2c2c2c;
}
/*控制区*/
.VueAudio-control-panel{
  width: 145px;
  height: 30px;
  float: right;
  margin-top: 50px;
  margin-right: 25px;
}
/*控制按键*/
.VueAudio-control-panel img{
  width: 30px;
  height: 30px;
  margin-left: 15px;
  cursor: pointer;
}
/*全部进度条*/
.VueAudio-control-progressArea{
  background-color: #414141;
  height: 3px;
  width: 130px;
  position: absolute;
  top: 106px;
  left: 75px;
  border-radius: 5px;
  z-index: 20;
}
.VueAudio-control-progressArea:hover{
  top: 105px;
  height: 5px;
  border-radius: 5px;
}
/*已播放进度条*/
.VueAudio-control-progressBar{
  background-color: #bb3a3a;
  height: 100%;
  top: 80px;
  border-radius: 5px;
}
/*进度点圆环*/
.VueAudio-control-point{
  background-color: #bb3a3a;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  position: relative;
  top: -9px;
  cursor: pointer;
  overflow:hidden;
  z-index: 99;
}
/*缓冲条*/
.VueAudio-control-buffered{
  position: absolute;
  background-color: #8d8d8d;
  height: 100%;
  top: 0;
  z-index: -20;
  border-radius: 5px;
}
/*时间*/
.VueAudio-control-time{
  font-size: 5px;
  position: absolute;
  color: #3b3b3b;
  top: 93px;
}
/*曲名；歌手*/
.VueAudio-title span{
  font-size: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  color: #4c4d4c;
  top: -4px;
}
/*歌曲名*/
#VueAudio-title-musicName{
  text-align: center;
  height: 100%;
  /*animation: linear infinite titleMove 5s;*/
}
/*歌手*/
.VueAudio-title-artist{
  text-align: center;
  width: auto;
  height: 100%;
  transition: 5s linear;
}
.VueAudio-title-container{
  position: absolute;
  height: 15px;
  width: 100px;
  overflow: hidden;
}
/*音量控制*/
.VueAudio-control-volume{
  width: 20px;
  height: 120px;
  position: absolute;
  top: 0;
  left: 255px;

}
/*音量条外部包裹*/
.VueAudio-control-volumeBar{
  background-color: #8c8c8c;
  width: 15px;
  position: relative;
  top: 5px;
  left: 3px;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px rgb(103, 103, 103);
}
/*音量图标*/
.VueAudio-control-volume img{
  width: 18px;
  height: 18px;
  position: absolute;
  top: 98px;
  left: 2px;
  cursor: pointer;
}
/*音量条*/
.VueAudio-control-volumeBar-inside{
  background-color: #f3f3f3;
  width: 15px;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
}
.VueAudio-control-mode{
  width: 25px;
  height: 25px;
  position: relative;
  top: 95px;
  left: 5px;
  cursor: pointer;
}
</style>
