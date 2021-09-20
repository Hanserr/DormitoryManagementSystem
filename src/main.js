import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import leftNav from "./components/AdminPage/leftNav";
import axios from 'axios';
import App from './App.vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import routes from "./routes.js";
import {drag} from './components/Js/drag'
import {vueBaberrage} from 'vue-baberrage'

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.component("leftNav",leftNav)
Vue.use(VueAxios,axios)
Vue.use(vueBaberrage)
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:8090'

export const router = new VueRouter({
  mode:'history',
  routes:routes
})
//change page title via vue-router
//通过路由守卫更改页面标题
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title
  next()
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
