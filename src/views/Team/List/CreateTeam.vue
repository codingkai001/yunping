<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="新建团队">
    <div v-loading="loading">
      <el-form>
        <el-form-item label="团队名称">
          <el-input autocomplete="off" v-model="teamName"></el-input>
        </el-form-item>
        <el-form-item label="团队限制人数">
          <el-input autocomplete="off" v-model="teamLimit"></el-input>
        </el-form-item>
        <el-form-item label="团队类型">
          <el-input autocomplete="off" v-model="teamType"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button @click="createTeam" type="primary">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { teamAdd } from '../../../api/team'

  export default {
    data () {
      return {
        loading: false,
        teamName: '',
        teamType: '',
        teamLimit: ''
      }
    },
    props: {
      show: Boolean
    },
    methods: {
      hideThis () {
        this.$emit('update:show', false)
      },
      createTeam () {
        this.loading = true
        teamAdd(this.teamName, this.teamLimit, this.teamType).then(p => {
          this.$emit('done')
          this.$message(p)//888888888888888
          this.loading = false
        }).catch(e => {
          console.error(e)
          this.loading = false
        })
      }
    }
  }
</script>

<style>

</style>
