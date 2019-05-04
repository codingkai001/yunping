<template>
  <Layout>
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="维度名称">
        <el-input placeholder="请输入维度名称" v-model="form.dimensionName"></el-input>
      </el-form-item>
      <el-form-item label="代号">
        <el-input placeholder="请输入代号" v-model="form.codeName"></el-input>
      </el-form-item>
      <el-form-item label="维度类别">
        <el-radio-group v-model="dimensionType">
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
import { dimensionAdd } from '../../../api/dimension'

export default {
  data () {
    return {
      loading: false,
      dimensionList: [],
      form: {
        dimensionName: '',
        codeName: ''
      },
      dimensionTypeOptions: [{
        value: '选项1',
        label: '工程能力'
      }, {
        value: '选项2',
        label: '选题报告得分'
      }, {
        value: '选项3',
        label: '现场答辩'
      }],
      dimensionType: []
    }
  },
  components: {
    Layout
  },
  mounted () {
    this.reloadList()
  },
  methods: {
  }
}
</script>

<style>

</style>
