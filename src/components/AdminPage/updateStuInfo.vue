<template>
<div class="udMain">
  <div class="udMain-content">
    <div class="inp1">
      姓名：<input v-model=stu.name></input>
    </div>
    <div class="inp1">
      职务：<input type="radio" value="1" v-model="stu.role">寝室长
      <input type="radio" value="0" v-model="stu.role">无
    </div>
    <div class="inp2">
      宿舍号：<input v-model=stu.dormitoryNum></input>
    </div>
    <div class="butt">
      <button @click="confirm">确认</button>
      <button @click="exit">取消</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "updateStuInfo",
  data(){
    return{
      stu:{
        name:this.name,
        role:this.role==='无'?'0':'1',
        dormitoryNum:this.dormitoryNum,
        stuid:this.stuid
      }
    }
  },
  methods:{
    //exit
    exit(){
      this.$emit('ex')
    },
    //upload data and update data in the list
    confirm(){
      let url1 = "http://localhost:8090/updateStu"
      axios.post(url1,this.stu).then(res=>{
        if (res.data.code === 200){
          res.data.t.role =  res.data.t.role===0?'无':'寝室长'
          this.$emit('msg',res.data.t)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  props:['name','role','dormitoryNum','stuid']
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/updateStuInfo.css";
</style>
