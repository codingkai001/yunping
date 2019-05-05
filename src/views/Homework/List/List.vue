<template>
  <Layout>
    <div v-loading="loading">
      <el-button type='primary' @click="$router.push({ path: '/homework/edit/0' })">新建作业</el-button>
      <el-table :data="dimensionList" stripe>
        <el-table-column
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          label="作业名">
        </el-table-column>
        <el-table-column
          label="班级">
        </el-table-column>
        <el-table-column
          prop="skillType"
          label="能力类别">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editHomework(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
// import { dimensionSearch } from '../../../api/dimension'

export default {
  data () {
    return {
      loading: false,
      homeworkList: []
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.reloadList()
  },
  methods: {
    reloadList () {
      /*
      this.loading = true
      dimensionSearch({}).then(p => {
        this.dimensionList = p.skillVOList
        this.loading = false
      })
      */
    },
    editHomework (row) {
      this.$router.push({ path: `/homework/edit/${row.id}` })
    }
  }
}
</script>

<style>

</style>
