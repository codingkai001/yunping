<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="编辑团队">
    <div v-loading="loading">
      <el-form label-width="120px">
        <el-form-item label="团队Id">
          <el-input autocomplete="off" readonly v-model="form.teamId"></el-input>
        </el-form-item>
        <el-form-item label="团队名">
          <el-input autocomplete="off" v-model="form.teamName"></el-input>
        </el-form-item>
        <el-form-item label="团队人数限制">
          <el-input autocomplete="off" v-model="form.teamLimit"></el-input>
        </el-form-item>
        <el-form-item label="团队种类">
          <el-input autocomplete="off" v-model="form.teamType"></el-input>
        </el-form-item>
        <el-form-item label="编辑团队信息">
          <el-switch v-model="form.teamEdit"></el-switch>
        </el-form-item>
        <el-form-item label="团队队长">
          <el-input autocomplete="off" v-model="form.teamCaptain"></el-input>
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

  export default {
    data () {
      return {
        loading: false,
        form: {
          teamId: 0,
          teamName: '',
          teamLimit: 0,
          teamType: 0,
          teamEdit: false,
          teamCaptain: 0
        }
      }
    },
    props: {
      show: Boolean,
      //clazz: Object
    },
    mounted () {
      // this.form.classId = this.clazz.classId
      // this.form.className = this.clazz.className
      // this.form.classTeamEdit = this.clazz.classTeamEdit
    },
    methods: {
      hideThis () {
        this.$emit('update:show', false)
      },
      editTeam () {
        this.loading = true
        teamUpdate(this.form.teamId, this.form.teamName, this.form.teamLimit, this.form.teamType, this.form.teamEdit, this.form.teamCaptain).then(p => {
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
