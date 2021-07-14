import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import routers from "./routers.js";
import 'element-ui/lib/theme-chalk/index.css';
import leftNav from "./components/leftNav";
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.component("leftNav",leftNav)
Vue.use(VueAxios,axios)

const router = new VueRouter({
  mode:'history',
  routes:routers
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
