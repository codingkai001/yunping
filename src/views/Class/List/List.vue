<template>
  <Layout>
    <div v-loading="loading">
      <el-button type='primary' @click="showCreateClass = true" v-if="user.userRole === UserRole.teacher">新建班级</el-button>
      <el-button v-if="user.userRole === UserRole.teacher" @click="showJoinClass = true">作为助教加入班级</el-button>
      <el-button type='primary' v-if="user.userRole === UserRole.student" @click="showJoinClass = true">加入班级</el-button>
      <el-table :data="classList" stripe>
        <el-table-column
          prop="classId"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showTokenDialog(scope.row)">Token</el-button>
            <el-button size="mini" @click="editClass(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <CreateClass
        v-on:done="createClassDone"
        v-bind:show.sync="showCreateClass"
      />
      <JoinClass
        v-on:done="createClassDone"
        v-bind:show.sync="showJoinClass"
      />
      <EditClass
        v-if="showEditClass"
        v-on:done="createClassDone"
        v-bind:show.sync="showEditClass"
        :clazz="selectedClass"
      />
      <ShowToken
        v-if="showToken"
        v-on:done="createClassDone"
        v-bind:show.sync="showToken"
        :clazz="selectedClass"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import CreateClass from './CreateClass'
import JoinClass from './JoinClass'
import EditClass from './EditClass'
import ShowToken from './ShowToken'
import { classSearch } from '../../../api/class'
import UserStorage from '../../../store/user'
import { UserRole } from '../../../models/User'

export default {
  data () {
    return {
      loading: false,
      classList: [],
      showCreateClass: false,
      showJoinClass: false,
      showEditClass: false,
      showToken: false,
      selectedClass: {}
    }
  },
  computed: {
    user: () => UserStorage.state.user,
    UserRole: () => UserRole
  },
  components: {
    Layout,
    CreateClass,
    JoinClass,
    EditClass,
    ShowToken
  },
  mounted () {
    this.reloadList()
  },
  methods: {
    reloadList () {
      this.loading = true
      classSearch().then(p => {
        this.classList = p.classVOList
        console.log(p)
        this.loading = false
      })
    },
    createClassDone () {
      this.showCreateClass = false
      this.showJoinClass = false
      this.showEditClass = false
      this.reloadList()
    },
    editClass (row) {
      this.selectedClass = row
      this.showEditClass = true
    },
    showTokenDialog (row) {
      this.selectedClass = row
      this.showToken = true
    }
  }
}
</script>

<style>

</style>
