// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//css初始化
import './assets/init.css'
// rem
import './assets/rem'
//jquery
import $ from 'jquery'
//axios引入
import axios from "axios";
//mint-ui引入
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css' //导入mint-ui


//import './components/globalComponent.js' //注册components下的所有vue组件，无需import就可使用
import { ajaxUrl } from "./axios/fetch";
Vue.use(Mint);

import VueClipboard from 'vue-clipboard2'//复制功能
Vue.use(VueClipboard)


	global.$fn = {

   // apiHost:'http://192.168.10.200:8899/v1/',
    //apiHost:'http://smart.vcralete.com/v1/' //测试
    // apiHost:'/v1/'              //正式

   apiHost:'http://viv20.cn/v1/'
  }
  

 // axios.defaults.withCredentials=true //解决跨域session问题
Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

