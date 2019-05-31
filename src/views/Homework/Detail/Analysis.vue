<template>
  <layout>
    <div v-loading="loading">
      <div>
        <h2>单次作业分析</h2>
      </div>
      <div style="margin-top: 1em">
        <div id="total-score-change-chart" style="width: 1500px;height: 500px;margin: 0 auto;"></div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { analysisSkillSum } from '../../../api/analysis'

export default {
  data () {
    return {
      loading: false,
      taskId: 0,
      skillSumItemVOList: []
    }
  },
  components: { Layout },
  mounted () {
    this.getTaskId()
    this.initOptionData()
  },
  methods: {
    getTaskId () {
      const href = location.href.split('/')
      this.taskId = parseInt(href[href.length - 1])
    },
    initOptionData () {
      this.loading = true
      analysisSkillSum(this.taskId).then(p => {
        this.loading = false
        this.skillSumItemVOList = p.skillSumItemVOList
        this.drawChart()
        console.log(this.skillSumItemVOList)
      }).catch(e => {
        this.loading = false
        this.$message.error('数据加载异常')
      })
    },
    drawChart () {
      const chart = this.$echarts.init(document.getElementById('total-score-change-chart'))
      const option = {}
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
