<template>
	<div class="container" @click="handleGallaryClick">
		<div class="wrapper">
			<swiper :options="swiperOptions">
            <!-- slides -->
            <swiper-slide
            	v-for="(item, index) in imgs"
            	:key="index"
            	>
                <img class="gallary-img" :src="item">
            </swiper-slide>
            <div class="swiper-pagination"
            	slot="pagination"
            	v-show="showPagination"></div>
          </swiper>
		</div>
	</div>
</template>

<script>
export default {
  name: 'CommonGallary',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    showPagination () {
      return this.imgs.length
    }
  },
  methods: {
    handleGallaryClick () {
      this.$emit('gallary-close')
    }
  },
  data () {
    return {
      //  observeParents: true, observer: true
      //	swiper插件只要监听到当前元素或者父元素的dom结构发生
      //	变化的时候，就会自动 自我刷新一次，通过这次自我刷新，就
      //	可以解决swiper宽度计算问题(swiper的宽度没有被正常计算，
      //	导致滑动bug)
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        observer: true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
	.container >>> .swiper-container
		overflow: inherit
	.container
		display: flex
		flex-direction: column
		justify-content: center
		z-index: 99
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: #000
		.wrapper
			width: 100%
			height: 0
			// overflow: hidden
			padding-bottom: 100%
			.gallary-img
				width: 100%
			.swiper-pagination
				color: #fff
				bottom: -1rem
</style>
