// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'babel-polyfill'
import store from './store'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.prototype.HOST = '/api'
axios.defaults.headers.post["Content-type"]="application/json";
Vue.prototype.$axios=axios;
/* eslint-disable no-new */
/* 	1.定义了一个vue的根实例，它挂载在id为app的元素上,
	index.html有一个id为app的div，所以这里的挂载点
	指的就是index.html中id为app的div元素；
	2.components: { App }, 这是ES6的写法，
	对象{ App }实际上省略了{ App: App },意思是实际
	上项目定义了一个App的局部组件，在外层的vue根组件注册
	了这个App局部组件
	3.template模板里面直接把<App/>这个局部组件渲染出来
	4.router,路由配置 */
/* 路由就是根据网址的不同，返回不同的内容给用户 */ 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})