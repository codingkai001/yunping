<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="新建团队">
    <div v-loading="loading">
      <el-form>
        <el-form-item label="团队名称">
          <el-input autocomplete="off" placeholder="请输入团队名称" v-model="teamName"></el-input>
        </el-form-item>
        <el-form-item label="团队类型">
          <el-select autocomplete="off" placeholder="请选择团队类型" v-model="teamType">
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in options">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队限制人数">
          <el-input-number autocomplete="off" v-model="teamLimit" :min="0" :max="10"></el-input-number>
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
      teamLimit: '',
      options: [{
        value: '0',
        label: '结对'
      }, {
        value: '1',
        label: '团队'
      }],
      value: ''
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
      if (this.teamType === '0' && this.teamLimit !== 2) {
        this.$message.error('结对编程人数必须为2')
      } else {
        this.loading = true
        teamAdd(this.teamName, this.teamLimit, this.teamType).then(p => {
          this.$emit('done')
          this.$message.success('团队创建成功')
          this.loading = false
        }).catch(e => {
          var message = JSON.parse(e.message)
          if (message.status === 730) {
            this.$message.error('你已加入团队，不能新建团队')
            this.loading = false
          } else if (message.status === 734) {
            this.$message.error('团队已存在')
          }
          console.log(typeof e.message)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>

</style>
