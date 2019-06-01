<template>
  <Layout>
    <div v-loading="loading">
      <el-button type='primary' @click="$router.push({ path: '/homework/add' })">新建作业</el-button>
      <el-table :data="taskList" stripe v-if="taskList.length!==0">
        <el-table-column
          label="作业ID"
          prop="taskId"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          label="作业名"
          prop="taskName"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="作业创建者"
          prop="taskCreatorName"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="发布班级"
          prop="taskClassName"
          width="130"
          align="center">
        </el-table-column>
        <el-table-column
          label="作业地址"
          prop="taskUrl"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <a :href="scope.row.taskUrl"
               target="_blank">{{scope.row.taskUrl}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="250">
          <template slot-scope="scope">
            <el-button @click="viewHomework(scope.row)" size="mini">查看详情</el-button>
            <el-button size="mini" @click="editHomework(scope.row)">编辑</el-button>
            <el-button @click="deleteHomework(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--学生-->
<!--      <el-table :data="homeworkList" stripe v-if="homeworkList.length!==0">-->
<!--        <el-table-column-->
<!--          label="ID"-->
<!--          prop="taskId">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="作业名"-->
<!--          prop="taskName">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="作业创建者"-->
<!--          prop="taskCreatorName">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="作业地址"-->
<!--          prop="taskUrl">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button @click="editHomework(scope.row)" size="mini">编辑</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </div>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { taskSearch, taskList, taskDelete } from '../../../api/task'
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
      if (this.userRole === '1') {
        // alert(1)
        taskList().then(p => {
          this.taskList = p.taskVOList
          this.loading = false
        }).catch(e => {
          this.loading = false
          this.$message.error('数据加载异常')
        })
      } else {
        taskSearch().then(p => {
          this.homeworkList = p.taskVOList
          this.loading = false
        }).catch(e => {
          this.loading = false
          this.$message.error('数据加载异常')
        })
      }
    },
    editHomework (row) {
      this.$router.push({ path: `/homework/edit/${row.taskId}` })
    },
    getUserRole () {
      this.userRole = document.cookie.split('=')[1]
      // alert(this.userRole)
    },
    deleteHomework (row) {
      taskDelete(row.taskId).then(p => {
        // console.log(p)
        this.$message.success('删除成功')
        this.reloadList()
        this.loading = false
      })
    },
    viewHomework (row) {
      this.$router.push({ path: '/homework/detail/' + row.taskId })
    }
  }
}
</script>

<style>

</style>
