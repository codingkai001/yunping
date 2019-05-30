<template>
  <Layout>
    <div v-loading="loading">
      <div>
        <h2>{{clazz.className}}</h2>
        <el-button size='small' @click="reorganizeTeam">团队重组</el-button>
        <el-button size='small' @click="analysisClass">统计分析</el-button>
        <el-button size='small' v-if="false">创建团队</el-button>
      </div>
      <div style="margin-top: 1em">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="作业" name="homeworks">
            <el-table :data="clazz.taskVOList">
              <el-table-column label="ID" prop="taskId" width="70"></el-table-column>
              <el-table-column label="名称" prop="taskName" width="200"></el-table-column>
              <el-table-column label="发布地址" prop="taskUrl" width="300"></el-table-column>
              <el-table-column label="发布者" prop="taskCreatorName" width="150"></el-table-column>
              <el-table-column label="创建日期" prop="taskCreateAt" width="180"></el-table-column>
              <el-table-column label="截止日期" prop="taskOverAt" width="180"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="importHomework(scope.row)">导入</el-button>
                  <el-button size="mini" @click="analyzeHomework(scope.row)">分析</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="学生" name="students">
            <el-table :data="clazz.classUserVOList">
              <el-table-column label="ID" prop="userId" width="70"></el-table-column>
              <el-table-column label="姓名" prop="userName" width="100"></el-table-column>
              <el-table-column label="学号" prop="userAccount" width="100"></el-table-column>
              <el-table-column label="博客园地址" prop="cuBlog"></el-table-column>
              <el-table-column label="Github地址" prop="cuGithub"></el-table-column>
              <el-table-column label="Email" prop="cuEmail"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="importHomework(scope.row)">导入</el-button>
                  <el-button size="mini" @click="analyzeHomework(scope.row)">分析</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="团队" name="teams">
            <el-table :data="teamList">
              <el-table-column label="团队ID" prop="teamId"></el-table-column>
              <el-table-column label="团队名称" prop="teamName"></el-table-column>
              <el-table-column label="团队类型" prop="teamType"></el-table-column>
              <el-table-column label="团队人数" prop="teamSize"></el-table-column>
              <el-table-column label="团队队长" prop="teamCaptain"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <NewTeam
      v-if="showNewTeam"
      v-on:done="reloadData"
      v-bind:show.sync="showNewTeam"
      :clazz="clazz"
    />
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { classDetail } from '../../../api/class'
import { teamSearch } from '../../../api/team'
import NewTeam from './NewTeam'
import UserStorage from '../../../store/user'

export default {
  data () {
    return {
      loading: false,
      activeTab: 'homeworks',
      clazz: {},
      showNewTeam: false,
      teamList: []
    }
  },
  components: {
    Layout,
    NewTeam
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    reloadData () {
      const id = this.$route.params.id
      this.showNewTeam = false
      this.loading = true
      classDetail(id, 1, 1000).then(p => {
        this.clazz = p
        this.secondsToTime(this.clazz.taskVOList)
        //this.loading = false
      })
      teamSearch(id).then(p => {
        this.teamList = p.teamVOList
        this.loading = false
      })
    },
    reorganizeTeam () {
      this.$confirm('此操作将解散所有学生团队，是否继续？', '提示', {
        type: 'warning'
      }).then(() => {
        this.showNewTeam = true
      }).catch(() => {
      }) // do nothing
    },
    analysisClass () {
      /*缺少班级ID*/
      var href = location.href.split('/')
      var classId = href[href.length-1]
      this.$router.push({path: `/class/analysis/${classId}`})
    },
    analyzeHomework(row){
      var taskId = row.taskId
      this.$router.push('/homework/analysis/'+taskId)
    },
    copy (e) {
      const target = e.target
      target.select()
      document.execCommand('copy')
      this.$message.success('复制成功')
    },
    secondsToTime (s) {
      for (var i = 0;i<s.length;i++){
        var time_start =  new Date(parseInt(s[i].taskCreateAt))
        var time_end =  new Date(parseInt(s[i].taskOverAt))
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
