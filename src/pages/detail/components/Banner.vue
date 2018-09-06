<template>
	<div>
		<div class="banner" @click="handleBannerClick">
			<img class="banner-img" src="//img1.qunarzz.com/sight/p0/1603/85/85c883189bf7293390.water.jpg_600x330_fd753eb3.jpg">
			<div class="banner-info">
				<div class="banner-title">什刹海(AAAA景区)</div>
				<div class="banner-number">
					<span class="iconfont banner-icon">&#xe692;</span>
					21
				</div>
			</div>
		</div>
		<common-gallary 
			:imgs="imgs" 
			v-show="showGallary"
			@gallary-close="handleGallaryClose"
			></common-gallary>
	</div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
export default {
	name: 'DetailBanner',
	data () {
		return {
			showGallary: false,
			imgs: ['http://img1.qunarzz.com/sight/p0/1603/85/85c883189bf7293390.water.jpg_350x240_4d22376e.jpg',
			'http://img1.qunarzz.com/sight/p0/201407/18/9cf52fd9818abac5e56402b19ed86a00.jpg_350x240_a40a27c0.jpg']
		}
	},
	methods: {
		handleBannerClick () {
			this.showGallary = true
		},
		handleGallaryClose () {
			this.showGallary = false
		}
	},
	components: {
		CommonGallary
	}
}
</script>

<style lang="stylus" scoped>
	.banner
		position: relative
		overflow: hidden
		height: 0
		padding-bottom: 55%
		.banner-img
			width: 100%
		.banner-info
			display: flex
			position: absolute
			left: 0
			right: 0
			bottom: 0
			line-height: .6rem
			color: #fff
			background-image: linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,.8))
			.banner-title
				font-size: .32rem
				padding: 0 .2rem
				flex: 1
			.banner-number
				line-height: .32rem
				height: .32rem
				margin-top: .14rem
				padding: 0 .4rem
				border-radius: .2rem
				background: rgba(0, 0, 0, .8)
				font-size: .24rem
				.banner-icon
					font-size: .24rem
</style>