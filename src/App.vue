<template>
  <div id="app">
    <!-- router-view显示的是当前路由地址所对应的内容 -->
    <!-- keep-alive是vue自带的标签，路由的内容被加载过一次之后，
    	就把路由中的内容放到内存之中，下一次再进这个路由，不需要重新
    	渲染组件，钩子函数也不会被重新执行，只需要从内存中把以前的内容
    	拿出来显示到页面就可以了 -->
    <keep-alive>
    	<router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
