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
              <el-table-column label="作业ID" prop="taskId" width="70" align="center"></el-table-column>
              <el-table-column label="名称" prop="taskName" width="230" align="center"></el-table-column>
              <el-table-column label="发布地址" prop="taskUrl" min-width="200" align="center">
                <template slot-scope="scope">
                  <a :href="scope.row.taskUrl"
                     target="_blank">{{scope.row.taskUrl}}</a>
                </template>
              </el-table-column>
              <el-table-column label="发布者" prop="taskCreatorName" width="100" align="center"></el-table-column>
              <el-table-column label="创建日期" prop="taskCreateAt" width="160" align="center"></el-table-column>
              <el-table-column label="截止日期" prop="taskOverAt" width="160" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="analyzeHomework(scope.row)">分析</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="学生" name="students">
            <el-table :data="clazz.classUserVOList" >
              <el-table-column label="学生ID" prop="userId" align="center" width="70"></el-table-column>
              <el-table-column label="姓名" prop="userName" align="center" width="80"></el-table-column>
              <el-table-column label="学号" prop="userAccount" align="center" width="100"></el-table-column>
              <el-table-column label="博客园地址" prop="cuBlog" align="center" min-width="110">
                <template slot-scope="scope">
                  <a :href="scope.row.cuBlog"
                     target="_blank">{{scope.row.cuBlog}}</a>
                </template>
              </el-table-column>
              <el-table-column label="Github地址" prop="cuGithub" align="center" min-width="110">
                <template slot-scope="scope">
                  <a :href="scope.row.cuGithub"
                     target="_blank">{{scope.row.cuGithub}}</a>
                </template>
              </el-table-column>
              <el-table-column label="Email" prop="cuEmail" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="analyzeHomework(scope.row)">分析</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="团队" name="teams">
            <el-table :data="teamList">
              <el-table-column label="团队ID" prop="teamId"  align="center"></el-table-column>
              <el-table-column label="团队名称" prop="teamName"  align="center"></el-table-column>
              <el-table-column label="团队类型" prop="teamType"  align="center"></el-table-column>
              <el-table-column label="团队人数" prop="teamSize"  align="center"></el-table-column>
              <el-table-column label="团队队长" prop="teamCaptain"  align="center"></el-table-column>
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
// eslint-disable-next-line no-unused-vars
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
        // this.loading = false
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
      /* 缺少班级ID */
      var href = location.href.split('/')
      var classId = href[href.length - 1]
      this.$router.push({ path: `/class/analysis/${classId}` })
    },
    analyzeHomework (row) {
      var taskId = row.taskId
      this.$router.push('/homework/analysis/' + taskId)
    },
    copy (e) {
      const target = e.target
      target.select()
      document.execCommand('copy')
      this.$message.success('复制成功')
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
