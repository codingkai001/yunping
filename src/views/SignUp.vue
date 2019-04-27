<template>
	<div id="sign-up">
		<el-form class="sign-container" ref="form" v-bind:model="user" label-width="100px">
			<el-row>
				<el-button type="info" round v-on:click="to_sign_in">登录</el-button>
				<el-button type="success" round>注册</el-button>
			</el-row>
			<el-form-item label="账号">
				<el-input v-model="user.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="user.pwd1" type="password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码">
				<el-input v-model="user.pwd2" type="password"></el-input>
			</el-form-item>
			<el-button type="success" round v-on:click="sign_up">注册</el-button>
		</el-form>
	</div>
</template>


<script>
	// import '../assets/js/main.js'

	export default {
		name: 'SignUp',
		data () {
			return {
				user: {
					username: '',
					pwd1: '',
					pwd2: ''
				}
			}
		},
		methods: {
			//跳转到登录页面
			to_sign_in () {
				this.$router.push({ path: '/sign_in', })
			},
			//注册验证
			sign_up () {
				alert(this.user.username)
				alert(this.user.pwd1)
			}
		}
	}
</script>

<style scoped>
	@import "../assets/css/sign.css";

</style>
