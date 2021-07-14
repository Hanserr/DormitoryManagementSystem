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

        <el-submenu index="1">

          <template slot="title">
            <i class="el-icon-user"></i>
            <span>学生管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="1-1" route="/stuInfo">学生信息</el-menu-item>
            <el-menu-item index="1-2" route="/addStu">修改学生信息</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="2">

          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>宿舍管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="2-1">宿舍状态</el-menu-item>
            <el-menu-item index="2-2">修改宿舍</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="3">

          <template slot="title">
            <i class="el-icon-document-add"></i>
            <span>公告管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="3-1">当前公告</el-menu-item>
            <el-menu-item index="3-2">修改公告</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="4">

          <template slot="title">
            <i class="el-icon-first-aid-kit"></i>
            <span>卫生检查</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="4-1">卫生排名</el-menu-item>
            <el-menu-item index="4-2">卫生信息录入</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="5">

          <template slot="title">
            <i class="el-icon-suitcase"></i>
            <span>保修审批</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="5-1">待处理审批</el-menu-item>
            <el-menu-item index="5-2">已处理审批</el-menu-item>
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
  name: "leftNav",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
@import "../assets/css/home.css";
</style>
