<template>
	<div id="teacher">
        <div class="top-info">
            <h1>云评-高校学生成绩综合评估及可视化分析平台</h1>
            <!--            <span>{{name}}</span>-->
        </div>
        <div class="menu-content">
            <div class="side-menu">
                <div class="menu-item">云班级</div>
                <div class="menu-item">云团队</div>
                <div class="menu-item">云作业</div>
            </div>
            <div class="content">
                <!--                <class-list></class-list>-->
                <!--                                <new-homework></new-homework>-->
                <new-class></new-class>
                <!--                                <class-detail></class-detail>-->
                <!--                <join-class></join-class>-->
            </div>
        </div>
	</div>
</template>

<script>
    import ClassList from '../components/ClassList';
    import NewHomework from '../components/NewHomework';
    import NewClass from '../components/NewClass';
    import JoinClass from '../components/JoinClass';
    import ClassDetail from '../components/ClassDetail';


	export default {
		name: 'Teacher',
		data () {
			return {
                name: '汪老师'
			}
		},
		components: {
            'class-list': ClassList,
            'new-homework': NewHomework,
            'new-class': NewClass,
            'join-class': JoinClass,
            'class-detail': ClassDetail,
		}
	}
</script>

<style>
    #teacher {
        position: absolute;
        background: url("../assets/img/FZULibrary.jpg") no-repeat;
        background-attachment: fixed;
        background-size: 100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #teacher .top-info {
        width: 70%;
        /*height: 10%;*/
        padding: 5px;
        margin: 50px auto;
        /*border: 1px solid red;*/
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: rgba(106, 216, 216, 0.5);
        border-radius: 20px;

    }

    #teacher .top-info h1 {
        color: rgb(35, 40, 44);
        /*padding-left: 50px;*/
        font-size: 35px;
        text-align: center;
    }

    /*#teacher .top-info span{*/
    /*    float: right;*/
    /*    display: inline-block;*/
    /*}*/


    #teacher .menu-content {
        width: 80%;
        height: 70%;
        margin: 50px auto;
        /*border: 1px solid red;*/
    }

    #teacher .menu-content .side-menu {
        float: left;
        margin: 2%;
        width: 15%;
        height: 90%;
        /*border: 1px solid red;*/
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
    }

    #teacher .menu-content .side-menu .menu-item {
        float: top;
        width: 60%;
        margin: 20px auto;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: rgba(106, 216, 216, 0.9);
        border-radius: 20px;
        color: white;
        font-size: 25px;
        font-weight: 800;
        text-align: center;
        /*line-height: 20px;*/
    }

    #teacher .menu-content .content {
        float: left;
        margin: 2%;
        width: 75%;
        height: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
        overflow: auto;
        /*border: 1px solid red;*/
        /*padding: 50px;*/
    }
</style>
