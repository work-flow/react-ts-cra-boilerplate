<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// import { cloneDeep } from 'lodash'

import HelloWorld from 'components/HelloWorld.vue'

import v2 from 'assets/img/v2.jpeg'
// import logo from 'assets/img/logo.png'

import { refresh } from 'utils'

const router = useRouter()
const count = ref(0)
const handleAddCount = () => count.value++

const loading = ref(false)

const state = reactive({
  name: '',
  age: 0,
  sex: '男'
})

const c1 = computed(() => count.value + 1)
onMounted(() => {
  setTimeout(() => {
    loading.value = true
  }, 200)
})
</script>

<template>
  <div class="home">
    <van-skeleton
      v-if="!loading"
      title
      :row="3"
    />
    <div v-else>
      <h1 class="home__title">
        未登录
      </h1>
      <van-button
        type="primary"
        class="home__button"
      >
        返回生活守约
      </van-button>
      <van-button
        type="danger"
        class="home__button"
        @click="refresh(router)"
      >
        重新刷新
      </van-button>
      <HelloWorld />
      <!-- <img
        :src="logo"
      > -->
      <img
        :src="v2"
        alt="图片"
      >
      <vant-button
        type="primary"
        class="home__button"
        @click="handleAddCount"
      >
        + {{ count }} {{ c1 }}
      </vant-button>
      <div>
        {{ state.name }}--{{ state.age }}--{{ state.sex }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
.home {
  padding: 20px;
  text-align: center;
  &__title {
    font-size: 36px;
  }
  &__button {
    // width: 272px;
    height: 88px;
    border-radius: 16px;
  }
}
</style>
