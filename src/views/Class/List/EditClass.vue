<template>
  <el-dialog title="编辑班级" :visible.sync="show" :show-close="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-form>
        <el-form-item label="班级名">
          <el-input v-model="form.className" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="允许重组团队">
          <el-switch v-model="form.classTeamEdit"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button type="primary" @click="editClass">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { classUpdate } from '../../../api/class'

export default {
  data () {
    return {
      loading: false,
      form: {
        classId: 0,
        className: '',
        classTeamEdit: false
      }
    }
  },
  props: {
    show: Boolean,
    clazz: Object
  },
  watch: {
    clazz (newClass, oldClass) {
      if (newClass !== oldClass) {
        this.form.classId = newClass.classId
        this.form.className = newClass.className
        this.form.classTeamEdit = newClass.classTeamEdit
      }
    }
  },
  methods: {
    hideThis () {
      this.$emit('update:show', false)
    },
    editClass () {
      this.loading = true
      classUpdate(this.form).then(p => {
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
