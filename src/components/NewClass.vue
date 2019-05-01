<template>
    <div id="new-class">
        <el-form :model="class_form" ref="form">
            <el-input placeholder="班级名称" v-model="class_form.name"></el-input>
            <el-input placeholder="学校名称" v-model="class_form.school"></el-input>
            <el-input placeholder="学院名称" v-model="class_form.college"></el-input>
            <el-input placeholder="专业名称" v-model="class_form.major"></el-input>
            <el-input
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="班级公告"
                type="textarea"
                v-model="class_form.notice">
            </el-input>
            <div class="tags">
                <el-tag
                    :disable-transitions="false"
                    :key="tag"
                    @close="handleClose(tag)"
                    closable
                    v-for="tag in class_form.tags">
                    {{tag}}
                </el-tag>
                <el-input
                    @blur="handleInputConfirm"
                    @keyup.enter.native="handleInputConfirm"
                    class="input-new-tag"
                    ref="saveTagInput"
                    size="small"
                    v-if="class_form.inputVisible"
                    v-model="class_form.inputValue"
                >
                </el-input>
                <el-button @click="showInput" class="button-new-tag" size="small" v-else>+ New Tag</el-button>
            </div>
            <div class="confirm-button">
                <el-button round id="join">创建班级</el-button>
                <el-button round id="cancel">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'NewClass',
        data() {
            return {
                class_form: {
                    name: '',
                    school: '',
                    college: '',
                    major: '',
                    notice: '',
                    tags: ['姓名', '博客园地址', 'Github地址', '邮箱'],
                    inputVisible: false,
                    inputValue: ''
                }
            }
        },
        methods: {
            handleClose(tag) {
                this.class_form.tags.splice(this.class_form.tags.indexOf(tag), 1)
            },

            showInput() {
                this.class_form.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },

            handleInputConfirm() {
                let inputValue = this.class_form.inputValue;
                if (inputValue) {
                    this.class_form.tags.push(inputValue)
                }
                this.class_form.inputVisible = false;
                this.class_form.inputValue = '';
            },
        },
        components: {}
    }
</script>

<style>
    #new-class {
        width: 80%;
        margin: 20px auto;
    }

    #new-class .el-input__inner,
    #new-class .el-textarea__inner {
        width: 50%;
        height: 40px;
        border-radius: 18px;
        margin: 15px 25%;
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
        font-weight: 600;
        font-size: 17px;
    }

    #new-class .tags {
        width: 60%;
        margin: 15px 20%;
        border: 1px solid red;
    }

    #new-class .tags .el-tag,
    #new-class .tags .el-button {
        font-size: 18px;
        margin: 10px;
        color: white;
        border-radius: 10px;
        border: none;
        background-color: rgba(254, 140, 145, 0.8);
    }

    #new-class .tags .el-button {
        font-size: 15px;
        color: white;
        background-color: deepskyblue;
    }

    #new-class .tags .el-input__inner {
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
        /*font-weight: 600;*/
        font-size: 15px;
        width: auto;
    }

    #new-class .confirm-button {
        width: 50%;
        /*border: 1px solid red;*/
        margin: 20px auto;
    }

    #new-class .confirm-button .el-button {
        font-size: 20px;
        background-color: rgba(47, 198, 225, 0.8);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        /*border: 1px solid white;*/
        font-weight: 800;
        /*margin: 20px 19%;*/
    }

    #new-class .confirm-button #join {
        float: left;
    }

    #new-class .confirm-button #cancel {
        float: right;
    }

</style>
