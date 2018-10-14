<template>
	<div class="list" ref="wrapper">
		<div>
			<div class="area">
				<div class="title border-topbottom">当前城市</div>
				<div class="button-list">
					<div class="button-wrapper">
						<div class="button">{{this.currentCity}}</div>
					</div>
				</div>
			</div>
			<div class="area">
				<div class="title border-topbottom">热门城市</div>
				<div class="button-list">
					<div class="button-wrapper"
						 v-for="item of hotcities"
						 :key="item.id"
						 @click="handleCityClick(item.name)"
						 >
						<div class="button">{{item.cityName}}</div>
					</div>
				</div>
			</div>
			<div class="area"
				 v-for="(item, key) of newCities"
				 :key="key"
				 :ref="key"
				 >
				<div class="title border-topbottom">{{key}}</div>
				<div class="item-list">
					<div
						class="item border-bottom"
						v-for="innerItem in item"
						:key="innerItem.cityCode"
						@click="handleCityClick(innerItem.cityName)"
						>
						{{innerItem.cityName}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CityList',
  data () {
    return {
      scroll: {}
    }
  },
  // 把vuex中的city公用的数据映射到当前组件的currentCity计算属性里
  computed: {
    ...mapState({
      currentCity: 'city'
    }),
    newCities(){
    	const newCityObj = {}
    	this.cities.forEach((item, index)=>{
    		if(!newCityObj.hasOwnProperty(item.firstLetter)){
    			newCityObj[item.firstLetter]= []
    		}
    		newCityObj[item.firstLetter].push({
    			cityCode:item.cityCode,
    			cityName: item.cityName,
    			firstLetter:item.firstLetter
    		})
    	})
    	return newCityObj
    }
  },
  methods: {
    handleCityClick (city) {
      // console.log(city);
      // changeCity 是action
      // this.$store.dispatch('changeCity', city)
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    // 有一个mutation叫作changeCity，然后把这个mutation映射到
    // 当前组件的changeCity方法里
    ...mapMutations(['changeCity'])
  },
  props: {
    hotcities: Array,
    cities: Array,
    letter: String
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
  },
  watch: {
    letter () {
      // 使用循环输出的ref是一个数组
      //  element下面是一个数组[div.area]
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        // console.log(element[0]);
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
	.border-topbottom
		&:before
			border-color: #ccc
		&:after
			border-color: #ccc
	.border-bottom
		&:before
			border-color: #ccc
	.list
		overflow: hidden
		position: absolute
		top: 1.58rem
		left: 0
		right: 0
		bottom: 0
		.title
			line-height: .54rem
			background: #eee
			padding-left: .2rem
			color: #666
			font-size: .26rem
		.button-list
			overflow: hidden
			padding: .1rem .6rem .1rem .1rem
			.button-wrapper
				float: left
				width: 33.33%
				.button
					text-align: center
					padding: .1rem 0
					margin: .1rem
					border: .02rem solid #ccc
					border-radius: .06rem
		.item-list
			.item
				line-height: .76rem
				padding-left: .2rem
</style>
