<template>
  <Layout>
    <el-button type='primary' @click="showCreateClass = true">新建班级</el-button>
    <el-table v-loading="loading">

    </el-table>
    <CreateClass
      v-on:done="createClassDone"
      v-bind:show.sync="showCreateClass"
    />
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import CreateClass from './CreateClass'
import { classSearch } from '../../../api/class'

export default {
  data () {
    return {
      loading: false,
      classList: [],
      showCreateClass: false
    }
  },
  components: {
    Layout,
    CreateClass
  },
  mounted () {
    this.reloadList()
  },
  methods: {
    reloadList () {
      this.loading = true
      classSearch().then(p => {
        console.log(p)
        this.loading = false
      })
    },
    createClassDone () {
      this.showCreateClass = false
      this.reloadList()
    }
  }
}
</script>

<style>

</style>
