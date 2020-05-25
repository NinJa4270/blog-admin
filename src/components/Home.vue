<template>
  <el-container class="page">
    <!-- 头部开始 -->
    <el-header class="back-color2 flex a-c j-s" style="height:100px;">
      <div>
        <span style="font-size:30px;">博客后台管理系统</span>
      </div>
      <div class="flex j-s" style="width:240px">
        <h3>欢迎您:{{username}}</h3>
        <el-button size="mini" type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 头部结束 -->
    <!-- 侧边栏开始 -->
    <el-container>
      <el-aside width="200px" class="back-color1">
        <el-menu
          background-color="#0984e3"
          text-color="#fff"
          active-text-color="#ffb86c"
          unique-opened
          style="border-right:none;"
          router
          :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.font" style="color:#fff"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="item1.path" v-for="item1 in item.children" :key="item1.id">
              <template slot="title">
                <i :class="item1.font" style="color:#fff"></i>
                <span>{{item1.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边栏结束 -->
      <!-- 主体开始 -->
      <el-main >
        <router-view></router-view>
      </el-main>
      <!-- 主体结束 -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      menuList: [
        {
          id: 101,
          name: "文章管理",
          font: "el-icon-folder",
          children: [
            {
              id: 1001,
              path: "/article/list",
              font: "el-icon-tickets",
              name: "文章列表"
            },
            {
              id: 1003,
              path: "/article/add",
              font: "el-icon-circle-plus",
              name: "文章新建"
            }
          ]
        },
        {
          id: 201,
          name: "章节管理",
          font: "el-icon-menu",
          children: [
            {
              id: 2001,
              path: "/article-item/list",
              font: "el-icon-tickets",
              name: "章节列表"
            },
            {
              id: 2003,
              path: "/article-item/add",
              font: "el-icon-circle-plus",
              name: "章节新建"
            }
          ]
        },
        {
          id: 302,
          name: "用户管理",
          font: "el-icon-user",
          children: [
            {
              id: 3001,
              path: "/user/list",
              font: "el-icon-tickets",
              name: "用户列表"
            },
            {
              id: 3003,
              path: "/user/add",
              font: "el-icon-circle-plus",
              name: "用户新建"
            }
          ]
        },
        {
          id: 403,
          name: "数据管理",
          font: "el-icon-pie-chart",
          children: [
            {
              id: 4001,
              path: "/information/view",
              font: "el-icon-reading",
              name: "数据统计"
            },
            {
              id: 4002,
              path: "/information/list",
              font: "el-icon-data-line",
              name: "数据列表"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.username = sessionStorage.getItem('username');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }

  }
};
</script>

<style>
</style>