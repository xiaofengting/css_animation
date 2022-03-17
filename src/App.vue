<script setup lang="ts">

import { ref } from 'vue';
import HomeStage from './components/HomeStage.vue'

const loading = ref(true)
const menu = ref(false)

function restart() {
  menu.value = false
  loading.value = true
}
function showMenu() {
  menu.value = true
  loading.value = false
}
</script>

<template>
  <HomeStage v-if="loading" />
  <button type="button" class="last-chapter__menu-btn" @click="showMenu">
    <div></div>
    <div></div>
    <div></div>
  </button>
  <div class="menu" :class="{ active: menu }">
    <section class="menu__box">
      <div class="bg"></div>
    </section>
    <button type="button" class="menu__close-btn" @click="restart">
      <div></div>
      <div></div>
    </button>
  </div>
</template>

