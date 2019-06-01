<template>
  <layout>
    <div v-loading="loading">
      <div>
        <h2></h2>
      </div>
      <div style="margin-top: 1em">
        <div id="total-score-change-chart" style="width: 100%;height: 700px;margin: 0 auto;"></div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { analysisClassTotal } from '../../../api/analysis'

export default {
  data () {
    return {
      loading: false,
      classId: 0,
      stuNumList: [],
      taskList: [],
      series: []
    }
  },
  components: { Layout },
  mounted () {
    this.getClassId()
    this.initOptionData()
    // this.draw_chart()
  },
  methods: {
    getClassId () {
      var href = location.href.split('/')
      this.classId = parseInt(href[href.length - 1])
    },
    initOptionData () {
      this.loading = true
      analysisClassTotal(this.classId).then(p => {
        // 获取所有同学的学号
        for (var k in p.classTaskTotalMap) {
          this.stuNumList.push(k)
        }
        // 获取所有作业列表
        var firstStudent = p.classTaskTotalMap[this.stuNumList[0]]
        for (var i = 0; i < firstStudent.length; i++) {
          this.taskList.push(firstStudent[i].taskName)
          // console.log(firstStudent[i].taskName)
        }
        // console.log(this.stuNumList)
        // console.log(this.taskList)
        // 初始化series
        for (var item in p.classTaskTotalMap) {
          var stuItem = p.classTaskTotalMap[item]
          // console.log(stuItem)
          var dataItem = {
            name: '',
            type: 'line',
            stack: '总量',
            data: []
          }
          for (var j = 0; j < stuItem.length; j++) {
            dataItem.data.push(parseInt(stuItem[j].totalScore))
          }
          // console.log(dataItem)
          this.series.push(dataItem)
        }
        for (var l = 0; l < this.stuNumList.length; l++) {
          this.series[l].name = this.stuNumList[l]
        }
        this.draw_chart()
        console.log(this.stuNumList)
        console.log(this.taskList)
        console.log(this.series)
        this.loading = false
        // console.log(p.classTaskTotalMap)
      }).catch(e => {
        this.loading = false
        // console.log(this.series)
        console.log(e)
        this.$message.error('数据加载异常')
      })
    },
    draw_chart () {
      var chart = this.$echarts.init(document.getElementById('total-score-change-chart'))
      chart.showLoading()
      var option = {
        title: {
          text: '学生作业成绩千帆竞发图',
          x: 'center',
          y: 'top',
          padding: 5,
          textStyle: {
            fontSize: 25
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.stuNumList,
          x: 'center',
          y: 'bottom',
          padding: 0
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
            type: 'category',
            boundaryGap: false,
            data: this.taskList,
            axisLabel: {
              interval: 0,
              rotate: -30
            }
          }
        ],
        grid: {
          left: '5%',
          bottom: '25%'
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.series
      }
      chart.setOption(option)
      chart.hideLoading()
    }
  }
}
</script>

<style scoped>

</style>
