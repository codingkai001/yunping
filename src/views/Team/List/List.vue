<template>
  <layout>
    <div v-loading="loading">
      <div>
        <h2>{{teamName}}</h2>
        <el-button size="small" @click="showCreateTeam = true" type='primary'>创建团队</el-button>
        <el-button size="small" @click="showJoinTeam = true" type='primary'>加入团队</el-button>
        <el-button size="small" @click="showEditTeam = true" type='primary'>编辑团队</el-button>
        <el-button size="small" @click="quitTeam" type='primary'>退出团队</el-button>
        <el-button @click="clearTeam(teamId)" size="small" type='primary'>解散团队</el-button>
      </div>
      <el-table :data="teamList" stripe>
        <el-table-column
          label="成员ID"
          prop="userId"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="userName"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          label="Github地址"
          prop="cuGithub"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <a :href="scope.row.cuGithub"
               target="_blank">{{scope.row.cuGithub}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="博客园地址"
          prop="cuBlog"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <a :href="scope.row.cuBlog"
               target="_blank">{{scope.row.cuBlog}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱地址"
          prop="cuEmail"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column label="是否队长" align="center">
          <template slot-scope="scope">
            <i class="el-icon-check" v-if="scope.row.isCaptain===true"></i>
            <i class="el-icon-close" v-if="scope.row.isCaptain===false"></i>
          </template>
        </el-table-column>
      </el-table>
      <CreateTeam
        v-bind:show.sync="showCreateTeam"
        v-on:done="createTeamDone"
      />
      <JoinTeam
        v-bind:show.sync="showJoinTeam"
        v-on:done="createTeamDone"
      />
      <EditTeam
        :clazz="selectedTeam"
        v-bind:show.sync="showEditTeam"
        v-if="showEditTeam"
        v-on:done="createTeamDone"
      />
    </div>
  </layout>
</template>
<script>
import Layout from '../../../components/Layout'
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'
import EditTeam from './EditTeam'
import { teamDetail, teamExit, teamClear } from '../../../api/team'

export default {
  data () {
    return {
      loading: false,
      showCreateTeam: false,
      showJoinTeam: false,
      showEditTeam: false,
      teamList: [],
      selectedClass: {},
      teamName: '',
      teamId: 0
    }
  },
  components: {
    Layout,
    CreateTeam,
    JoinTeam,
    EditTeam
  },
  mounted () {
    this.reloadList()
  },
  methods: {
    reloadList () {
      // this.loading = true
      teamDetail().then(p => {
        this.teamList = p.classUserVOList
        this.teamName = p.teamName
        this.teamId = p.teamId
        console.log(p)
        this.loading = false
      })
    },
    createTeamDone () {
      this.showCreateTeam = false
      this.showJoinTeam = false
      this.showEditTeam = false
      this.reloadList()
    },
    editTeam (row) {
      this.selectedTeam = row
      this.showEditTeam = true
    },
    quitTeam () {
      teamExit().then(p => {
        alert('退出团队成功！')
        console.log(p)
        this.loading = false
      })
    },
    clearTeam (teamId) {
      teamClear(teamId).then(p => {
        alert('解散团队成功！')
        console.log(p)
        this.loading = false
      })
    }
  }
}
</script>
