<template>
  <div class="addLeft">
    <div class="inp">
      <div class="stuId"><span>SID</span></div>
      <div class="name"><span>姓名</span></div>
      <div class="age"><span>年龄</span></div>
      <div class="gender"><span>性别</span></div>
      <div class="department"><span>院系</span></div>
      <div class="role"><span></span>宿舍职务</div>
      <div class="dormitoryNum"><span>宿舍号</span></div>
    </div>
<!--    data area-->
<!--    matching regular-->
    <div class="inp" v-for="(info,index) in stuInfos" :key="index">
<!--      SID-->
      <input type="text" class="inp-stuId" v-model="info.stuid" onkeyup="this.value=this.value.replace(/[^0-9]/,'')"></input>
<!--      name-->
      <input type="text" class="inp-name" v-model="info.name"></input>
<!--      age-->
      <input type="text" class="inp-age" v-model="info.age" onkeyup="this.value=this.value.replace(/[^0-9]/,'')"></input>
<!--      gender-->
      <div class="select-g">
        <input type="radio" v-model="info.gender" value="Boy">男
        <br>
        <input type="radio" v-model="info.gender" value="Boy">女
      </div>
<!--      faculty-->
      <div class="sel">
        <select v-model="info.department">
          <option v-for="(item,key) in items" :value="key">{{item.name}}</option>
        </select>
      </div>
<!--      role-->
      <div class="select-r">
        <input type="radio" v-model="info.role" value="Leader">寝室长
        <br>
        <input type="radio" v-model="info.role" value="Nothing">无&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
<!--     dormitoryNum -->
      <input type="text" class="inp-dNum" v-model="info.dormitoryNum" onkeyup="this.value=this.value.replace(/[^0-9]/,'')"></input>
    </div>
<!--    bottom-->
    <div class="leftBottom">
        <span>Tips:不需要填满所有数据，但必须填写完整行内所有数据</span>
        <button @click="submit" class="leftBottom-button">提交</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addLeft",
  data(){
    return{
      radio:'',
      mod:'',
      items:'',
      value:'',
      stuInfos:[
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
        {stuid:'', name:'', age:'', gender:'',department:'',role:'',dormitoryNum:''},
      ]
    }
  },
  methods:{
    submit(){
      //Determine whether each row of data contains null values before submit
      let allJudge = 0
      let newInfos = []
      for (let i = 0;i<=this.stuInfos.length-1;i++){
        let a = this.stuInfos[i].stuid.length<=0?0:1
        let b = this.stuInfos[i].name.length<=0?0:1
        let c = this.stuInfos[i].age.length<=0?0:1
        let d = this.stuInfos[i].gender.length<=0?0:1
        let e = this.stuInfos[i].department.length<=0?0:1
        let f = this.stuInfos[i].role.length<=0?0:1
        let g = this.stuInfos[i].dormitoryNum.length<=0?0:1
        let judge = a===b&&b===c&&c===d&&d===e&&e===f&&f===g
        let recentNum = a+b+c+d+e+f+g
        allJudge += recentNum
        //determine whether data had filled fully
        if (judge === false){
          this.$message({
            message: 'Please fill data fully',
            type: 'warning'
          });
          return
        }
        //save valid data to the new list
        if (recentNum!==0){
          newInfos.push(this.stuInfos[i])
        }
      }
      //judge whether all data is null
      if (allJudge === 0){
        this.$message.error('What are you want to submit？');
      }else{
        let url = "http://localhost:8090/addStudent"
        axios.post(url,newInfos).then(res=>{
          if (res.data.code===500){
            this.$message.error(res.data.msg);
          }else{
            this.$message({
              message: 'Upload Successfully！',
              type: 'success'
            });
          }
        }).catch(error=>{
          console.log(error)
          this.$message.error('Upload Failed！');
        })

      }
    },
    //get faculty list
    getDepartmentList(){
      let url = "http://localhost:8090/getDepartmentList"
      axios.get(url).then(res=>{
        this.items = res.data.result
        console.log(res.data.result)
      }).catch(error=>{
        console.log(error)
        this.$message.error('Get Faculty List Failed！');
      })
    },

  },
  //get faculty list when initialize page
  mounted(){
    this.getDepartmentList()
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/addleft.css";
</style>
