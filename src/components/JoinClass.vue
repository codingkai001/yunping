<template>
    <div id="join-class">
        <el-form :model="class_params" ref="form">
            <el-input placeholder="班级Token" v-model="class_params.token"></el-input>
            <div class="extra-info">
                <span>请填写下列信息</span>
                <el-input placeholder="姓名" v-model="class_params.name"></el-input>
                <el-input placeholder="博客园地址" v-model="class_params.blog_address"></el-input>
                <el-input placeholder="Github地址" v-model="class_params.github_address"></el-input>
                <el-input placeholder="邮箱地址" v-model="class_params.email"></el-input>
            </div>
            <div class="confirm-button">
                <el-button round id="join">加入班级</el-button>
                <el-button round id="cancel">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'JoinClass',
        data() {
            return {
                class_params: {
                    token: '',
                    name: '',
                    blog_address: '',
                    github_address: '',
                    email: ''
                },

            }
        },
        methods: {},
        components: {}
    }
</script>

<style>
    #join-class {
        /*border: 1px solid red;*/
        /*padding: 20px;*/
        width: 80%;
        margin: 20px auto;
    }

    #join-class .extra-info span {
        display: block;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
    }

    #join-class .el-input__inner {
        width: 60%;
        height: 40px;
        border-radius: 18px;
        margin: 20px 20%;
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
        font-weight: 600;
        font-size: 17px;
    }

    #join-class .confirm-button {
        width: 50%;
        /*border: 1px solid red;*/
        margin: 20px auto;
    }

    #join-class .confirm-button .el-button {
        font-size: 20px;
        background-color: rgba(47, 198, 225, 0.8);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        /*border: 1px solid white;*/
        font-weight: 800;
        /*margin: 20px 19%;*/
    }

    #join-class .confirm-button #join {
        float: left;
    }

    #join-class .confirm-button #cancel {
        float: right;
    }
</style>
