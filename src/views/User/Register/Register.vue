<template>
    <div id="sign-up">
        <transition name="el-zoom-in-top">
            <div v-show="show" class="sign-container" v-loading="loading">
                <div class="top-button">
                    <el-button round id="in-button" @click="toLogin">登录</el-button>
                    <el-button round id="up-button">注册</el-button>
                </div>
                <div class="sign-up-form">
                    <el-form ref="form" :model="user">
                        <el-input v-model="user.userAccount" placeholder="学号/工号"></el-input>
                        <el-input v-model="user.userName" placeholder="真实姓名"></el-input>
                        <el-input v-model="user.userPass" placeholder="密码" type="password"></el-input>
                        <el-input v-model="user.userPassword2" placeholder="确认密码" type="password"></el-input>
                        <el-input v-model="user.userSchool" placeholder="学校"></el-input>
                        <el-radio-group v-model="user.userRole">
                          <el-radio-button :label="UserRole.teacher">教师</el-radio-button>
                          <el-radio-button :label="UserRole.student">学生</el-radio-button>
                        </el-radio-group>
                    </el-form>
                </div>
                <el-button type="info" round @click="register" html-type="submit" class="to-sign">注册</el-button>
            </div>
        </transition>
    </div>
</template>

<script>
import { register } from '../../../api/user'
import { UserRole } from '../../../models/User'

export default {
  name: 'SignUp',
  data () {
    return {
      show: false,
      user: {
        userAccount: '',
        userName: '',
        userPass: '',
        userPassword2: '',
        userSchool: '',
        userRole: 1
      },
      authenticated: false,
      loading: false,
      UserRole
    }
  },
  methods: {
    // 跳转到登录页面
    toLogin () {
      this.$router.push({ path: '/user/login' })
    },
    // 注册验证
    register () {
      if (this.user.userPass !== this.user.userPassword2) {
        return
      }
      this.loading = true
      register(this.user).then((res) => {
        console.log(res.data)
        this.loading = false
      }).catch(e => {
        this.$message.error(e.message)
        console.log(e)
        this.loading = false
      })
    }
  },

  mounted () {
    // 组件挂载后过渡动画载入登录注册框
    this.show = true
  }
}
</script>

<style>
    #sign-up {
        position: absolute;
        background: url("../../../assets/img/FZULibrary.jpg") no-repeat;
        background-attachment: fixed;
        background-size: 100%;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    #sign-up .sign-container {
        width: 20%;
        margin: 15% auto 10% auto;
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

    #sign-up .sign-up-form {
        padding: 20px;
    }

    #sign-up .el-input .el-input__inner {
        border-radius: 18px;
        width: 70%;
        margin: 5px 15%;
        background-color: rgba(255, 255, 255, 0.7);
        color: rgb(117, 121, 125);
        font-weight: 600;
        font-size: 17px;
    }

    #sign-up .to-sign {
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
