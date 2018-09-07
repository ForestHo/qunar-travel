import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    // '/detail/:id' 动态路由
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ],
  // 每次做路由页面切换的时候，都让新进入显示的页面x,y轴的
  // 初始位置都为0，也就是让页面切换的时候，始终回到最顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
