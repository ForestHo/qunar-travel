<template>
	<ul class="list">
		<li
			class="item"
			v-for="item of letters"
			:key="item"
			:ref="item"
			@touchstart.prevent="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
			@click="handleLetterClick"
		>{{item}}
		</li>
	</ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  // 性能优化一:
  // 当页面数据被更新的时候，同时页面完成了渲染，updated这个钩子就会执行
  // 当初次渲染当前组件的时候，是用City父组件传过来的空对象参数cities进行
  // 渲染的，也就是页面刚加载的时候，Alphabet.vue里面什么东西都不会显示出来
  // 当City.vue通过ajax获取到数据	，cities的值才发生变化，Alphabet才被
  // 渲染出来，当City组件往Alphabet组件传的数据发生变化，Alphabet这个组件
  // 就会重新渲染，当Alphabet重新渲染之后，updated这个生命周期钩子就会被执行
  // 这个时候页面已经展示城市字母列表所有的内容，那么这个时候我们就去获取'A'这个
  // 字母所在DOM对应的offsetTop值，就没有任何问题
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      // console.log(letters);
      return letters
    }
  },
  methods: {
    handleLetterClick (e) {
      // console.log(e.target.innerText);
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    // 性能优化二:
    //  当鼠标在字母表上来回移动的这个时候	，touchmove执行的频率是非常高的,我们
    //  可以通过节流限制下函数执行的频率
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
	@import '~styles/varibles.styl'
	.list
		display: flex
		flex-direction: column
		justify-content: center
		position: absolute
		right: 0
		top: 1.58rem
		bottom: 0
		width: .4rem
		.item
			text-align: center
			line-height: .4rem
			color: $bgColor
</style>
