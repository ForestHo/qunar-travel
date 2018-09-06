<template>
	<div>
		<!-- <home-header :city="city"></home-header> -->
		<home-header></home-header>
		<home-swiper :list="swiperList"></home-swiper>
		<home-icons :list="iconList"></home-icons>
		<home-recommend :list="recommendList"></home-recommend>
		<home-weekend :list="weekendList"></home-weekend>
	</div>
</template>

<script>
//引入局部组件
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
	name: 'Home',
	components: {
		HomeHeader,
		HomeSwiper,
		HomeIcons,
		HomeRecommend,
		HomeWeekend
	},
	data () {
		return {
			// city: '',
			lastCity: '',
			swiperList: [],
			iconList: [],
			recommendList: [],
			weekendList: []
		}
	},
	computed: {
		...mapState(['city'])
	},
	// 当我们使用keep-alive，组件会多出了一个生命周期钩子activated
	// 当页面重新被显示的时候，activated钩子会被重新执行
	activated () {
		// console.log('activated');
		console.log(this.lastCity);
		console.log(this.city);
		if(this.lastCity !== this.city){
			this.lastCity = this.city
			this.getHomeInfo();
		}
	},
	// 页面加载的时候，mounted会被执行，这里发送了ajax请求
	mounted () {
		// console.log('mounted');
		this.getHomeInfo()
		this.lastCity = this.city
	},
	methods: {
		getHomeInfo () {
			axios.get('/api/index.json?city=' + this.city)
				 .then(this.getHomeInfoSucc)
		},
		getHomeInfoSucc (res) {
			// console.log(res);
			res = res.data;
			if(res.ret && res.data){
				const data = res.data;
				// this.city = data.city;
				this.swiperList = data.swiperList;
				this.iconList = data.iconList;
				this.recommendList = data.recommendList;
				this.weekendList = data.weekendList;
			}
		}
	}
}
</script>

<style scoped>
	
</style>