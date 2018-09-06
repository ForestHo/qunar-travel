<template>
	<div>
		<div class="search">
			<input v-model="keyword" type="text" class="search-input" placeholder="输入城市名或拼音">
		</div>
		<div class="search-content" 
			 ref="search"
			 v-show="keyword">
			<ul>
				<li class="search-item border-bottom" 
					v-for="item of list"
					:key="item.id"
					@click="handleCityClick(item.name)"
					>
					{{item.name}}
				</li>
				<li class="search-item border-bottom"
					v-show="hasNoData">
					没有找到匹配数据
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'

export default {
	name: 'CitySearch',
	props: {
		cities: Object
	},
	data () {
		return {
			keyword: '',
			list: [],
			timer: null,
			scroll: {},
			resultFlag: false
		}
	},
	methods: {
		handleCityClick (city) {
			// this.$store.commit('changeCity', city)
			this.changeCity(city)
			this.keyword = ''
			this.$router.push('/')	
		},
		// 有一个mutation叫作changeCity，然后把这个mutation映射到
		// 当前组件的changeCity方法里
		...mapMutations(['changeCity'])
	},
	computed: {
		hasNoData () {
			if(this.resultFlag){
				return !this.list.length
			}
		}
	},
	watch: {
		keyword () {
			// console.log(this.resultFlag);
			if (this.timer) {
				clearTimeout(this.timer)
			}
			if (!this.keyword) {
				this.list = []
				this.resultFlag = false
				return
			}
			this.timer = setTimeout(() => {
				const result = []
				for (let i in this.cities) {
					this.cities[i].forEach(value => {
						if(value.spell.indexOf(this.keyword) > -1 || 
							value.name.indexOf(this.keyword) > -1) {
							result.push(value)
						}
					})
				}
				this.list = result
				this.resultFlag = true
			},100)
		}
	},
	mounted () {
		this.scroll = new BScroll(this.$refs.search)
	}
}
</script>

<style lang="stylus" scoped>
	@import '~styles/varibles.styl'
	.search
		height: .72rem
		background: $bgColor
		padding: 0 .1rem 
		.search-input
			box-sizing: border-box
			height: .62rem
			padding: 0 .1rem
			line-height: .62rem
			width: 100%
			text-align: center
			border-radius: .06rem
			color: #666
	.search-content
		overflow: hidden
		position: absolute
		z-index: 1
		top: 1.58rem
		left: 0
		right: 0
		bottom: 0
		background: #eee
		.search-item
			line-height: .62rem
			padding-left: .2rem
			background: #fff
			color: #666
</style>