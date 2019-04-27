<template>
	<div id="sign-in">
		<el-form class="sign-container" ref="form" :model="user" label-width="100px">
			<el-row>
				<el-button type="success" round>登录</el-button>
				<el-button type="info" round v-on:click="to_sign_up">注册</el-button>
			</el-row>
			<el-form-item label="账号">
				<el-input v-model="user.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="user.pwd" type="password"></el-input>
			</el-form-item>
			<el-button type="success" round v-on:click="sign_in">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'SignIn',
		data () {
			return {
				user: {
					username: '',
					pwd: ''
				}
			}
		},
		methods: {
			//跳转到注册页面
			to_sign_up () {
				this.$router.push({ path: '/sign_up', })
			},
			//登录验证
			sign_in () {
				alert(this.user.username)
				alert(this.user.pwd)
			}
		}

	}
</script>

<style scoped>
	@import "../assets/css/sign.css";

</style>
