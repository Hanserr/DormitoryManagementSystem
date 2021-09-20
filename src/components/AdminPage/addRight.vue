<template>
  <div class="addRight">
<!-- pop-up -->
    <add-right-window @msg="exit" @ex="close" v-if="visible" :dormitory-num="this.input2"></add-right-window>
<!--search area-->
    <div class="addRight-top">
      <el-input
        placeholder="宿舍号"
        prefix-icon="el-icon-search"
        v-model="input2"
        @keyup.enter.native="change(input2)">
      </el-input>
    </div>

    <div class="addRight-bottom" :style="{width:rWidth+'px',height:rHeight+'px'}">
<!--occupied-->
      <div class="addRight-content" v-for="info in stuInfo">
        <div class="addRight-son-content">
          <span>&nbsp;&nbsp;&nbsp;姓名：{{info.name}}</span>
          <br>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SID：{{info.stuid}}</span>
          <br>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年龄：{{info.age}}</span>
          <br>
          <span>院系：{{info.departmentName}}</span>
        </div>
        <div class="addRight-son-button">
          <button @click="del(info.stuid)">Delete</button>
        </div>
      </div>
<!--spare-->
      <div class="addRight-remainContent" v-for="remainInfo in (sum-stuInfo.length)">
        <i class="el-icon-plus" @click="openWindow">
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import addRightWindow from "./addRightWindow";
export default {
  components:{addRightWindow},
  name: "addRight",
  data(){
    return{
      input2:'',
      sum:0,
      stuInfo:[],
      rWidth:760,
      rHeight:430,
      visible:false,
    }
  },
  methods:{
    //enter to submit
    change(num){
      if (num === null){return}
      let url = 'http://localhost:8090/queryCapacity'
      axios.post(url,num).then(res=>{
        if (res.data.code===500){
          this.$message.error(res.data.msg);
        }else{
          this.sum = res.data.num
          this.stuInfo = res.data.result
          //alter border width and height based on the returned dormitory capacity
          if (this.sum === 6){
            this.rWidth = 760
            this.rHeight = 430
          }else if (this.sum === 4){
            this.rWidth = 1010
            this.rHeight = 220
          }
        }
      }).catch(error=>{
        console.log(error)
        this.$message.error("Query Failed");
      })
    },
    //open pop-up window
    openWindow(){
      this.visible = true

    },
    //confirm and close pop-up window
    exit(data){
      if (data!==null){
        this.stuInfo.push(data)
      }
      this.visible = false
    },
    //cancel and close pop-up window
    close(){
      this.visible = false
    },
    //delete data
    del(id){
      if (window.confirm("Are you sure to delete this data?")){
        let url = "http://localhost:8090/delete"
        axios.post(url,id).then(res=>{
          if (res.data.code === 500){
            this.$message.error("Delete Failed")
          }
        }).catch(()=>{
          this.$message.error("Delete Failed")
        })
      }
    }
  },
  //The data will refresh no matter which page from to ensure data consistency
  beforeRouteEnter(to,from,next){
    next((vm) => {
      if (from.name === '*'){
          vm.change(this.input2)
      }
    })
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/addright.css";
</style>
