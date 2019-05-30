<template>
  <el-dialog :close-on-click-modal="false" :show-close="false" :visible.sync="show" title="作业评分">
    <div v-loading="loading">
      <el-form label-width="120px">
        <el-form-item label="贡献度列表"></el-form-item>
        <el-table stripe v-for="item in form.userList">
          <el-table-column
            label="成员名"
            v-model=item.userName>
          </el-table-column>
          <el-table-column
            label="贡献度（%）">
            <el-input-number>{{item.usContribute}}</el-input-number>
          </el-table-column>
        </el-table>
        <el-header>能力维度列表</el-header>
        <el-table stripe v-for="item in form.taskSkillDTOList">
          <el-table-column
            label="维度名"
            v-model=item.skillName>
          </el-table-column>
          <el-table-column
            label="得分"
            v-model=item.ssScore>
            <el-input-number>{{item.ssScore}}</el-input-number>
          </el-table-column>
        </el-table>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="hideThis">取 消</el-button>
        <el-button @click="evaluate" type="primary">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { taskEvaluate } from '../../../api/task'
  import { taskTeamStatus } from '../../../api/task'

  export default {
    data () {
      return {
        loading: false,
        form: {
          userList: [],
          taskId: 0,
          className: '',
          taskSkillDTOList: [],
          teamId: 0
        },
        attList: {
          taskContributeDTOList: [],
          taskSkillList: []
        }
      }
    },
    props: {
      show: Boolean,
      clazz: Object
    },
    mounted () {
      const id = this.$route.params.id
      this.form.taskId = id
      this.form.teamId = this.clazz.teamId
      taskTeamStatus(this.form.taskId, this.form.teamId).then(p => {
        this.form.userList = p.userContributeVOList
        this.form.taskSkillDTOList = p.skillVOList
      }).catch(e => {
        console.error(e)
      })
    },
    methods: {
      hideThis () {
        this.$emit('update:show', false)
      },
      evaluate () {
        var _taskSkillDTOList = []
        var _taskContributeDTOList = []
        for (var i = 0; i < this.form.taskSkillDTOList.length; i++) {
          var item1 = {
            'skillId': this.form.taskSkillDTOList[i].skillId,
            'ssScore': this.form.taskSkillDTOList[i].ssScore
          }
          _taskSkillDTOList.push(item1)
        }
        for (var j = 0; j < this.form.userList.length; j++) {
          var item2 = {
            'usContribute': this.form.taskSkillDTOList[j].usContribute,
            'userId': this.form.taskSkillDTOList[j].userId
          }
          _taskContributeDTOList.push(item2)
        }
        var params = {
          'taskContributeDTOList': _taskContributeDTOList,
          'taskId': this.form.taskId,
          'taskSkillDTOList': _taskSkillDTOList,
          'teamId': this.form.teamId
        }
        taskEvaluate(params).then(p => {
          this.$message.success('评分成功')
        }).catch(e => {
          this.$message.error('数据异常')
        })
      }
    }
  }
</script>

<style>

</style>
