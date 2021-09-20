//自定义全局拖拽指令
import Vue from "vue";

const drag = Vue.directive('drag',{
  inserted:function (el){
    let player = el
    let timer = null
    player.onmousedown = (e) =>{
      //鼠标相对元素的位置
      let mouseAndBoxLeftDis = e.clientX - player.parentNode.offsetLeft
      let mouseAndBoxTopDis = e.clientY - player.parentNode.offsetTop
      //鼠标移动事件
      document.onmousemove = (e) =>{
        //元素位置
        let left = e.clientX - mouseAndBoxLeftDis
        let top = e.clientY - mouseAndBoxTopDis

        //最上层父元素的宽度 - 播放器宽度 得到播放器可移动的宽度限制。高度同理
        let ResWidth = player.parentNode.parentNode.offsetWidth - player.parentNode.offsetWidth;
        let ResHeight = player.parentNode.parentNode.offsetHeight - player.parentNode.offsetHeight;

        //根据播放器移动的距离做出相应处理
        //当距离最外层父元素的边距超过阈值时会触发定时器，2秒后元素隐藏到窗口外
        if (left <= 0){
          clearTimeout(timer)
          player.parentNode.style.left = 0+'px'
          timer = setTimeout(() => {
          player.parentNode.style.transition = 'all linear 0.2s'
          player.parentNode.style.left = -260+'px'
          },2000)
        }else if (left >= ResWidth){
          clearTimeout(timer)
          player.parentNode.style.left = ResWidth+'px'
          timer = setTimeout(() => {
          player.parentNode.style.transition = 'all linear 0.2s'
          player.parentNode.style.left = window.innerWidth - 60+'px'
          },2000)
        }else{
          clearTimeout(timer)
          player.parentNode.style.transition = '0s'
          player.parentNode.style.left = left+'px'
        }

        if (top <= 0){
          player.parentNode.style.top = 0+'px'
        }else if (top >= ResHeight){
          player.parentNode.style.top = ResHeight+'px'
        }else{
          player.parentNode.style.top = top+'px'
        }
      };

      //鼠标松开时清除mousemove和mouseup事件
      //元素左边距大于0时清除定时器
      document.onmouseup = () => {
        // if (player.parentNode.offsetLeft>0){
        //   clearTimeout(timer)
        // }
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
    //鼠标点击播放器会清除前一个定时器，并重新设置一个新的，定时2秒
    player.onclick = (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (player.parentNode.offsetLeft <= 0){
          player.parentNode.style.left = -260+'px'
        }
      },2000)
    }
  }
})

export {drag}
