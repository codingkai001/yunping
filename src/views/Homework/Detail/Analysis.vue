<template>
  <layout>
    <div v-loading="loading">
      <div style="margin-top: 1em">
        <div v-if="user.userRole === UserRole.student" id="analysis-skill-sum" style="width: 80%;height: 600px;margin: 0 auto;"></div>
        <div id="analysis-task-total" style="width: 80%;height: 600px;margin: 0 auto;"></div>
      </div>
    </div>
  </layout>
</template>

<script>
import UserStorage from '../../../store/user'
import { UserRole } from '../../../models/User'
import Layout from '../../../components/Layout'
import { analysisSkillSum, analysisTaskTotal } from '../../../api/analysis'

export default {
  data () {
    return {
      loading: false,
      taskId: 0,
      skillSumItemVOList: [],
      skillList: [],
      averageScoreList: [],
      scoreList: [],
      userAccountList: [],
      usFinalScoreList: []
    }
  },
  components: { Layout },
  computed: {
    user: () => UserStorage.state.user,
    UserRole: () => UserRole
  },
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
        for (var i = 0; i < this.skillSumItemVOList.length; i++) {
          this.skillList.push(this.skillSumItemVOList[i].skillName)
          this.averageScoreList.push(parseInt(this.skillSumItemVOList[i].averageScore))
          this.scoreList.push(parseInt(this.skillSumItemVOList[i].score))
        }
        this.drawSkillChart()
        console.log(this.skillSumItemVOList)
      }).catch(e => {
        console.log(e)
        this.loading = false
        this.$message.error('数据加载异常')
      })
      analysisTaskTotal(this.taskId).then(p => {
        this.loading = false
        for (var j = 0; j < p.taskTotalItemVOList.length; j++) {
          this.userAccountList.push(p.taskTotalItemVOList[j].userAccount)
          this.usFinalScoreList.push(parseInt(p.taskTotalItemVOList[j].usFinalScore))
        }
        this.drawTaskChart()
        console.log(p.taskTotalItemVOList)
      }).catch(e => {
        this.loading = false
        console.log(e)
        this.$message.error('数据加载异常')
      })
    },
    drawSkillChart () {
      const chart1 = this.$echarts.init(document.getElementById('analysis-skill-sum'))
      const option1 = {
        title: {
          text: '评分维度得分条形图',
          x: 'center',
          y: 'bottom',
          padding: 0,
          textStyle: {
            fontSize: 25
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['平均分', '我的得分']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['bar', 'line'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.skillList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '平均分',
            type: 'bar',
            data: this.averageScoreList,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '我的得分',
            type: 'bar',
            data: this.scoreList,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
      chart1.setOption(option1)
    },
    drawTaskChart () {
      const chart2 = this.$echarts.init(document.getElementById('analysis-task-total'))
      const option2 = {
        title: {
          text: '学生总分横向条形图',
          x: 'center',
          y: 'bottom',
          padding: 0,
          textStyle: {
            fontSize: 25
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'value',
            boundaryGap: [0, 0.01]
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.userAccountList
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.usFinalScoreList
          }
        ]
      }
      chart2.setOption(option2)
    }
  }
}
</script>

<style scoped>

</style>
