<!--学生信息模块-->
<template>
<div class="main">
<!--搜索模块-->
  <div class="search">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable>
    </el-input>
    <el-button icon="el-icon-search" circle @click="query"></el-button>
  </div>
<!--表单模块 -->
  <div class="form">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="80vh">

      <el-table-column
        prop="num"
        label="学号"
        width="180">
      </el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>

      <el-table-column
        prop="gender"
        label="性别"
        width="180">
      </el-table-column>

      <el-table-column
        prop="department"
        label="院系"
        width="180">
      </el-table-column>

      <el-table-column
        prop="role"
        label="职务"
        width="180">
      </el-table-column>

      <el-table-column
        prop="address"
        label="宿舍号">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="manage(scope.row.num)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row.num)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "stuInfo",
  data() {
    return {
      tableData: [],
      input:'',

    }
  },
  methods: {
    // 编辑
    manage(num){
      console.log(num)

    },
    // 删除
    del(num){
      console.log(num)

    },
    //
      query(){
      let url = 'http://localhost:8090/queryByCondition'
      axios.post(url,this.input).then((res)=>{
        console.log(res.data)
      })
    }
  },
}
</script>

<style scoped>
@import "../assets/css/stuInfo.css";
</style>
