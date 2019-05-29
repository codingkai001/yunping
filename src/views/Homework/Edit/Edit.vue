<template>
  <Layout>
    <el-form :rules="rules" ref="ruleForm" :model="form" label-width="180px" v-loading="loading">
      <el-form-item label="名称" prop="taskName">
        <el-input v-model="form.taskName" placeholder="作业名称"></el-input>
      </el-form-item>
      <el-form-item label="作业发布地址" prop="taskUrl">
        <el-input v-model="form.taskUrl" placeholder="例如在博客园的发布地址"></el-input>
      </el-form-item>
      <el-form-item label="截止时间" prop="taskOverAt">
        <el-date-picker v-model="form.taskOverAt" placeholder="选择日期时间" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="发布班级" prop="taskClass">
        <el-input v-model="form.taskClass" readonly></el-input>
<!--        <el-select v-model="form.taskClass" filterable placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in classList"-->
<!--            :key="item.classId"-->
<!--            :label="item.className"-->
<!--            :value="item.classId">-->
<!--          </el-option>-->
<!--        </el-select>-->
      </el-form-item>
      <el-form-item label="考察维度" prop="skillList">
        <el-select v-model="selectDimension" @change="onDimensionChange" filterable placeholder="请选择">
          <el-option
            v-for="item in dimensionList"
            :key="item.skillId"
            :label="item.skillName + '(' + item.skillShortName + ') / ' + item.skillType"
            :value="item">
          </el-option>
        </el-select>
        <div class="dimensions">
          <div :key="item.skillId" v-for="(item, index) in form.skillList" class="dimension">
            <span class="dimension-detail">
            {{item.dimension.skillName + '(' + item.dimension.skillShortName + ') / ' + item.dimension.skillType}}
            </span>
            <el-input-number size="small" v-model="item.score" @change="handleChange" :min="0" :max="100" label="分数"></el-input-number>
            <span class="dimension-action">
              <el-button size="small" @click="removeDimension(index)">删除</el-button>
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('ruleForm')" round type="primary">保存作业</el-button>
        <el-button @click="$router.back()" round>取消</el-button>
      </el-form-item>
    </el-form>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { dimensionSearch } from '../../../api/dimension'
import { classSearch } from '../../../api/class'
import { taskAdd, taskDetail } from '../../../api/task'

export default {
  data () {
    return {
      loading: false,
      dimensionList: [],
      classList: [],
      form: {
        taskClass: '',
        taskName: '',
        taskOverAt: new Date(),
        taskUrl: '',
        skillList: []
      },
      selectDimension: ''
    }
  },
  computed: {
    rules () {
      return {
        taskName: [
          { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
        ],
        taskUrl: [
          { required: true, message: '请输入博客园发布地址', trigger: ['blur', 'change'] }
        ],
        taskClass: [
          { required: true, message: '请选择班级', trigger: ['blur', 'change'] }
        ],
        taskOverAt: [
          { required: true, message: '请选择截止时间', trigger: ['blur', 'change'] }
        ],
        skillList: [
          { required: true, message: '请选择截止时间', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.loading = true
    Promise.all([
      dimensionSearch({}).then(p => {
        this.dimensionList = p.skillVOList
      }),
      classSearch().then(p => {
        this.classList = p.classVOList
      })
    ]).then(() => {
      this.loading = false
    })
    this.reloadTaskDetail()
  },
  methods: {
    async onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (!valid) return
        this.loading = true
        taskAdd(this.form).then(p => {
          this.$router.push({ path: '/homework/list' })
          this.loading = false
        })
      })
    },
    onDimensionChange (dimension) {
      this.form.skillList.push({
        skillId: dimension.skillId,
        dimension,
        skillNumber: 0
      })
      this.dimensionList = this.dimensionList.filter(d => d.skillId !== dimension.skillId)
      this.selectDimension = ''
    },
    removeDimension (index) {
      const dimension = this.form.skillList[index].dimension
      this.dimensionList.push(dimension)
      this.form.skillList.splice(index, 1)
    },
    reloadTaskDetail(){
      this.loading = true
      var href = location.href.split('/')
      var taskId = href[href.length-1]
      taskDetail(taskId).then(p=>{
        this.form.taskName = p.taskName
        this.form.taskClass = p.taskClass
        this.form.taskUrl = p.taskUrl
        this.form.skillList = p.skillList
        console.log(this.form)
        this.loading = false

      }).catch(e=>{
        this.$message.error('数据加载异常')
        console.log(e)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.dimensions {
  margin-top: 1em;
  .dimension {
    display: flex;
    align-items: center;
  }
  .dimension-detail {
    width: 10em;
  }
  .dimension-action {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
