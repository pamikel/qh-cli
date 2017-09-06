import 'babel-polyfill'
import Vue from 'vue'
import {router} from './routers'
import {store} from './stores'
import 'element-ui/lib/theme-default/index.css'
import './main.css'

// require.ensure([], function() {
//   // 需要从vendor.js中分离出来单独打包的文件
//   const ElementUI = require('element-ui')
//   Vue.use(ElementUI)
// })

new Vue({
  router,
  store
}).$mount('#app')