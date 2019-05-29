<template>
  <Layout>
    <div v-loading="loading">
      <el-button type='primary' @click="$router.push({ path: '/homework/edit/0' })">新建作业</el-button>
      <!--老师-->
      <el-table v-if="taskList.length!==0" :data="taskList" stripe>
        <el-table-column
          label="ID"
          prop="taskId"
          width="180">
        </el-table-column>
        <el-table-column
          label="作业名"
          prop="taskName">
        </el-table-column>
        <el-table-column
          label="作业创建者"
          prop="taskCreatorName">
        </el-table-column>
        <el-table-column
          label="作业地址"
          prop="taskUrl">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editHomework(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--学生-->
      <el-table v-if="homeworkList.length!==0" :data="taskList" stripe>
        <el-table-column
          label="ID"
          prop="taskId"
          width="180">
        </el-table-column>
        <el-table-column
          label="作业名"
          prop="taskName">
        </el-table-column>
        <el-table-column
          label="作业创建者"
          prop="taskCreatorName">
        </el-table-column>
        <el-table-column
          label="作业地址"
          prop="taskUrl">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editHomework(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { taskSearch, taskList } from '../../../api/task'
// import { dimensionSearch } from '../../../api/dimension'

export default {
  data () {
    return {
      loading: false,
      homeworkList: [],
      taskList: [],
      userRole: ''
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.getUserRole()
    this.reloadList()
  },
  methods: {
    reloadList () {
      // alert(this.userRole)
      // this.loading = true
      if (this.userRole === '1'){
        // alert(1)
        taskList().then(p=>{
          this.taskList = p.taskVOList
          this.loading = false
        }).catch(e=>{
          this.loading = false
          this.$message.error("数据加载异常")
        })
      } else {
        taskSearch().then(p => {
          this.homeworkList = p.taskVOList
          this.loading = false
        }).catch(e=>{
          this.loading = false
          this.$message.error("数据加载异常")
        })
      }
    },
    editHomework (row) {
      this.$router.push({ path: `/homework/edit/${row.id}` })
    },
    getUserRole(){
      this.userRole = document.cookie.split('=')[1]
      // alert(this.userRole)
    }
  }
}
</script>

<style>

</style>
