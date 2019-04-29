<template>
    <div id="class-list">
        <div class="class-blog-post-image">
            <div :key="fit" class="block" v-for="fit in fits">
                <el-image
                    :fit="fit"
                    :src="url">
                </el-image>
            </div>
        </div>
        <div class="class-card">
            <el-row>
                <el-col :key="o" :offset="index > 0 ? 4 : 0" :span="800" v-for="(o, index) in 4">
                    <el-card :body-style="{ padding: '0px' }">
                        <img class="image"
                             src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556548808648&di=69d5a39b86fe732c7d5cb8cbd5b627d1&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F05%2F20%2F8431f8a6a4e8c05b5b16f68106804ea3.jpg">
                        <div style="padding: 14px;">
                            <span>{{className}}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ClassList',
        data () {
            return {
                fits: ['contain'],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                className: '2016级软件工程四班（福州大学）'
            }
        },
        methods: {},
        components: {}
    }
</script>

<style scoped>
    /*新增style*/
    .class-blog-post-image {
        position: absolute;
        top: 0;
        overflow: hidden;
        height: 30%;
        width: 100%;
    }

    .class-card {
        position: absolute;
        top: 40%;
        overflow: scroll;
        height: 60%;
        width: 100%;
    }

    /*.image {*/
    /*    width: 100%;*/
    /*    display: block;*/
    /*}*/
</style>
