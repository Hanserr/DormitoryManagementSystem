<template>
  <div class="SOTDormitory">

    <div class="SOTDormitory-top">

      <div class="SOTDormitory-top-inp">
        <el-input
          placeholder="再次输入宿舍号"
          prefix-icon="el-icon-search"
          v-model="input2"
          @keyup.enter.native="searchByDNum(input2)">
        </el-input>
      </div>

    </div>

    <div class="SOTDormitory-bottom">

      <div class="SOTDormitory-bottom-left">
        <ul class="SOTDormitory-bottom-left-son" v-infinite-scroll="add">
          <li v-for="i in count" class="infinite-list-item" @click="searchByDNum(i)">{{i}}</li>
        </ul>
      </div>
      <div class="SOTDormitory-bottom-right"
           v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="SOTDormitory-bottom-right-son">

          <div class="SOTDormitory-bottom-table">

            <div class="SOTDormitory-bottom-a">
              宿舍号：{{detail.length === 0?'---':detail[0].id}}
            </div>

            <div class="SOTDormitory-bottom-a">
              余额
            </div>

            <div class="SOTDormitory-bottom-a">
              本月已用金额
            </div>

            <div class="SOTDormitory-bottom-a">
              是否已停用
            </div>

            <div class="SOTDormitory-bottom-a">
                操作
            </div>

            <div class="SOTDormitory-bottom-a">
              水费
            </div>

            <div class="SOTDormitory-bottom-a">
              {{detail.length === 0?'---':detail[0].waterbalance}}
            </div>

            <div class="SOTDormitory-bottom-a">
              {{detail.length === 0?'---':detail[0].waterbalance}}
            </div>

            <div class="SOTDormitory-bottom-a">
              是
            </div>

            <div class="SOTDormitory-bottom-a">
              operation
            </div>

            <div class="SOTDormitory-bottom-a">
              电费
            </div>
          <!--balance-->
            <div class="SOTDormitory-bottom-a">
              {{detail.length === 0?'---':detail[0].powerbalance}}
            </div>
          <!--used-->
            <div class="SOTDormitory-bottom-a">
              {{detail.length === 0?'---':detail[0].powerbalance}}
            </div>

            <div class="SOTDormitory-bottom-a">
              是
            </div>

            <div class="SOTDormitory-bottom-a">
              operation
            </div>

            <div class="SOTDormitory-bottom-a">
              流量
            </div>

            <!--balance-->
            <div class="SOTDormitory-bottom-a">
              {{detail.length === 0?'---':detail[0].powerbalance}}
            </div>
            <!--used-->
            <div class="SOTDormitory-bottom-a">
              {{detail.length === 0?'---':detail[0].powerbalance}}
            </div>

            <div class="SOTDormitory-bottom-a">
              是
            </div>

            <div class="SOTDormitory-bottom-a">
              operation
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SOTDormitory",
  data() {
    return{
      input2:'',
      count:[],
      initialNumber:0,
      detail:[],
      loading:false,

    };
  },
  methods:{
    //when the scroll bar slides to the bottom will use lazy loading load data to insert data to the list.Increase data number simultaneously
    add(){
      this.loading = true
      let url = "/getDorListByLimit"
      axios.get(url,{params:{initialNumber:this.initialNumber}}).then(res=>{
        if (res.data.code === 200){
          for (let i = 0;i<res.data.result.length;i++){
            this.count.push(res.data.result[i])
          }
          this.initialNumber+=res.data.result.length
          this.loading = false
        }else{
          this.$message.error("加载时出现了一些问题...")
          this.loading = false
        }
      }).catch(()=>{
        this.$message.error("加载时出现了一些问题...")
        this.loading = false
      })
    },
    //search detail dormitory data by DNum
    searchByDNum(num){
      this.loading = true
      let url = '/getDormitoryDetail'
      axios.get(url,{params:{id:num}}).then(res=>{
        if (res.data.code === 200){
          this.detail = res.data.result
          this.loading = false
        }else{
          this.$message.error("获取详细信息失败")
          this.loading = false
        }
      })
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/SOTDormitory.css";
</style>
