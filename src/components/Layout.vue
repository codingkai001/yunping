<template>
<el-container style="border: 1px solid #eee">

  <el-header>
    <div class="navbar">
      <span class="logo">云评</span>
      <span class="user-info">
        <span>欢迎，{{user.userName}}</span>
        <span class="actions">
            <el-link type="primary">注销</el-link>
        </span>
      </span>
    </div>
  </el-header>

  <el-container class="main-container">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="[]" v-if="user.userRole === 0">
        <el-menu-item index="class-management">班级管理</el-menu-item>
        <el-menu-item index="rank-dimension">评分维度管理</el-menu-item>
      </el-menu>
      <el-menu :default-openeds="[]" v-if="user.userRole === 1">
        <el-menu-item index="class-management">班级管理</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <slot></slot>
    </el-main>

  </el-container>
</el-container>

</template>
<script>
import UserStore from '../store/user'
export default {
  computed: {
    user: () => UserStore.state.user
  }
}
</script>
<style lang="less" scoped>
.el-header {
    background: rgb(238, 241, 246);
    width: 100%;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .logo {
        float: left;
        font-size: 24px;
        vertical-align: middle;
        margin-top: 12px;
    }
    .user-info  {
        float: right;

        .actions {
            margin-left: 1em;
        }
    }
}
.main-container {
    min-height: calc(100vh - 4em);
}
.el-menu {
    background: inherit;
}
</style>
