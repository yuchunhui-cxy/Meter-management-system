// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//自带的
import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

//element-ui导入二行
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//全局使用element-ui
Vue.use(ElementUI)


import animate from 'animate.css'

import '@/styles/index.css' // global css

//自带的2行
import App from './App'
import router from './router'

//导入vuex仓库
import store from './store'
//导入axios配置文件
import global from './utils/index'
//导入svg
import '@/icons'
import '@/permission'

//自带的
Vue.config.productionTip = false

//可以用this.$globalFun
Vue.prototype.globalFun = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
