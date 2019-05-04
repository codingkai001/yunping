<template>
    <div id="class-detail">
        <div class="class-information">
            <div class="profile">
                <div class="image">
                    <el-image :src="url"></el-image>
                </div>
                <div class="info">
                    <p style="font-weight: 600;text-align: center;">班级名称：{{className}}</p>
                    <span>老师：{{teacher}}</span>
                    <span>助教：{{assistant}}</span>
                    <!--                    <span>班级状态:{{classState}}</span>-->
                    <p>学生邀请码：ejokkiokijfejfonefhohe</p>
                    <p>助教邀请码：fiehfohehgihgirinhvhvh</p>
                    <p style="font-weight: 600;">
                        是否限制更新团队信息:
                        <el-radio label="1" v-model="radio">限制</el-radio>
                        <el-radio label="2" v-model="radio">不限制</el-radio>
                    </p>
                </div>
            </div>
            <div class="operate-button">
                <el-button round>结束班级</el-button>
                <el-button round>发布期末总分</el-button>
                <el-button round>重组团队</el-button>
            </div>
        </div>
        <div class="student-information">
            <el-table :data="tableData" stripe>
                <el-table-column label="学生学号" prop="date"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="省份" prop="province"></el-table-column>
                <el-table-column label="市区" prop="city"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="邮编" prop="zip"></el-table-column>
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

<style>
    #class-detail {
        width: 85%;
        margin: 20px auto;
        /*border: 1px solid red;*/
    }

    #class-detail .class-information {
        margin: 20px 10px;
        /*border: 1px solid red;*/
    }

    #class-detail .class-information .profile {
        width: 90%;
        margin: 0 auto;
    }

    #class-detail .class-information .profile .image {
        width: 25%;
        border: 1px solid red;
        margin-top: 50px;
        float: left;
    }

    #class-detail .class-information .profile .info {
        width: 70%;
        /*border: 1px solid red;*/
        float: right;
    }

    #class-detail .class-information .profile .info > span {
        display: inline-block;
        width: 50%;
        font-size: 20px;
    }

    #class-detail .class-information .profile .info > p {
        font-size: 20px;
    }

    #class-detail .class-information .operate-button {
        clear: both;
        width: 50%;
        float: right;
        margin: 20px;
    }

    #class-detail .student-information {

    }

    #class-detail .student-information .el-table {
        border-radius: 15px;
        /*background-color: rgba(255, 255, 255, 0.7);*/
    }
</style>
