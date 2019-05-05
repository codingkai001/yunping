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
            <el-table>
              <el-table-column label="作业"></el-table-column>
              <el-table-column label="最后时间"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="importHomework(scope.row)">导入</el-button>
                  <el-button size="mini" @click="analyzeHomework(scope.row)">分析</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="学生" name="students">
            <el-table :data="clazz.classUserVOList"></el-table>
          </el-tab-pane>
          <el-tab-pane label="团队" name="teams">
            <el-table :data="clazz.classUserVOList"></el-table>
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
    }
  }
}
</script>

<style>

</style>
