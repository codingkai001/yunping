<template>
  <el-dialog title="重组团队" :visible.sync="show" :show-close="false" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-form label-width="80px" v-model="form">
        <el-form-item label="团队类型">
          <el-select v-model="teamType" @change="onTeamChange">
            <el-option value="personal" label="个人"></el-option>
            <el-option value="pair" label="结对"></el-option>
            <el-option value="custom" label="组队"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小人数">
          <el-input-number v-model="form.minPerson" :min="1" :disabled="teamType !== 'custom'" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="最大人数">
          <el-input-number v-model="form.maxPerson" :min="1" :disabled="teamType !== 'custom'" autocomplete="off"></el-input-number>
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

export default {
  data () {
    return {
      loading: false,
      className: '',
      teamType: 'personal',
      form: {
        minPerson: 1,
        maxPerson: 1
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
    onTeamChange (data) {
      switch (data) {
        case 'personal':
          this.form.minPerson = 1
          this.form.maxPerson = 1
          break
        case 'pair':
          this.form.minPerson = 1
          this.form.maxPerson = 2
          break
        case 'custom':
          this.form.minPerson = 3
          this.form.maxPerson = 6
          break
      }
    },
    createClass () {
      this.$emit('done')
      /*
      this.loading = true
      classAdd(this.className).then(p => {
        this.$emit('done')
        this.loading = false
      }).catch(e => {
        console.error(e)
        this.loading = false
      })
      */
    }
  }
}
</script>

<style>

</style>
