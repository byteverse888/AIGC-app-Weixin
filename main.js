import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import request from './api/request'
import moment from "moment"
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')
import store from './store'


Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.$store = store
Vue.prototype.$moment = moment
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif