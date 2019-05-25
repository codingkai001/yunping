<template>
  <layout>
    <div v-loading="loading">
      <el-button @click="showCreateTeam = true" type='primary'>创建团队</el-button>
      <el-button @click="showJoinTeam = true" type='primary'>加入团队</el-button>
      <el-button @click="showTeamInformation = true" type='primary'>团队信息</el-button>
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
            {{ scope.row.isCaptain===true ? '是' : '' }}
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--&lt;!&ndash;                        <el-button size="mini" @click="viewTeam(scope.row)">查看</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;                        <el-button size="mini" @click="editTeam(scope.row)">编辑</el-button>&ndash;&gt;-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
      <CreateTeam
        v-bind:show.sync="showCreateTeam"
        v-on:done="createTeamDone"
      />
      <JoinTeam
        v-bind:show.sync="showJoinTeam"
        v-on:done="createTeamDone"
      />
    </div>
  </layout>
</template>
<script>
  import Layout from '../../../components/Layout'
  import CreateTeam from './CreateTeam'
  import JoinTeam from './JoinTeam'
  import { teamDetail } from '../../../api/team'

  export default {
    data () {
      return {
        loading: false,
        showCreateTeam: false,
        showJoinTeam: false,
        showTeamInformation: false,
        teamList: [],
      }
    },
    components: {
      Layout,
      CreateTeam,
      JoinTeam
    },
    mounted () {
      this.reloadList()
    },
    methods: {
      reloadList () {
        this.loading = true
        teamDetail().then(p => {
          this.teamList = p.classUserVOList
          console.log(p)
          this.loading = false
        })
      },
      createTeamDone () {
        this.showCreateTeam = false
        this.showJoinTeam = false
        this.showTeamInformation = false
        this.reloadList()
      },
      // editClass (row) {
      //   this.selectedClass = row
      //   this.showEditClass = true
      // },
      // viewClass (row) {
      //   this.$router.push({ path: '/class/detail/' + row.classId })
      // }
    }
  }

</script>
