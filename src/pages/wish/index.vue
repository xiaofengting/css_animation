<script setup lang="ts">
import { ref, reactive } from 'vue';
import shishen_arr from './shishen';

interface shishen {
  id: number;
  level: string;
  name: string;
}

const wishing = ref(false);
const wished = ref(false);
let total = ref(+(localStorage.getItem('total') || 0));
let ownMap = JSON.parse(localStorage.getItem('ownMap') || '{}');

let cards: Array<shishen> = [];

function calcCard() {
  cards.splice(0, 10);
  for (let index = 0; index < 10; index++) {
    const ran = Math.floor(Math.random() * shishen_arr.length);
    cards.push(shishen_arr[ran]);
    ownMap[shishen_arr[ran].id] = true;
  }
  total.value += 10;
  localStorage.setItem('total', total.value.toString());
  localStorage.setItem('ownMap', JSON.stringify(ownMap));
}

function wishCard() {
  if (wishing.value) return;
  wishing.value = true;
  setTimeout(() => {
    calcCard();
    wished.value = true;
  }, 700);
  setTimeout(() => {
    wishing.value = false;
  }, 1300);
}
</script>

<template>
  <div class="wish__container">
    <div v-if="wished" class="wish__card-container">
      <div
        v-for="(item, idx) in cards"
        :key="total + idx"
        class="wish__card"
        :class="`wish__card-${item.level}`"
        :style="`--card-index: ${idx};`"
      >
        <div class="wish__card-cover"></div>
        <div class="wish__card-back">
          <img
            decoding="async"
            :src="`https://yys.res.netease.com/pc/zt/20161108171335/data/shishen_big_beforeAwake/${item.id}.png`"
            :alt="item.name"
          />
        </div>
      </div>
    </div>
    <div class="wish__main-btn-box" :class="{ again: wished }">
      <div class="wish__main-btn" :class="{ wishing: wishing }" @click="wishCard">
        <div class="wish__main-text">抽卡</div>
        <span v-for="i in 60" :key="i" class="wish__main-dot" :style="`--dot-index: ${i};`" />
      </div>
    </div>
    {{ total }}
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
