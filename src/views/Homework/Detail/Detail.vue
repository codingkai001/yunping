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
            <el-button @click="showEvaluate=true" size="mini">评分</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Evaluate
        v-bind:show.sync="showEvaluate"
        v-on:done="evaluateDone"
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
        showEvaluate: false
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
      }
    }
  }
</script>

<style>

</style>
