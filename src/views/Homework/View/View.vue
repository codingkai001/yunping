<template>
  <Layout>
    <div v-loading="loading">
      <el-table :data="clazz.taskVOList" stripe>
        <el-table-column
          label="作业ID"
          prop="taskId"
          width="100">
        </el-table-column>
        <el-table-column
          label="作业名称"
          prop="taskName"
          width="100">
        </el-table-column>
        <el-table-column
          label="作业创建者"
          prop="taskCreatorName"
          width="100">
        </el-table-column>
        <el-table-column
          label="作业地址"
          prop="taskUrl"
          width="100">
        </el-table-column>
        <el-table-column
          label="作业创建时间"
          prop="taskCreateAt"
          width="100">
        </el-table-column>
        <el-table-column
          label="作业结束时间"
          prop="taskOverAt"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="viewHomework(scope.row)" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
  import Layout from '../../../components/Layout'
  import { taskSearch } from '../../../api/task'

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
        this.loading = true
        taskSearch().then(p => {
          this.clazz = p
          this.secondsToTime(this.clazz.taskVOList)
          this.loading = false
        })
      },
      secondsToTime (s) {
        for (var i = 0; i < s.length; i++) {
          var time_start = new Date(parseInt(s[i].taskCreateAt))
          var time_end = new Date(parseInt(s[i].taskOverAt))
          //开始时间
          var year_start = time_start.getFullYear()
          var month_start = time_start.getMonth() + 1
          var day_start = time_start.getDate()
          var hour_start = time_start.getHours()
          var minute_start = time_start.getMinutes()
          //结束时间
          var year_end = time_end.getFullYear()
          var month_end = time_end.getMonth() + 1
          var day_end = time_end.getDate()
          var hour_end = time_end.getHours()
          var minute_end = time_end.getMinutes()

          console.log(time_start)
          console.log(time_end)

          s[i].taskCreateAt = year_start.toString() + '年' + month_start.toString() + '月' + day_start.toString() + '日' + hour_start.toString() + ':' + minute_start.toString()
          s[i].taskOverAt = year_end.toString() + '年' + month_end.toString() + '月' + day_end.toString() + '日' + hour_end.toString() + ':' + minute_end.toString()

        }
      }
    }
  }
</script>

<style>

</style>
