<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="加入团队">
    <div v-loading="loading">
      <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm">
        <el-form-item label="团队Token" prop="token">
          <el-input autocomplete="off" v-model="form.token"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button @click="joinTeam('ruleForm')" type="primary">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { teamJoin } from '../../../api/team'

  export default {
    data () {
      return {
        loading: false,
        form: {
          token: ''
        }
      }
    },
    computed: {
      rules () {
        const ret = {
          token: [
            { required: true, message: '请输入团队Token', trigger: 'blur' }
          ],
        }
        return ret
      }
    },
    props: {
      show: Boolean
    },
    methods: {
      hideThis () {
        this.$emit('update:show', false)
      },
      joinTeam (form) {
        this.$refs[form].validate((valid) => {
          if (!valid) return
          this.loading = true
          teamJoin(this.form.token)
            .then(p => {
              this.$emit('done')
              this.loading = false
            }).catch(e => {
            this.$message.error("当前用户未在当前班级中，无法加入团队")
            // console.error(e)
            this.loading = false
            this.hideThis()
          })
        })
      }
    }
  }
</script>

<style>

</style>
