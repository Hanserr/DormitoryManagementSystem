<template>
<div class="udMain">
  <div class="content">
    <div class="inp1">
      姓名：<input v-model=name></input>
    </div>
    <div class="inp1">
      职务：<input v-model="role"></input>
    </div>
    <div class="inp2">
      宿舍号：<input v-model=address></input>
    </div>
    <div class="butt">
      <button @click="confirm">确认</button>
      <button @click="exit">取消</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "updateStuInfo",
  methods:{
    //退出
    exit(){
      this.$emit('msg',false)
    },
    //确认
    confirm(){
      // this.axios.put()
      this.$emit('msg',false)
      this.$emit('reload')
    }
  },
  props:['name','role','address']
}
</script>

<style scoped>
@import "../assets/css/updateStuInfo.css";
</style>
