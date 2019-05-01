<template>
    <div id="new-dimension">
        <el-form :model="form" label-width="80px" ref="form">
            <el-form-item label="维度名称">
                <el-input placeholder="请输入维度名称" v-model="form.dimensionName"></el-input>
            </el-form-item>
            <el-form-item label="代号">
                <el-input placeholder="请输入代号" v-model="form.codeName"></el-input>
            </el-form-item>
            <el-form-item label="维度类别">
                <el-select multiple placeholder="请选择维度类别" v-model="dimensionType">
                    <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in dimensionTypeOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" round type="primary">保存维度</el-button>
                <el-button round>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'NewDimension',
        data () {
            return {
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
                dimensionType: [],
            }
        },
        methods: {},
        components: {}
    }
</script>

<style scoped>

</style>
