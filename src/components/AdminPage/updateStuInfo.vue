<template>
<div class="udMain">
  <div class="udMain-content">
    <div class="inp1">
      Name：<input v-model=stu.name></input>
    </div>
    <div class="inp1">
      &nbsp;&nbsp;Role：<input v-model="stu.role"></input>
    </div>
    <div class="inp2">
      D-Num：<input v-model=stu.dormitoryNum></input>
    </div>
    <div class="butt">
      <button @click="confirm">Confirm</button>
      <button @click="exit">Cancel</button>
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
        role:this.role,
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
            this.$emit('msg',res.data.t)
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
