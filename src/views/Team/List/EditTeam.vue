<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="编辑团队">
    <div v-loading="loading">
      <el-form label-width="120px">
        <el-form-item label="班级名">
          <el-input autocomplete="off" disabled v-model="form.className"></el-input>
        </el-form-item>
        <el-form-item label="学生Token">
          <el-input @focus="copy" autocomplete="off" readonly v-model="clazz.classStuToken"></el-input>
        </el-form-item>
        <el-form-item label="助教Token">
          <el-input @focus="copy" autocomplete="off" readonly v-model="clazz.classAssistantToken"></el-input>
        </el-form-item>
        <el-form-item label="编辑团队信息">
          <el-switch v-model="form.classTeamEdit"></el-switch>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button @click="editClass" type="primary">确 定</el-button>
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
    mounted () {
      this.form.classId = this.clazz.classId
      this.form.className = this.clazz.className
      this.form.classTeamEdit = this.clazz.classTeamEdit
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
      },
      copy (e) {
        const target = e.target
        target.select()
        document.execCommand('copy')
        this.$message.success('复制成功')
      }
    }
  }
</script>

<style>

</style>
