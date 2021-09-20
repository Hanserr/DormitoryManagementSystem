<template>
<div class="addStuMain">
  <div class="top">
    <router-link class="t-left" to="/AdminPage/addStu/addLeft">添加学生</router-link>
    <router-link class="t-right" to="/AdminPage/addStu/addRight">通过宿舍号添加学生</router-link>
  </div>
  <div class="bottom">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</div>
</template>

<script>
export default {
  name: "addStu",
  data(){
    return{
        input:'',

    }
  },
  methods:{

  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/addStu.css";
</style>
