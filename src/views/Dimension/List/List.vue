<template>
  <Layout>
    <div v-loading="loading">
      <el-button type='primary' @click="$router.push({ path: '/dimension/edit/0' })">新建维度</el-button>
      <el-table :data="dimensionList" stripe>
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
            <el-button size="mini" @click="deleteDimension(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { dimensionDelete, dimensionSearch } from '../../../api/dimension'

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
    },
    deleteDimension (row) {
      this.$confirm('确认删除当前维度？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        dimensionDelete(row.skillId).then(p => {
          // console.log(p)
          this.$message.success('删除成功')
          this.reloadList()
          this.loading = false
        })
      })
    }
  }
}
</script>

<style>

</style>
