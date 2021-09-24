<!--自定义按钮-->
<template>
  <div class="outside" ref="outside" @mouseenter="buttonEnter" @mouseleave="buttonLeave" :style="{width:width,height: height,backgroundColor: backgroundColor}">
    <div class="inside" ref="inside" :style="{left: this.w/2-5+'px',top: this.h/2-5+'px'}"></div>
    <div :style="{width:'100%',height: '22px',position: 'absolute',textAlign: 'center',top: textTop,color:textColor}">
      <span>{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vbutton",
  //可通过组件传值改变的属性
  props:{
    //按钮宽度
    width: {
      default: '100px'
    },
    //按钮高度
    height:{
      default:'50px'
    },
    //鼠标悬停时按钮变化的颜色
    afterColor:{
      type:String,
      default: '#F7A997'
    },
    //按钮背景色
    backgroundColor:{
      default:'rgb(137, 157, 192)'
    },
    //按钮内文本
    value:{
      type:String,
      default:'click'
    },
    //文本高度
    textTop:{
      type:String,
      default:'25%'
    },
    //文本颜色
    textColor:{
      default:'black'
    }
  },
  data(){
    return{
      w:parseInt(this.width.replace('px','')),
      h:parseInt(this.height.replace('px','')),
    }
  },
  methods:{
    //鼠标进入时按钮的变化
    buttonEnter(){
      this.$refs.inside.style.backgroundColor = this.afterColor
      this.$refs.inside.style.width = this.w+20+'px'
      this.$refs.inside.style.height = (this.w+20)+'px'
      this.$refs.inside.style.position = 'relative'
      this.$refs.inside.style.top = -(this.w-this.h)/2+'px'
      this.$refs.inside.style.left = 0+'px'
      this.$refs.inside.style.borderRadius = this.w/2+'px'
    },
    //鼠标离开时恢复原样
    buttonLeave(){
      this.$refs.inside.style.backgroundColor = 'transparent'
      this.$refs.inside.style.width = '10px'
      this.$refs.inside.style.height= '10px'
      this.$refs.inside.style.position = 'relative'
      this.$refs.inside.style.top = this.h/2-5+'px'
      this.$refs.inside.style.left = this.w/2-5+'px'
      this.$refs.inside.style.borderRadius = '5px'
    },
  }
}
</script>

<style scoped>
.outside{
  text-align: center;
  margin: 100px auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 3px 3px 1px 1px #707070;
  cursor: pointer;
}
.inside{
  width: 10px;
  height: 10px;
  position: relative;
  border-radius: 5px;
  transition: 0.3s;
}
</style>
