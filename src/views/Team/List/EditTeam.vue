<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="编辑团队">
    <div v-loading="loading">
      <el-form label-width="120px">
        <el-form-item label="团队Id">
          <el-input autocomplete="off" readonly v-model="teamId"></el-input>
        </el-form-item>
        <el-form-item label="团队名">
          <el-input autocomplete="off" v-model="teamName"></el-input>
        </el-form-item>
        <el-form-item label="团队人数限制">
          <el-input autocomplete="off" v-model="teamLimit"></el-input>
        </el-form-item>
        <el-form-item label="团队种类">
          <el-input autocomplete="off" v-model="teamType"></el-input>
        </el-form-item>
        <el-form-item label="团队队长">
          <el-input autocomplete="off" v-model="teamCaptain"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button @click="editTeam" type="primary">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { teamUpdate } from '../../../api/team'
  import { teamDetail } from '../../../api/team'

  export default {
    data () {
      return {
        loading: false,
          teamId: 0,
          teamName: '',
          teamLimit: 0,
          teamType: 0,
          teamCaptain: 0
      }
    },
    props: {
      show: Boolean,
      //clazz: Object
    },
    mounted () {
      teamDetail().then(p => {
        this.teamId = p.teamId
        this.teamName = p.teamName
        this.teamLimit = p.teamLimit
        this.teamType = p.teamType
        this.teamCaptain = p.teamCaptain
        }).catch(e => {
          console.error(e)
          this.loading = false
        })
      }
    ,
    methods: {
      hideThis () {
        this.$emit('update:show', false)
      },
      editTeam () {
        // this.loading = true
        teamUpdate(this.teamId, this.teamName, this.teamLimit, this.teamType, this.teamCaptain)
          .then(p => {
            this.$emit('done')
            this.$message.success('修改成功')
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
