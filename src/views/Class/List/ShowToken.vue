<template>
  <el-dialog title="加入Token" :visible.sync="show" :show-close="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-form label-width="100px">
        <el-form-item label="学生Token">
          <el-input @focus="copy" v-model="clazz.classStuToken" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="助教Token">
          <el-input @focus="copy" v-model="clazz.classAssistantToken" autocomplete="off" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideThis">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    show: Boolean,
    clazz: Object
  },
  methods: {
    hideThis () {
      this.$emit('update:show', false)
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
