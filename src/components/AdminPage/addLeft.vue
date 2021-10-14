<template>
  <div class="addLeft">
    <div class="title">
      <div class="stuId" style="margin-left: 100px"><span>SID</span></div>
      <div class="name" style="margin-left: 40px"><span>姓名</span></div>
      <div class="age" style="margin-left: 40px"><span>年龄</span></div>
      <div class="gender" style="margin-left: 25px"><span>性别</span></div>
      <div class="department" style="margin-left: 90px"><span>院系</span></div>
      <div class="role" style="margin-left: 80px"><span></span>宿舍职务</div>
      <div class="dormitoryNum" style="margin-left: 50px"><span>宿舍号</span></div>
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
        <input type="radio" v-model="info.gender" value="1">男
        <br>
        <input type="radio" v-model="info.gender" value="0">女
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
        <input type="radio" v-model="info.role" value="Nothing">无&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            message: '请填满行内数据',
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
        this.$message.error('你这是想提交什么？');
      }else{
        let url = "http://localhost:8090/addStudent"
        axios.post(url,newInfos).then(res=>{
          if (res.data.code===500){
            this.$message.error(res.data.msg);
          }else{
            this.$message({
              message: '上传成功！',
              type: 'success'
            });
          }
        }).catch(()=>{
          this.$message.error('上传失败！');
        })

      }
    },
    //get faculty list
    getDepartmentList(){
      let url = "http://localhost:8090/getDepartmentList"
      axios.get(url).then(res=>{
        this.items = res.data.data
      }).catch(()=>{
        this.$message.error('获取宿舍列表失败！');
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
