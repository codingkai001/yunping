<template>
  <layout>
    <div v-loading="loading">
      <div>
        <h2></h2>
      </div>
      <div style="margin-top: 1em">
        <div id="total-score-change-chart" style="width: 1500px;height: 500px;margin: 0 auto;"></div>
      </div>
    </div>
  </layout>
</template>

<script>
  import Layout from '../../../components/Layout'
  import { analysisClassTotal } from '../../../api/analysis'

  export default {
    data() {
      return {
        loading: false,
        classId: 0,
        classTaskTotalMap: {}
      }
    },
    components: {Layout},
    mounted() {
      this.getClassId()
      this.initOptionData()
      this.draw_chart()
    },
    methods: {
      getClassId() {
        var href = location.href.split('/')
        this.classId = parseInt(href[href.length - 1])
      },
      initOptionData(){
        this.loading = true
        analysisClassTotal(this.classId).then(p=>{
          this.loading = false
          this.classTaskTotalMap = p.classTaskTotalMap
          console.log(this.classTaskTotalMap)
        }).catch(e=>{
          this.loading = false
          this.$message.error('数据加载异常')
        })
      },
      draw_chart() {
        var chart = this.$echarts.init(document.getElementById('total-score-change-chart'))
        var option = {
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
        chart.setOption(option)
      }
    }
  }
</script>

<style scoped>

</style>
