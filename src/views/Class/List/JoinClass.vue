<template>
  <el-dialog title="加入班级" :visible.sync="show" :show-close="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-form :rules="rules" :model="form" ref="ruleForm" label-width="100px">
        <el-form-item label="班级Token" prop="token">
          <el-input v-model="form.token" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="cuEmail">
          <el-input v-model="form.cuEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="博客地址" prop="cuBlog">
          <el-input v-model="form.cuBlog" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="GitHub" props="cuGithub">
          <el-input v-model="form.cuGithub" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button type="primary" @click="joinClass('ruleForm')">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { classAuth } from '../../../api/class'
import UserStorage from '../../../store/user'
import { UserRole } from '../../../models/User'

export default {
  data () {
    return {
      loading: false,
      form: {
        cuGithub: '',
        cuEmail: '',
        cuBlog: '',
        token: ''
      },
    }
  },
  computed: {
    rules () {
      const ret = {
        token: [
          { required: true, message: '请输入班级Token', trigger: 'blur' }
        ],
        cuEmail: [
          { required: true, message: '请输入Email', trigger: 'blur' }
        ],
        cuGithub: [
          { required: true, message: '请输入GitHub', trigger: 'blur' }
        ],
        cuBlog: [
          { required: true, message: '请输入博客地址', trigger: 'blur' }
        ]
      }
      if (UserStorage.state.user.userRole === UserRole.teacher) {
        delete ret.cuEmail
        delete ret.cuGithub
        delete ret.cuBlog
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
    joinClass (form) {
      this.$refs[form].validate((valid) => {
        if (!valid) return
        this.loading = true
        classAuth({
          ...this.form,
          authCode: UserStorage.state.user.userRole
        }).then(p => {
          this.$emit('done')
          this.loading = false
        }).catch(e => {
          console.error(e)
          this.loading = false
        })
      })
    }
  }
}
</script>

<style>

</style>
