<template>
  <Layout>
    <el-button type='primary' @click="$router.push({ path: '/dimension/edit/0' })">新建维度</el-button>
    <el-table v-loading="loading" :data="dimensionList" stripe>
      <el-table-column
        prop="classId"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editClass(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { dimensionSearch } from '../../../api/dimension'

export default {
  data () {
    return {
      loading: false,
      dimensionList: []
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
      this.loading = true
      dimensionSearch({}).then(p => {
        console.log(p)
        this.loading = false
      })
    },
    editClass (row) {
      console.log(row)
    }
  }
}
</script>

<style>

</style>
