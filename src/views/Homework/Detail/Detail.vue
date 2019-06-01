<template>
  <Layout>
    <div v-loading="loading">
      <el-table :data="clazz.taskStatusItemVOList" stripe>
        <el-table-column
          label="团队ID"
          prop="teamId"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="团队名称"
          prop="teamName"
          min-width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="团队得分"
          prop="teamScore"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="团队状态"
          prop="status"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="evaluateHomework(scope.row)" size="mini">评分</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Evaluate
        :clazz="information"
        v-bind:show.sync="showEvaluate"
        v-on:done="evaluateDone"
        v-if="showEvaluate"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { taskStatus } from '../../../api/task'
import Evaluate from './Evaluate'

export default {
  data () {
    return {
      loading: false,
      clazz: {},
      showEvaluate: false,
      information: {
        taskId: 0,
        teamId: 0
      }
    }
  },
  components: {
    Layout,
    Evaluate
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
    },
    evaluateDone () {
      this.showEvaluate = false
      this.reloadData()
    },
    evaluateHomework (row) {
      this.showEvaluate = true
      this.information.teamId = row.teamId
    }
  }
}
</script>

<style>

</style>
