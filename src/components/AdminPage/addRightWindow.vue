<template>
<div class="addRightWindow">
<!--  SID-->
  <div class="addRightWindow-stuid">
    <input placeholder="SID" v-model="ARWInfo.stuid"></input>
  </div>
<!--  name-->
  <div class="addRightWindow-name">
    <input placeholder="姓名" v-model="ARWInfo.name"></input>
  </div>
<!--  age-->
  <div class="addRightWindow-age">
    <input placeholder="年龄" v-model="ARWInfo.age"></input>
  </div>
<!--  gender-->
  <div class="addRightWindow-gender">
    <span>性别:</span>
    <input type="radio" v-model="ARWInfo.gender" value="1">男
    <input type="radio" v-model="ARWInfo.gender" value="0">女
  </div>
<!--  faculty-->
  <div class="addRightWindow-department">
    <span>院系:</span>
    <select v-model="ARWInfo.department">
      <option v-for="(item,key) in departmentList" :value="key">{{item.name}}</option>
    </select>
  </div>
<!--  role-->
  <div class="addRightWindow-role">
    <span>职务:</span>
    <input type="radio" v-model="ARWInfo.role" value="1">寝室长
    <input type="radio" v-model="ARWInfo.role" value="0">无
  </div>
<!--  submit-->
  <div class="addRightWindow-submit">
    <button @click="submit(ARWInfo)">提交</button>
    <button @click="close">取消</button>
  </div>
</div>

</template>

<script>
import axios from "axios";

export default {
  name: "addRightWindow",
  data(){
    return{
      ARWInfo:{
        stuid:'',
        name:'',
        age:'',
        gender:'',
        department:'',
        role:'',
        dormitoryNum:this.dormitoryNum,
      },
      departmentList:'',
    }
  },
  methods:{
    //submit
    submit(data){
      let a = data.stuid===''?'0':'1'
      let b = data.name===''?'0':'1'
      let c = data.age===''?'0':'1'
      let d = data.gender===''?'0':'1'
      let e = data.department===''?'0':'1'
      let f = data.role===''?'0':'1'
      let i = a+b+c+d+e+f
      if (i < 6){
        this.$message.error("请填写完整")
        return
      }
      let url = 'http://localhost:8090/insert'
      axios.post(url,data).then(res=>{
        if (res.data.code === 500){
          this.$message.error("添加数据失败!")
        }else{
          console.log(res.data)
          this.$emit('msg',res.data.t)
        }
      }).catch(error=>{
        console.log(error)
        this.$message.error("添加数据失败!")
      })
    },
    // get faculty list when initialized page
    init(){
      let url = 'http://localhost:8090/getDepartmentList'
      axios.get(url).then(res=>{
        if (res.data.code === 500){
          this.$message.error("获取宿舍列表失败")
        }else{
          this.departmentList = res.data.result
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    //cancel
    close(){
      this.$emit('ex')
    }
  },
  props:['dormitoryNum'],
  mounted(){
    this.init()
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/addRightWindow.css";
</style>
