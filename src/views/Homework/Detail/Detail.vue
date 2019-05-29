<template>
  <Layout>
    <div v-loading="loading">
      <el-table :data="clazz.taskStatusItemVOList" stripe>
        <el-table-column
          label="团队ID"
          prop="teamId"
          width="100">
        </el-table-column>
        <el-table-column
          label="团队名称"
          prop="teamName"
          width="100">
        </el-table-column>
        <el-table-column
          label="团队得分"
          prop="teamScore"
          width="100">
        </el-table-column>
        <el-table-column
          label="团队状态"
          prop="status"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="viewHomework(scope.row)" size="mini">评分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
  import Layout from '../../../components/Layout'
  import { taskStatus } from '../../../api/task'

  export default {
    data () {
      return {
        loading: false,
        clazz: {}
      }
    },
    components: {
      Layout
    },
    mounted () {
      this.reloadData()
    },
    methods: {
      reloadData () {
        const id = this.$route.params.id
        this.loading = true
        taskStatus(id).then(p => {
          this.clazz = p
          this.loading = false
        })
      }
    }
  }
</script>

<style>

</style>
