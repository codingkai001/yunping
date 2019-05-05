<template>
  <el-dialog title="加入班级" :visible.sync="show" :show-close="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-form>
        <el-form-item label="班级Token">
          <el-input v-model="form.token" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button type="primary" @click="joinClass">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { classAuth } from '../../../api/class'

export default {
  data () {
    return {
      loading: false,
      form: {
        cuGithub: '',
        cuEmail: '',
        cuBlog: '',
        token: ''
      }
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    hideThis () {
      this.$emit('update:show', false)
    },
    joinClass () {
      this.loading = true
      classAuth(this.form).then(p => {
        this.$emit('done')
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
