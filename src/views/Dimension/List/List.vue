<template>
  <Layout>
    <el-button type='primary' @click="$router.push({ path: '/dimension/edit/0' })">新建维度</el-button>
    <el-table v-loading="loading" :data="dimensionList" stripe>
      <el-table-column
        prop="skillId"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="skillName"
        label="能力名">
      </el-table-column>
      <el-table-column
        prop="skillShortName"
        label="能力代号">
      </el-table-column>
      <el-table-column
        prop="skillType"
        label="能力类别">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editDimension(scope.row)">编辑</el-button>
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
        this.dimensionList = p.skillVOList
        this.loading = false
      })
    },
    editDimension (row) {
      this.$router.push({ path: `/dimension/edit/${row.skillId}` })
    }
  }
}
</script>

<style>

</style>
