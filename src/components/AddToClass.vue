<template>
    <div id="teacher">
        <el-form :model="form" label-width="80px" ref="form">
            <el-form-item label="作业名称">
                <el-input placeholder="请输入作业名称" v-model="homeworkName"></el-input>
            </el-form-item>
            <div>
                <span>填写信息</span>
                <el-form-item label="学号">
                    <el-input placeholder="请输入学号" v-model="studentNumber"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input placeholder="请输入姓名" v-model="studentName"></el-input>
                </el-form-item>
                <el-form-item label="博客园地址">
                    <el-input placeholder="请输入博客园地址" v-model="cnblogsAddress"></el-input>
                </el-form-item>
                <el-form-item label="Github地址">
                    <el-input placeholder="请输入Github地址" v-model="githubAddress"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input placeholder="请输入邮箱地址" v-model="emailAddress"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button round type="primary">加入班级</el-button>
                <el-button round type="primary">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'AddToClass',
        data () {
            return {
                homeworkName: '',
                studentNumber: '',
                studentName: '',
                cnblogsAddress: '',
                githubAddress: '',
                emailAddress: ''
            }
        },
        methods: {},
        components: {}
    }
</script>

<style scoped>

</style>
