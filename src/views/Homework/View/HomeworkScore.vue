<template>
  <layout>
    <div v-loading="loading">
    <span>该次作业平均分：{{this.averageScore}}</span>
      <br />
      <span>你的排名：{{this.rank}}</span>
      <br />
      <span>你的总分：{{this.totalScore}}</span>
      <div style="margin-top: 1em">
        <div id="analysis-skill-sum" style="width: 80%;height: 600px;margin: 0 auto;"></div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { analysisTaskSum, analysisSkillSum } from '../../../api/analysis'
export default {
  name: 'HomeworkScore',
  data () {
    return {
      loading: false,
      taskId: 0,
      averageScore: 0,
      totalScore: 0,
      rank: 0,
      skillList: [],
      averageScoreList: [],
      scoreList: [],
      indicator: []
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.getTaskId()
    this.viewScore()
    this.initData()
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
    },
    initData () {
      this.loading = true
      analysisSkillSum(this.taskId).then(p => {
        this.loading = false
        this.skillSumItemVOList = p.skillSumItemVOList
        for (var i = 0; i < this.skillSumItemVOList.length; i++) {
          this.skillList.push(this.skillSumItemVOList[i].skillName)
          this.averageScoreList.push(parseInt(this.skillSumItemVOList[i].averageScore))
          this.scoreList.push(parseInt(this.skillSumItemVOList[i].score))
        }
        for (var j = 0; j < this.skillList.length; j++) {
          this.indicator.push({ text: this.skillList[j], min: 0, max: 10 })
        }
        this.drawRadarChart()
      }).catch(e => {
        this.loading = false
        console.log(e)
        this.$message.error('加载错误')
      })
    },
    drawRadarChart () {
      const chart = this.$echarts.init(document.getElementById('analysis-skill-sum'))
      chart.showLoading()
      const option = {
        color: ['rgb(139, 200, 243)', 'rgb(255, 185, 128)'],
        title: {
          text: '多维度得分对比雷达图',
          x: 'center',
          y: 'bottom',
          padding: 0,
          textStyle: {
            fontSize: 25
          }
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'top',
          data: ['平均分', '我的得分']
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        polar: [
          {
            indicator: this.indicator
          }
        ],
        calculable: true,
        series: [
          {
            name: '平均分 vs 我的得分',
            type: 'radar',
            data: [
              {
                value: this.averageScoreList,
                name: '平均分'
              },
              {
                value: this.scoreList,
                name: '我的得分'
              }
            ]
          }
        ]
      }
      chart.setOption(option)
      chart.hideLoading()
    }
  }
}
</script>

<style scoped>

</style>
