<template>
  <el-dialog title="新建班级" :visible.sync="show" :show-close="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-form>
        <el-form-item label="班级名称">
          <el-input v-model="className" autocomplete="off" placeholder="请输入班级名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button type="primary" @click="createClass">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { classAdd } from '../../../api/class'

export default {
  data () {
    return {
      loading: false,
      className: ''
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    hideThis () {
      this.$emit('update:show', false)
    },
    createClass () {
      this.loading = true
      classAdd(this.className).then(p => {
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
