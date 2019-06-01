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
    viewHomework (row) {
      this.$router.push('/homework/homeworkScore/' + row.taskId)
    },
    secondsToTime (s) {
      for (var i = 0; i < s.length; i++) {
        var timeStart = new Date(parseInt(s[i].taskCreateAt))
        var timeEnd = new Date(parseInt(s[i].taskOverAt))
        // 开始时间
        var yearStart = timeStart.getFullYear()
        var monthStart = timeStart.getMonth() + 1
        var dayStart = timeStart.getDate()
        var hourStart = timeStart.getHours()
        var minuteStart = timeStart.getMinutes()
        // 结束时间
        var yearEnd = timeEnd.getFullYear()
        var monthEnd = timeEnd.getMonth() + 1
        var dayEnd = timeEnd.getDate()
        var hourEnd = timeEnd.getHours()
        var minuteEnd = timeEnd.getMinutes()

        console.log(timeStart)
        console.log(timeEnd)

        s[i].taskCreateAt = yearStart.toString() + '年' + monthStart.toString() + '月' + dayStart.toString() + '日' + hourStart.toString() + ':' + minuteStart.toString()
        s[i].taskOverAt = yearEnd.toString() + '年' + monthEnd.toString() + '月' + dayEnd.toString() + '日' + hourEnd.toString() + ':' + minuteEnd.toString()
      }
    }
  }
}
</script>

<style>

</style>
