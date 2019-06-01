<template>
  <layout>
    <div v-loading="loading">
    <span>该次作业平均分：{{this.averageScore}}</span>
      <br />
      <span>你的排名：{{this.rank}}</span>
      <br />
      <span>你的总分：{{this.totalScore}}</span>
    </div>
  </layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { analysisTaskSum } from '../../../api/analysis'
export default {
  name: 'HomeworkScore',
  data () {
    return {
      loading: false,
      taskId: 0,
      averageScore: 0,
      totalScore: 0,
      rank: 0
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.getTaskId()
    this.viewScore()
  },
  methods: {
    getTaskId () {
      const href = location.href.split('/')
      this.taskId = parseInt(href[href.length - 1])
    },
    viewScore () {
      this.loading = true
      analysisTaskSum(this.taskId).then(p => {
        this.averageScore = parseInt(p.averageScore)
        this.rank = p.rank
        this.totalScore = parseInt(p.totalScore)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
