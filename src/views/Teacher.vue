<template>
	<div id="teacher">
		<el-container id="all-panel">
			<el-aside>
				<div></div>
				<el-menu>
					<el-menu-item index="1">
						<i class="el-icon-s-home"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">题库</span>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-folder-add"></i>
						<span slot="title">新建作业</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-folder"></i>
						<span slot="title">查看作业</span>
					</el-menu-item>
					<el-menu-item index="5">
						<i class="el-icon-edit-outline"></i>
						<span slot="title">作业评分</span>
					</el-menu-item>
					<el-menu-item index="6">
						<i class="el-icon-circle-plus"></i>
						<span slot="title">新建班级</span>
					</el-menu-item>

				</el-menu>
			</el-aside>
			<el-header>
				<h2>云评-高校学生成绩综合评估级可视化分析平台</h2>
				<i class="el-icon-s-home"></i>
				<span>{{name}}</span>
			</el-header>
			<el-container id="main-box">
				<el-main>
					<el-table :data="tableData">
						<el-table-column prop="date" label="日期" width="140">
						</el-table-column>
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址">
						</el-table-column>
					</el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>


	export default {
		name: 'Teacher',
		data () {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
            };
			return {
				tableData: Array(15).fill(item),
				name: '汪老师'
			}
		},
		components: {

		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	#teacher {

        /*background: url("../assets/img/bgd1.jpg") no-repeat;*/
        /*background-attachment: fixed;*/
        /*background-size: 100%;*/
        /*background-color: white;*/
	}

	#teacher, #all-panel {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	#all-panel {
        /*opacity: 0.9;*/
	}

	#all-panel > .el-aside {
		position: fixed;
		width: 12% !important;
		height: 93%;
		top: 7%;
		background-color: white;
		color: #333;
		font-weight: 600;
		/*overflow: scroll;*/
	}

	#main-box {
		position: fixed;
		width: 88%;
		right: 0;
		height: 93%;
		top: 7%;
		background-color: white;
	}

	.el-header {
		font-size: 15px;
		position: fixed;
		background-color: white;
		width: 100%;
		right: 0;
		color: #333;
		height: 7% !important;
	}

	.el-header > h2 {
		text-align: center;
		font-size: 25px;
		line-height: 60px;
	}

	.el-header > span {
		position: absolute;
		text-align: right;
	}

	#main-box > .el-main {
		padding: 0;
	}

</style>
