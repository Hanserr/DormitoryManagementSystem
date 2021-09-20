<template>
<div class="addRightWindow">
<!--  SID-->
  <div class="addRightWindow-stuid">
    <input placeholder="SID" v-model="ARWInfo.stuid"></input>
  </div>
<!--  name-->
  <div class="addRightWindow-name">
    <input placeholder="Name" v-model="ARWInfo.name"></input>
  </div>
<!--  age-->
  <div class="addRightWindow-age">
    <input placeholder="Age" v-model="ARWInfo.age"></input>
  </div>
<!--  gender-->
  <div class="addRightWindow-gender">
    <span>Gender:</span>
    <input type="radio" v-model="ARWInfo.gender" value="Boy">Boy
    <input type="radio" v-model="ARWInfo.gender" value="Girl">Girl
  </div>
<!--  faculty-->
  <div class="addRightWindow-department">
    <span>Faculty:</span>
    <select v-model="ARWInfo.department">
      <option v-for="(item,key) in departmentList" :value="key">{{item.name}}</option>
    </select>
  </div>
<!--  role-->
  <div class="addRightWindow-role">
    <span>Role:</span>
    <input type="radio" v-model="ARWInfo.role" value="Dormitory leader">leader
    <input type="radio" v-model="ARWInfo.role" value="Nothing">Nothing
  </div>
<!--  submit-->
  <div class="addRightWindow-submit">
    <button @click="submit(ARWInfo)">Submit</button>
    <button @click="close">Cancel</button>
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
      let a = data.stuid===''?0:1
      let b = data.name===''?0:1
      let c = data.age===''?0:1
      let d = data.gender===''?0:1
      let e = data.department===''?0:1
      let f = data.role===''?0:1
      let judge = a+b+c+d+e+f
      if (judge !== 6){
        this.$message.error("Please fill data fully")
        return
      }
      let url = 'http://localhost:8090/insert'
      axios.post(url,data).then(res=>{
        if (res.data.code === 500){
          this.$message.error("Add data failed!")
        }else{
          console.log(res.data)
          this.$emit('msg',res.data.t)
        }
      }).catch(error=>{
        console.log(error)
        this.$message.error("Add data failed!")
      })
    },
    // get faculty list when initialized page
    init(){
      let url = 'http://localhost:8090/getDepartmentList'
      axios.get(url).then(res=>{
        if (res.data.code === 500){
          this.$message.error("Get faculty list failed")
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
