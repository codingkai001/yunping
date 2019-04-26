<template>
    <div id="sign-in">
        <el-form class="sign-container" ref="form" :model="user" label-width="70px">
            <el-row>
                <el-button type="success" round="">登录</el-button>
                <el-button type="info" round="">注册</el-button>
            </el-row>
            <el-form-item label="账号">
                <el-input v-model="user.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.pwd"></el-input>
            </el-form-item>
            <el-button type="success" round>登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'sign_in',
        data () {
            return {
                user: {
                    account: '',
                    pwd: ''
                }
            }
        },
        methods: {}

    }
</script>

<style>
    @import "../assets/css/sign.css";

</style>
