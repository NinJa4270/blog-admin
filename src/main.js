import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.baseURL = 'http://localhost:3006/admin/api/v1/'
// 挂载请求头
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer'+' '+ window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')