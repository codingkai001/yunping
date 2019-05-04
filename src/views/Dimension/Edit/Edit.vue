<template>
  <Layout>
    <el-form :model="form" label-width="80px" ref="form" v-loading="loading">
      <el-form-item label="维度名称">
        <el-input placeholder="请输入维度名称" v-model="form.skillName"></el-input>
      </el-form-item>
      <el-form-item label="代号">
        <el-input placeholder="请输入代号" v-model="form.skillShortName"></el-input>
      </el-form-item>
      <el-form-item label="维度类别">
        <el-radio-group v-model="form.skillType">
          <el-radio :key="item.value" :label="item.label" :value="item.value" v-for="item in dimensionTypeOptions">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" round type="primary">保存维度</el-button>
        <el-button round>取消</el-button>
      </el-form-item>
    </el-form>
  </Layout>
</template>

<script>
import Layout from '../../../components/Layout'
import { dimensionAdd, dimensionDetail, dimensionUpdate } from '../../../api/dimension'

export default {
  data () {
    return {
      loading: false,
      dimensionList: [],
      form: {
        skillName: '',
        skillShortName: '',
        skillType: '工程能力'
      },
      dimensionTypeOptions: [{
        value: '工程能力',
        label: '工程能力'
      }, {
        value: '选题报告',
        label: '选题报告'
      }, {
        value: '现场答辩',
        label: '现场答辩'
      }]
    }
  },
  components: {
    Layout
  },
  mounted () {
    const id = this.$route.params.id
    if (id !== '0') {
      this.loading = true
      dimensionDetail(id).then(p => {
        this.form = p
        this.loading = false
      })
    }
  },
  methods: {
    async onSubmit () {
      const id = this.$route.params.id
      this.loading = true
      try {
        if (id !== '0') {
          await dimensionUpdate(this.form)
        } else {
          await dimensionAdd(this.form)
        }
        this.loading = false
        this.$router.push({ path: '/dimension/list' })
      } catch (e) {
        this.loading = false
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style>

</style>
