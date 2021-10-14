import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import leftNav from "./components/AdminPage/leftNav";
import axios from 'axios';
import App from './App.vue'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import routes from "./routes.js";
import {drag} from './components/Js/drag';
import store from "./store.js";

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.component("leftNav",leftNav)
Vue.use(VueAxios,axios)
Vue.use(Vuex)

//默认头部文件类型
axios.defaults.headers.post['Content-Type'] = 'application/json'
//默认路径
axios.defaults.baseURL = 'http://localhost:8090'
//默认超时范围
axios.defaults.timeout = 5000

//判断字符串是否为空
Vue.prototype.$strIsNull = function (str){
  return typeof str === 'undefined' || str === null || str === '';
}

//给每个请求头都加上authentication
axios.interceptors.request.use(config =>{
  if (store.state.token){
    config.headers['authorization'] = store.state.token
  }
  return config
},error => {
  return Promise.reject(error)
  }
)

export const router = new VueRouter({
  mode:'history',
  routes:routes
})
//通过路由守卫更改页面标题
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title
  if (to.matched.some(r => r.meta.requireAuth)){
    if (!store.state.token){
      store.commit('SET_TOKEN', sessionStorage.getItem('token'))
      next()
    }else{
      next();
    }
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(error => error)
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
