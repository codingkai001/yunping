<template>
    <div id="sign-up">
        <transition name="el-zoom-in-top">
            <div v-show="show" class="sign-container">
                <div class="top-button">
                    <el-button round id="in-button" @click="to_sign_in">登录</el-button>
                    <el-button round id="up-button" @click="to_sign_up">注册</el-button>
                </div>
                <div class="sign-up-form">
                    <el-form ref="form" :model="reg_stu">
                        <el-input v-model="reg_stu.user_account" placeholder="学号"></el-input>
                        <el-input v-model="reg_stu.username" placeholder="姓名"></el-input>
                        <el-input v-model="reg_stu.pwd1" placeholder="密码" type="password"></el-input>
                        <el-input v-model="reg_stu.pwd2" placeholder="确认密码" type="password"></el-input>
                        <el-input v-model="reg_stu.user_school" placeholder="学校"></el-input>
                    </el-form>
                </div>
                <el-button type="info" round @click="sign_up" class="to-sign">注册</el-button>
            </div>
        </transition>
    </div>
</template>


<script>

    export default {
        name: 'SignUp',
        data() {
            return {
                show: false,
                reg_stu: {
                    user_account: '',
                    username: '',
                    pwd1: '',
                    pwd2: '',
                    user_school: '',
                    user_role: 1
                },
                authenticated: false
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
            //注册字段验证
            auth_params() {
                if (this.reg_stu.pwd1 === this.reg_stu.pwd2) {
                    this.authenticated = true;
                } else {
                    this.authenticated = false;
                }
            },
            //注册验证
            sign_up() {
                this.auth_params();
                if (this.authenticated) {
                    axios.post('/user/register', {
                        "userAccount": this.reg_stu.user_account,
                        "userName": this.reg_stu.username,
                        "userPass": this.reg_stu.pwd1,
                        "userRole": this.reg_stu.user_role,
                        "userSchool": this.reg_stu.user_school
                    }).then(function (response) {
                        var res_body = response['data'];
                        console.log(res_body.data);
                    }).catch(function (error) {
                        console.log(error);
                        alert("服务异常，请稍后重试！");
                    });
                } else {
                    alert("注册信息有误！");
                }
            }
        },

        mounted() {
            //组件挂载后过渡动画载入登录注册框
            this.show = true;
        }
    }
</script>

<style>
    #sign-up {
        position: absolute;
        background: url("../assets/img/FZULibrary.jpg") no-repeat;
        background-attachment: fixed;
        background-size: 100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #sign-up .sign-container {
        width: 20%;
        height: 42%;
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

    #sign-up #in-button {
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
    }

    #sign-up #up-button {
        background-color: rgba(106, 216, 216, 0.9);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .sign-up-form {
        padding: 20px;
    }

    #sign-up .el-input .el-input__inner {
        border-radius: 18px;
        width: 80%;
        margin: 5px 10%;
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
        font-weight: 600;
        font-size: 17px;
    }

    #sign-up .to-sign {
        width: 30%;
        margin: 0 35%;
        height: 40px;
        font-size: 20px;
        line-height: 16px;
        font-weight: 800;
        background-color: rgba(106, 216, 216, 0.9);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border: 1px solid white;
    }
</style>
