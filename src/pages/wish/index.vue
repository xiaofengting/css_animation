<script setup lang="ts">
import { ref } from 'vue';
import shishen_arr from './shishen'

const wishing = ref(false)
const wished = ref(false)

const wishCard = () => {
  wishing.value = true
  wished.value = true
  // setTimeout(() => {
  //   wishing.value = false
  // }, 1000);
}

</script>

<template>
  <div class="wish__container">
    <div v-if="wished" class="wish__card-container">
      <div v-for="i in 10" :key="i" class="wish__card">
        <img
          src="https://yys.res.netease.com/pc/zt/20161108171335/data/shishen_big_beforeAwake/333.png"
          alt="桃花妖"
        />
      </div>
    </div>
    <div v-if="!wishing" class="wish__main-btn" :class="{ wishing: wishing }" @click="wishCard">
      <div class="wish__main-text">抽卡</div>
      <span v-for="i in 60" :key="i" class="wish__main-dot" :style="`--dot-index: ${i};`" />
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
