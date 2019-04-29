<template>
    <div id="class-detail">
        <div class="class-information">
            <div :key="fit" class="block" style="float: left" v-for="fit in fits">
                <el-image
                    :fit="fit"
                    :src="url"
                    style="width: 100px; height: 100px"></el-image>
            </div>
            <div style="float: left;margin: 0 30px">
                <p>班级名称：{{className}}</p>
                <p>老师:{{teacher}}</p>
                <p>助教:{{assistant}}</p>
                <p>班级状态:{{classState}}</p>
            </div>
            <div style="float: left;margin: 0 30px">
                <p>学生邀请码：{{className}}</p>
                <p>助教邀请码:{{teacher}}</p>
                <p>
                    是否限制更新团队信息:
                    <el-radio label="1" v-model="radio">限制</el-radio>
                    <el-radio label="2" v-model="radio">不限制</el-radio>
                </p>
                <el-button round>结束班级</el-button>
                <el-button round>发布期末总分</el-button>
                <el-button round>重组团队</el-button>
            </div>
        </div>
        <div class="student-information">
            <el-table
                :data="tableData"
                height="250"
                style="width: 100%">
                <el-table-column
                    fixed
                    label="学生学号"
                    prop="date"
                    width="150">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="省份"
                    prop="province"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="市区"
                    prop="city"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="address"
                    width="300">
                </el-table-column>
                <el-table-column
                    label="邮编"
                    prop="zip"
                    width="120">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ClassDetail',
        data () {
            return {
                className: '2016级软件工程4班',
                teacher: '汪璟玢',
                assistant: '傅明建',
                classState: '学期中',
                fits: ['fill'],
                radio: '1',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        methods: {},
        components: {}
    }
</script>

<style scoped>
    /*新增style*/
    .class-information {
        position: absolute;
        top: 0;
        overflow: hidden;
        height: 30%;
        width: 100%;
    }

    .student-information {
        position: absolute;
        top: 40%;
        overflow: scroll;
        height: 60%;
        width: 100%;
    }
</style>
