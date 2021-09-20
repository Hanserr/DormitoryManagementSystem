<!--student information component-->
<template>
<div class="main">
  <!-- the alteration pop-up window-->
  <update-stu-info @msg="confirmAndClose" @ex="cancelAndClose" v-if=visible :name=this.sonName :role=this.sonRole :dormitoryNum=this.sonDormitoryNum :stuid="this.sonStuid"></update-stu-info>
<!--search-->
  <div class="search">
    <el-input
      placeholder="输入关键词"
      v-model="input"
      clearable
      @keyup.enter.native="query">
    </el-input>
    <div class="el-icon-search" @click="query"></div>
  </div>
<!--form -->
  <div class="form">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="80vh"
      v-loading="loading"
      element-loading-text="loading......"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">

      <el-table-column
        prop="stuid"
        label="SID"
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
        width="180"
        sortable>
      </el-table-column>

      <el-table-column
        prop="gender"
        label="性别"
        width="180"
        :filters="[{text: 'Boy', value: 'Boy'},{text: 'Girl', value: 'Girl'}]"
        :filter-method="filterHandler">
      </el-table-column>

      <el-table-column
        prop="departmentName"
        label="院系"
        width="180"
        :filters="departmentListJson"
        :filter-method="filterHandler">
      </el-table-column>

      <el-table-column
        prop="role"
        label="宿舍职务"
        width="180"
        :filters="[{text: 'leader', value: 'leader'},{text: 'Nothing', value: 'Nothing'}]"
        :filter-method="filterHandler">
      </el-table-column>

      <el-table-column
        prop="dormitoryNum"
        label="宿舍号"
        :filters="dormitoryListJson"
        :filter-method="filterHandler">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="manage(scope.row)" type="text" size="small">&nbsp;&ensp;Manage</el-button>
          <el-button @click="del(scope.row.stuid)" type="text" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import axios from "axios";
import updateStuInfo from "./updateStuInfo";
export default {
  components: {updateStuInfo},
  name: "stuInfo",
  data() {
    return {
      tableData: [],
      input:'',
      loading:false,
      visible:false,
      sonName:'',
      sonRole:'',
      sonDormitoryNum:'',
      sonStuid:'',
      departmentName:'',
      departmentListJson:[],
      dormitoryListJson:[],
    }
  },
  methods: {
    // manage
    manage(data){
      this.visible = true
      this.sonName = data.name
      this.sonRole = data.role
      this.sonDormitoryNum = data.dormitoryNum
      this.sonStuid = data.stuid
    },
    // delete
    del(id){
      this.$confirm('Are you sure to delete this data?The operation is not reversible！', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        let url = 'http://localhost:8090/delete'
        axios.post(url,id).then((res)=>{
          if (res.data.code === 200){
            //traverse list and delete a row data that had deleted in the database
            for (let i = 0;i<this.tableData.length;i++){
              if(id === this.tableData[i].stuid){
                this.$delete(this.tableData,i)
              }
            }
            this.$message({
              type: 'success',
              message: 'Deleted Successfully!!'
            });
          }else{
            this.$message({
              type: 'error',
              message: 'Delete Failed'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Canceled'
        });
      });

    },
    //submit and close pop-up window
    confirmAndClose(data) {
      if (data !== null){
        for (let i = 0;i<this.tableData.length;i++){
          if (this.tableData[i].stuid === data.stuid){
            this.tableData[i] = data
          }
        }
      }
      this.visible = false
    },
    //close pop-up window
    cancelAndClose(){
      this.visible = false
    },
    //search
    query(){
      let url = 'http://localhost:8090/queryByCondition'
      if(this.input !== '') {
        this.loading = true
        axios.post(url, this.input).then(res => {
          this.loading = false
          if (res.data.result.length<=0){
            this.$message({
              message: "No data was queried",
              center: true,
            });
          }
          this.tableData = res.data.result
          this.departmentListJson = res.data.departmentList
          this.dormitoryListJson = res.data.dormitoryList
          //parse string to number
          for (let i = 0;i<this.dormitoryListJson.length;i++){
            let common = parseInt(this.dormitoryListJson[i].value)
            this.dormitoryListJson[i].value = common
          }
        }).catch(error=>{
          this.loading = false
          console.log(error)
          this.$message({
            message: 'Query Failed',
            center: true,
          });
        })
      }else {
        this.$message({
          showClose: true,
          message: 'What do you want to search？',
          type: 'warning',
        });
      }
    },
    //filter
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
}
</script>

<style scoped>
@import "../../assets/css/AdminPage/stuInfo.css";
</style>
