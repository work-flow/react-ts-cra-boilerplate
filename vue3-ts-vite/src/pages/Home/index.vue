<template>
  <div class="home">
    <h1 class="home__title">未登录</h1>
    <img :src="logo" alt="">
    <van-button type="primary" class="home__button"> 返回生活守约 </van-button>
    <HelloWorld />
    <img :src="v2" alt="">
  </div>
</template>
<script lang="ts">
import { cloneDeep } from 'lodash'
import HelloWorld from 'components/HelloWorld.vue'
import v2 from 'assets/v2.jpeg'
import logo from 'assets/logo.png'

export default {
  name: 'HomeIndex',
  components: {
    HelloWorld
  },
  data () {
    return {
      logo,
      v2
    }
  },
  mounted () {
    const arr1 = [1, 2, 3]
    const arr2 = cloneDeep(arr1)
    console.log('arr2>>>', arr2)
    console.log('===>>>', import.meta.env)
  }
}
</script>
<style lang="less">
.home {
  padding: 20px;
  text-align: center;
  &__title {
    font-size: 36px;
  }
  &__button {
    height: 88px;
    background: #0f77ff;
    border-radius: 16px;
    font-size: 30px;
    color: #fff;
  }
}
</style>
