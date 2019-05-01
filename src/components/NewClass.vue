<template>
    <div id="new-class">
        <el-form :model="form" label-width="80px" ref="form">
            <el-form-item label="班级名称">
                <el-input placeholder="请输入班级名称" v-model="form.className"></el-input>
            </el-form-item>
            <el-form-item label="学校名称">
                <el-input placeholder="请输入学校名称" v-model="form.schoolName"></el-input>
            </el-form-item>
            <el-form-item label="学院名称">
                <el-input placeholder="请输入学院名称" v-model="form.collegeName"></el-input>
            </el-form-item>
            <el-form-item label="专业名称">
                <el-input placeholder="请输入专业名称" v-model="form.majorName"></el-input>
            </el-form-item>

            <el-form-item label="班级公告">
                <el-input
                    :autosize="{ minRows: 2, maxRows: 8}"
                    placeholder="请输入班级公告内容"
                    type="textarea"
                    v-model="form.classBulletin">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-tag
                    :disable-transitions="false"
                    :key="tag"
                    @close="handleClose(tag)"
                    closable
                    v-for="tag in form.dynamicTags">
                    {{tag}}
                </el-tag>
                <el-input
                    @blur="handleInputConfirm"
                    @keyup.enter.native="handleInputConfirm"
                    class="input-new-tag"
                    ref="saveTagInput"
                    size="small"
                    v-if="form.inputVisible"
                    v-model="form.inputValue"
                >
                </el-input>
                <el-button @click="showInput" class="button-new-tag" size="small" v-else>+ New Tag</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" round type="primary">创建班级</el-button>
                <el-button round>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'NewClass',
        data () {
            return {
                form: {
                    className: '',
                    schoolName: '',
                    collegeName: '',
                    majorName: '',
                    classBulletin: '',
                    dynamicTags: ['学号', '姓名', '博客园地址', 'Github地址', '邮箱'],
                    inputVisible: false,
                    inputValue: ''
                }
            }
        },
        methods: {
            handleClose (tag) {
                this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1)
            },

            showInput () {
                // console.log();
                this.form.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },

            handleInputConfirm () {
                let inputValue = this.form.inputValue
                if (inputValue) {
                    this.form.dynamicTags.push(inputValue)
                }
                this.form.inputVisible = false;
                this.form.inputValue = ''
            },
            onSubmit() {
                alert(this.form.dynamicTags);
            }
        },
        components: {}
    }
</script>

<style scoped>
    /*新增style*/
    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
