<template>
  <Layout>
    <div v-loading="loading">
      <el-button type='primary' @click="$router.push({ path: '/homework/edit/0' })">新建作业</el-button>
      <el-table :data="taskList" stripe>
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
import { taskSearch } from '../../../api/task'
// import { dimensionSearch } from '../../../api/dimension'

export default {
  data () {
    return {
      loading: false,
      homeworkList: [],
      taskList: []
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.reloadList()
  },
  methods: {
    reloadList () {
      /*
      this.loading = true
      dimensionSearch({}).then(p => {
        this.dimensionList = p.skillVOList
        this.loading = false
      })
      */
      this.loading = true
      taskSearch().then(p => {
        this.taskList = p.taskVOList
        this.loading = false
      }).catch(e=>{
        this.loading = false
        this.$message.error("数据加载异常")
      })
    },
    editHomework (row) {
      this.$router.push({ path: `/homework/edit/${row.id}` })
    }
  }
}
</script>

<style>

</style>
