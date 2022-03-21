<script setup lang="ts">
import { ref } from 'vue';

const menu = ref(false)

const showMenu = () => {
  menu.value = true
}
const closeMenu = () => {
  menu.value = false
}
</script>

<template>
  <article class="home__main--container">
    <div class="home__main--bg-help" />
    <div class="home__main--bg" />
    <div class="home__main--bg-circle" />
    <div class="home__main--frame">
      <div class="home__main--frame-box" />
    </div>
  </article>
  <div class="home__main--decoration">
    <div class="home__main--star" />
    <div class="home__main--star" />
    <div class="home__main--star" />
    <div class="home__main--star" />
    <div class="home__main--moon" />
  </div>
  <div class="home__main--title">
    <div class="home__main--title-main">小枫亭的栖息地</div>
  </div>
  <a
    class="home__main--github"
    href="https://github.com/xiaofengting/css_animation"
    target="_blank"
  >
    <span class="home__main--github-left">Github</span>
    <span class="home__main--github-right">></span>
  </a>
  <button type="button" class="home__main--menu-btn" @click="showMenu">
    <div />
    <div />
    <div />
  </button>
  <div class="home__menu--container" :class="{ active: menu }">
    <section class="home__menu--space">
      <div />
      <div />
      <div />
      <div />
    </section>
    <section class="home__menu--box">
      <div class="home__menu--bg" />
      <div class="home__menu--title">要看什么呢</div>
      <div class="home__menu--nav">
        <router-link to="/">
          <img src="@assets/home/star.svg" />自我介绍
        </router-link>
        <router-link to="/">
          <img src="@assets/home/moon.svg" />调色板
        </router-link>
        <a href="https://xiaofengting.github.io/study/" target="_blank">
          <img src="@assets/home/dog.svg" />博客
        </a>
        <a href="https://xiaofengting.github.io/css_ppt/" target="_blank">
          <img src="@assets/home/mountain.svg" />幻灯片
        </a>
        <router-link class="home__menu--nav-css" to="/">
          <img src="@assets/home/star-6.svg" />好看的网页
        </router-link>
      </div>
    </section>
    <button type="button" class="home__menu--close" @click="closeMenu">
      <div />
      <div />
    </button>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
