//路由配置文件
import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/views/index"
import Login from "@/views/login"
import Register from "@/views/register"
import Unfinded from "@/views/404"
import Home from "../components/Home"
import InfoShow from "../components/InfoShow"
import FundList from "../components/FundList"

import { Message} from 'element-ui';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      component: Index,
      children:[
        {
          path:'/',
          redirect:'/home'
        },
        {
          path: '/home',
          name:'home',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/fundlist',
          name: 'fundlist',
          component: FundList
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'unfinded',
      component: Unfinded
    }
  ]
})
//配置路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken ? true : false;
  //如果路径是登录或者注册，可以正常跳转
  if (to.path =='/login' || to.path== '/register' || to.name=='unfinded') {
    next();
  } else {
    if(isLogin)
    next()
    else {
      next('/login');
      Message.error("请先登录");
    }
  }
})
export default router;
