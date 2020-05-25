import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import UserList from '../components/user/UserList.vue'
import UserEdit from '../components/user/UserEdit.vue'
import UserAdd from '../components/user/UserAdd.vue'

import ArticleList from '../components/article/ArticleList.vue'
import ArticleAdd from '../components/article/ArticleAdd.vue'
import ArticleEdit from '../components/article/ArticleEdit.vue'

import ArticleItemList from '../components/articleItem/ArticleItemList.vue'
import ArticleItemAdd from '../components/articleItem/ArticleItemAdd.vue'
import ArticleItemEdit from '../components/articleItem/ArticleItemEdit.vue'



Vue.use(VueRouter)

const router = new VueRouter({
      routes: [{
          path: '/',
          redirect: '/login'
        }, {
          path: '/login',
          component: Login
        }, {
          path: '/home',
          component: Home,
          redirect: '/welcome',
          children: [{
              path: '/welcome',
              component: Welcome
            }, {
              path: '/user/list',
              component: UserList
            }, {
              path: '/user/edit/:id',
              component: UserEdit
            }, {
              path: '/user/add',
              component: UserAdd
            }, {
              path: '/article/list',
              component: ArticleList
            }, {
              path: '/article/add',
              component: ArticleAdd,
            }, {
              path: '/article/edit/:id',
              component: ArticleEdit
            }, {
              path: '/article-item/list',
              component: ArticleItemList
            }, {
              path: '/article-item/add',
              component: ArticleItemAdd,
            }, {
              path: '/article-item/edit/:id',
              component: ArticleItemEdit
            }]
          }]
      })

    // 挂在路由导航

    router.beforeEach((to, from, next) => {
      if (to.path === '/login') return next()
      // 获取token
      const token = window.sessionStorage.getItem('token')
      if (!token) return next('/login')
      next()

    })

    export default router