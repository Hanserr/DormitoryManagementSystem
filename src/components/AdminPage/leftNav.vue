<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#b5c7c9"
        text-color="#fff"
        active-text-color="#606266"
         router>

        <el-submenu index="1" :disabled="isDisabled">

          <template slot="title">
            <i class="el-icon-user"></i>
            <span>学生管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="1-1" route="/AdminPage/stuInfo">学生信息</el-menu-item>
            <el-menu-item index="1-2" route="/AdminPage/addStu/addLeft">添加学生</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="2" :disabled="isDisabled">

          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>宿舍管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="2-1" route="/AdminPage/SOTDormitory">宿舍状态</el-menu-item>
            <el-menu-item index="2-2">更改信息</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="3" :disabled="isDisabled">

          <template slot="title">
            <i class="el-icon-document-add"></i>
            <span>通知管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="3-1">当前通知</el-menu-item>
            <el-menu-item index="3-2">更改通知</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="4" :disabled="isDisabled">

          <template slot="title">
            <i class="el-icon-first-aid-kit"></i>
            <span>卫生信息</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="4-1">排名</el-menu-item>
            <el-menu-item index="4-2">添加</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="5" :disabled="isDisabled">

          <template slot="title">
            <i class="el-icon-suitcase"></i>
            <span>物品报修</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="5-1">已处理</el-menu-item>
            <el-menu-item index="5-2">待处理</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-menu-item index="6">
          <i class="el-icon-s-custom"></i>
          <span slot="title">管理员</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return{
      isDisabled:true,
    }
  },
  name: "leftNav",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    judgeHaveAdmin(){
      this.isDisabled = false
    }
  },
  mounted() {
    this.judgeHaveAdmin()
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/home.css";
</style>
