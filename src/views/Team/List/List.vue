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
          width="180">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="userName">
        </el-table-column>
        <el-table-column
          label="Github地址"
          prop="cuGithub">
        </el-table-column>
        <el-table-column
          label="博客园地址"
          prop="cuBlog">
        </el-table-column>
        <el-table-column
          label="邮箱地址"
          prop="cuEmail">
        </el-table-column>
        <el-table-column label="是否队长">
          <template slot-scope="scope">
<!--            {{ scope.row.isCaptain===true ? '是' : '' }}-->
            <i class="el-icon-check" v-if="scope.row.isCaptain===true"></i>
            <i class="el-icon-close" v-if="scope.row.isCaptain===false"></i>
          </template>
        </el-table-column>
        <!--                <el-table-column-->
        <!--                  label="操作">-->
        <!--                  <template slot-scope="scope">-->
        <!--                                <el-button size="mini" @click="viewTeam(scope.row)">查看</el-button>-->
        <!--                                <el-button size="mini" @click="editTeam(scope.row)">编辑</el-button>-->
        <!--                  </template>-->
        <!--                </el-table-column>-->
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
  import { teamDetail } from '../../../api/team'
  import { teamExit } from '../../../api/team'
  import { teamClear } from '../../../api/team'

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
        //this.loading = true
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
