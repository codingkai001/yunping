<template>
    <div id="sign-in">
        <transition name="el-zoom-in-top">
            <div v-show="show" class="sign-container">
                <div class="top-button">
                    <el-button round id="in-button" @click="to_sign_in">登录</el-button>
                    <el-button round id="up-button" @click="to_sign_up">注册</el-button>
                </div>
                <div class="sign-in-form">
                    <el-form ref="form" :model="user">
                        <el-input v-model="user.user_account" placeholder="用户名"></el-input>
                        <el-input v-model="user.pwd" placeholder="密码" type="password"></el-input>
                    </el-form>
                </div>
                <el-button type="info" round @click="sign_in" class="to-sign">登录</el-button>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'SignIn',
        data() {
            return {
                show: false,
                user: {
                    user_account: '',
                    pwd: ''
                }
            }
        },
        methods: {
            //跳转到登录页面
            to_sign_in() {
                this.$router.push({path: '/sign_in',})
            },
            //跳转到注册页面
            to_sign_up() {
                this.$router.push({path: '/sign_up',})
            },
            //登录验证
            sign_in() {
                axios.post('/user/login', {
                    "userAccount": this.user.user_account,
                    "userPass": this.user.pwd
                }).then(function (response) {
                    var res_body = response['data'];
                    console.log(res_body.data);
                }).catch(function (error) {
                    console.log(error);
                    alert("服务异常，请稍后重试！");
                });
            }
        },
        mounted() {
            //组件挂载后过渡动画载入登录注册框
            this.show = true;
        }

    }
</script>

<style>
    #sign-in {
        position: absolute;
        background: url("../assets/img/FZULibrary.jpg") no-repeat;
        background-attachment: fixed;
        background-size: 100%;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    #sign-in .sign-container {
        width: 20%;
        margin: 15% auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.6);
    }

    .top-button {
        width: 80%;
        margin: 0 10%;
    }

    #in-button, #up-button {
        width: 40%;
        margin: 5%;
        height: 46px;
        font-size: 22px;
        font-weight: 900;
    }

    #sign-in #in-button {
        background-color: rgba(106, 216, 216, 0.9);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    #sign-in #up-button {
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
    }

    #sign-in .sign-in-form {
        padding: 20px;
    }

    #sign-in .el-input .el-input__inner {
        border-radius: 18px;
        width: 70%;
        margin: 20px 15%;
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
        font-weight: 600;
        font-size: 17px;
    }

    #sign-in .to-sign {
        width: 30%;
        margin: 0 35%;
        font-size: 20px;
        font-weight: 800;
        background-color: rgba(106, 216, 216, 0.9);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border: 1px solid white;
    }
</style>
