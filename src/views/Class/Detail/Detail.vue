<template>
  <Layout>
    <div v-loading="loading">
      <div>
        <h2>{{clazz.className}}</h2>
        <el-button size='small' @click="reorganizeTeam">团队重组</el-button>
        <el-button size='small'>统计分析</el-button>
        <el-button size='small' v-if="false">创建团队</el-button>
      </div>
      <div style="margin-top: 1em">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="作业" name="homeworks">
            <el-table :data="clazz.taskVOList">
              <el-table-column label="ID" prop="taskId" width="70"></el-table-column>
              <el-table-column label="名称" prop="taskName"></el-table-column>
              <el-table-column label="发布地址" prop="taskUrl" min-width="200" @focus="copy"></el-table-column>
              <el-table-column label="发布者" prop="taskCreatorName" width="100"></el-table-column>
              <el-table-column label="创建日期" prop="taskCreateAt" width="150"></el-table-column>
              <el-table-column label="截止日期" prop="taskOverAt" width="150"></el-table-column>
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
            <el-table :data="clazz.classTeamVOList"></el-table>
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
import NewTeam from './NewTeam'
import UserStorage from '../../../store/user'

export default {
  data () {
    return {
      loading: false,
      activeTab: 'homeworks',
      clazz: {},
      showNewTeam: false
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
    copy (e) {
      const target = e.target
      target.select()
      document.execCommand('copy')
      this.$message.success('复制成功')
    }
  }
}
</script>

<style>

</style>
