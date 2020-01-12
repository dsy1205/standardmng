import Vue from 'vue'
import Router from 'vue-router'

// const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
import Home from './components/Home.vue'
 //const Manage = () => import( './components/Manage.vue')
//登入成功展示首页
import Index from './components/Index.vue'
// const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')

import AutoPass from './components/promitIn/AutoPass.vue'
// const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/user/Users.vue')
import CodeQuality from './components/promitIn/CodeQuality.vue'
// const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Rights.vue')
import InThreshold from './components/promitIn/InThreshold.vue'
// const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Roles.vue')

import BugFix from './components/promitOut/BugFix.vue'
// const Cate = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Cate.vue')
import CaseCover from './components/promitOut/CaseCover.vue'
// const Params = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Params.vue')
import OutThreshold from './components/promitOut/OutThreshold.vue'

// const GoodsList = () => import(/* webpackChunkName: "GoodsList_Add" */ './components/goods/List.vue')
import DelayMail from './components/mails/DelayMail.vue'
// const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ './components/goods/Add.vue')
import RejectMail from './components/mails/RejectMail.vue'
import DeployMail from './components/mails/DeployMail.vue'
import ScheduleMail from './components/mails/ScheduleMail.vue'

import Roles from './components/power/Roles.vue'
import Rights from './components/power/Rights.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Index },
    {
      path: '/home',
      component: Home,
      redirect: '/index',
      children: [
        { path: '/index', component: Index },
        { path: '/autopass', component: AutoPass },
        { path: '/codequality', component: CodeQuality },
        { path: '/inthreshold', component: InThreshold },
        { path: '/bugfix', component: BugFix },
        { path: '/casecover', component: CaseCover },
        { path: '/outthreshold', component: OutThreshold },
        { path: '/delaymail', component: DelayMail },
        { path: '/rejectmail', component: RejectMail },
        { path: '/deploymail', component: DeployMail },
        { path: '/schedulemail', component: ScheduleMail },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //if (!tokenStr) return next('/login')
  next()
})

export default router
