<template>
    <div id="new-homework">
        <el-form :model="form" label-width="80px" ref="form">
            <el-form-item label="作业名称">
                <el-input placeholder="请输入作业名称" v-model="form.homeworkName"></el-input>
            </el-form-item>
            <el-form-item label="作业类型">
                <el-select multiple placeholder="请选择作业类型" v-model="homeworkType">
                    <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in homeworkTypeOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考察能力">
                <el-select multiple placeholder="请选择考察能力" v-model="testAbility">
                    <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in testAbilityOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="难易度">
                <el-select multiple placeholder="请选择难易度" v-model="difficulty">
                    <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in difficultyOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公开程度">
                <el-select multiple placeholder="请选择公开程度" v-model="publicDegree">
                    <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in publicDegreeOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="截止时间">
                <span>截止时间</span>
                <el-date-picker
                    placeholder="选择日期时间"
                    type="datetime"
                    v-model="value1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作业要求">
                <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    placeholder="请输入作业要求"
                    type="textarea"
                    v-model="form.classBulletin">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" round type="primary">发布作业</el-button>
                <el-button round>保存至题库</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
export default {
  name: 'NewHomework',
  data () {
    return {
      form: {
        homeworkName: ''
      },
      homeworkTypeOptions: [{
        value: '选项1',
        label: '个人'
      }, {
        value: '选项2',
        label: '结对'
      }, {
        value: '选项3',
        label: '团队'
      }],
      homeworkType: [],
      testAbilityOptions: [{
        value: '选项1',
        label: '基础编程类'
      }, {
        value: '选项2',
        label: '结对编程类'
      }, {
        value: '选项3',
        label: '团队项目类'
      }],
      testAbility: [],
      difficultyOptions: [{
        value: '选项1',
        label: 'A'
      }, {
        value: '选项2',
        label: 'B'
      }, {
        value: '选项3',
        label: 'C'
      }, {
        value: '选项4',
        label: 'D'
      }, {
        value: '选项5',
        label: 'E'
      }],
      difficulty: [],
      publicDegreeOptions: [{
        value: '选项1',
        label: '全系统公开'
      }, {
        value: '选项2',
        label: '全学校公开'
      }, {
        value: '选项3',
        label: '加入班级公开'
      }, {
        value: '选项4',
        label: '私有'
      }],
      publicDegree: [],
      value1: ''

    }
  },
  methods: {},
  components: {}
}
</script>

<style scoped>

</style>
