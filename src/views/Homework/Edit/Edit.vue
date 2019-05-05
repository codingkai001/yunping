<template>
  <Layout>
    <el-form :model="form" label-width="180px" ref="form" v-loading="loading">
      <el-form-item label="名称">
        <el-input placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="作业发布地址">
        <el-input placeholder="例如在博客园的发布地址"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker placeholder="选择日期时间" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item label="发布班级">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in classList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考察维度">
        <el-select v-model="selectDimension" @change="onDimensionChange" filterable placeholder="请选择">
          <el-option
            v-for="item in dimensionList"
            :key="item.skillId"
            :label="item.skillName + '(' + item.skillShortName + ') / ' + item.skillType"
            :value="item">
          </el-option>
        </el-select>
        <div class="dimensions">
          <div :key="item.skillId" v-for="(item, index) in form.dimensions" class="dimension">
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
        <el-button @click="onSubmit" round type="primary">保存作业</el-button>
        <el-button @click="$router.back()" round>取消</el-button>
      </el-form-item>
    </el-form>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { dimensionSearch } from '../../../api/dimension'
import { classSearch } from '../../../api/class'

export default {
  data () {
    return {
      loading: false,
      dimensionList: [],
      classList: [],
      form: {
        dimensions: []
      },
      selectDimension: ''
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
  },
  methods: {
    async onSubmit () {
    },
    onDimensionChange (dimension) {
      this.form.dimensions.push({
        skillId: dimension.skillId,
        dimension,
        score: 0
      })
      this.dimensionList = this.dimensionList.filter(d => d.skillId !== dimension.skillId)
      this.selectDimension = ''
    },
    removeDimension (index) {
      const dimension = this.form.dimensions[index].dimension
      this.dimensionList.push(dimension)
      this.form.dimensions.splice(index, 1)
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
