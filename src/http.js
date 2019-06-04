import axios from 'axios';
import router from './router';
import { Message, Loading } from 'element-ui';

//定义加载动画和结束
let loading;
function startLoading(){
  loading = Loading.service({
    lock:true,
    text:"拼命加载中",
    background:'rgba(0,0,0,0,7)'
  })
} 
function endLoading(){
  loading.close();
} 
//请求拦截
axios.interceptors.request.use(config => {
  startLoading();
  //console.log(config.data);
  //判断token是否存在,设置请求头
  if(localStorage.eleToken){
    config.headers.Authorization = localStorage.eleToken;
  }
  return config;
},error =>{
  return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(response =>{
  endLoading();
  return response;
},error =>{
  //错误提醒
  endLoading();
  Message.error(error.response.data);
  //获取错误状态码
  const { status } = error.response;
  if(status == 401){
    Message.error("登录信息已过期，请重新登录");
    localStorage.removeItem('eleToken');
    //进行路由跳转
    router.push('/login');
  }
  return Promise.reject(error);
})


export default axios;