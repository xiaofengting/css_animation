<script setup lang="ts">
import { ref, computed } from 'vue'
import { SPs, SSRs, SRs, Rs } from './shishen'

interface shishen {
  id: number
  name: string
  level: string
  new?: boolean
}

const wishing = ref(false)
const wished = ref(false)
let total = ref(+(localStorage.getItem('total') || 0))
let ownMap = JSON.parse(localStorage.getItem('ownMap') || '{}')

const complete = ref(0)
const ALLlen = computed(() =>
  SPs.length + SSRs.length + SRs.length + Rs.length
)
let ownLen = ref(0)
ownLen.value = Object.keys(ownMap).length
const ownSSRs = computed(() =>
  (SSRs.filter(item => !ownMap[item.id]))
)
const noOwnSSRs = computed(() =>
  (SSRs.filter(item => ownMap[item.id]))
)
const ownSPs = computed(() =>
  (SPs.filter(item => !ownMap[item.id]))
)
const noOwnSPs = computed(() =>
  (SPs.filter(item => !ownMap[item.id]))
)

let cards: Array<shishen> = []

function calcCard() {
  cards.splice(0, 10)
  for (let index = 0; index < 10; index++) {
    const ran1 = Math.floor(Math.random() * 100)
    if (ran1 < 77) {
      const ran2 = Math.floor(Math.random() * Rs.length)
      const card: shishen = {
        id: Rs[ran2].id,
        name: Rs[ran2].name,
        level: 'R',
      }
      if (!(ownMap[card.id])) {
        ownMap[card.id] = true
        card.new = true
      }
      cards.push(card)
    }
    else if (ran1 < 97) {
      const ran2 = Math.floor(Math.random() * SRs.length)
      const card: shishen = {
        id: SRs[ran2].id,
        name: SRs[ran2].name,
        level: 'SR',
      }
      if (!(ownMap[card.id])) {
        ownMap[card.id] = true
        card.new = true
      }
      cards.push(card)
    }
    else if (ran1 < 99) {
      const ranOwn = Math.floor(Math.random() * 4)
      if (ranOwn < 3) {
        const ran2 = Math.floor(Math.random() * ownSSRs.value.length)
        const card: shishen = {
          id: ownSSRs.value[ran2].id,
          name: ownSSRs.value[ran2].name,
          level: 'SSR',
        }
        cards.push(card)
      } else {
        const ran2 = Math.floor(Math.random() * noOwnSSRs.value.length)
        const card: shishen = {
          id: noOwnSSRs.value[ran2].id,
          name: noOwnSSRs.value[ran2].name,
          level: 'SSR',
          new: true
        }
        ownMap[card.id] = true
        cards.push(card)
      }
    }
    else {
      const ranOwn = Math.floor(Math.random() * 4)
      if (ranOwn < 3) {
        const ran2 = Math.floor(Math.random() * ownSPs.value.length)
        const card: shishen = {
          id: ownSPs.value[ran2].id,
          name: ownSPs.value[ran2].name,
          level: 'SP',
        }
        cards.push(card)
      } else {
        const ran2 = Math.floor(Math.random() * noOwnSPs.value.length)
        const card: shishen = {
          id: noOwnSPs.value[ran2].id,
          name: noOwnSPs.value[ran2].name,
          level: 'SP',
          new: true
        }
        ownMap[card.id] = true
        cards.push(card)
      }
    }
  }
  total.value += 10
  ownLen.value = Object.keys(ownMap).length
  localStorage.setItem('total', total.value.toString())
  localStorage.setItem('ownMap', JSON.stringify(ownMap))
}

function wishCard() {
  if (wishing.value) return
  wishing.value = true
  setTimeout(() => {
    calcCard()
    wished.value = true
  }, 700)
  setTimeout(() => {
    wishing.value = false
  }, 1300)
}

const collectionVisible = ref(false)
const recordVisible = ref(false)
function switchCollection() {
  collectionVisible.value = !collectionVisible.value
  wished.value = false
}
function switchRecord() {
  recordVisible.value = !recordVisible.value
  wished.value = false
}

const collectionType = ref(0)
function chooseCollectionType(type: number): void {
  collectionType.value = type
}
const collectionOwn = ref(0)
function chooseCollectionOwn(own: number): void {
  collectionOwn.value = own
}


function clearData() {
  total.value = 0
  ownLen.value = 0
  localStorage.clear()
  ownMap = {}
}

const detailVisible = ref(false)

interface detail {
  id: number
  name: string
  awake?: boolean
  new?: boolean
}

let currentDetail: detail = {
  id: 0,
  name: '',
  awake: false
}
function showDetail(obj: detail, awake: boolean = true) {
  currentDetail.id = obj.id
  currentDetail.name = obj.name
  currentDetail.awake = awake
  detailVisible.value = true
}
function hideDetail() {
  detailVisible.value = false
}

</script>

<template>
  <div class="wish__container">
    <div v-show="wished && !collectionVisible && !recordVisible" class="wish__card-container">
      <div
        v-for="(item, idx) in cards"
        :key="total + idx"
        class="wish__card"
        :class="`wish__card-${item.level}`"
        :style="`--card-index: ${idx};`"
      >
        <div class="wish__card-cover"></div>
        <div class="wish__card-back" :class="{ 'wish__card-new': item.new }">
          <img
            decoding="async"
            :src="`https://yys.res.netease.com/pc/zt/20161108171335/data/shishen_big_beforeAwake/${item.id}.png`"
            :alt="item.name"
          />
        </div>
      </div>
    </div>
    <div
      v-show="!collectionVisible && !recordVisible"
      class="wish__main-btn-box"
      :class="{ again: wished }"
    >
      <div class="wish__main-btn" :class="{ wishing: wishing }" @click="wishCard">
        <div class="wish__main-text">抽卡</div>
        <span v-for="i in 60" :key="i" class="wish__main-dot" :style="`--dot-index: ${i};`" />
      </div>
    </div>
    <div
      v-show="!recordVisible"
      class="wish__collection-btn"
      :class="{ active: collectionVisible }"
      @click="switchCollection"
    >{{ collectionVisible ? '关闭' : '图鉴' }}</div>
    <div
      v-show="!collectionVisible"
      class="wish__record-btn"
      :class="{ active: recordVisible }"
      @click="switchRecord"
    >{{ recordVisible ? '关闭' : '记录' }}</div>
    <div
      v-show="collectionVisible"
      class="wish__collection-container"
      :class="{ active: collectionVisible }"
    >
      <nav class="wish__collection-filter">
        <a @click="chooseCollectionType(0)" :class="{ active: collectionType === 0 }">全部</a>
        <a @click="chooseCollectionType(1)" :class="{ active: collectionType === 1 }">SP</a>
        <a @click="chooseCollectionType(2)" :class="{ active: collectionType === 2 }">SSR</a>
        <a @click="chooseCollectionType(3)" :class="{ active: collectionType === 3 }">SR</a>
        <a @click="chooseCollectionType(4)" :class="{ active: collectionType === 4 }">R</a>
      </nav>
      <nav class="wish__collection-filter wish__collection-filter-own">
        <a @click="chooseCollectionOwn(0)" :class="{ active: collectionOwn === 0 }">全部</a>
        <a @click="chooseCollectionOwn(1)" :class="{ active: collectionOwn === 1 }">未拥有</a>
        <a @click="chooseCollectionOwn(2)" :class="{ active: collectionOwn === 2 }">已拥有</a>
      </nav>
      <section class="wish__collection-list" :class="`wish__collection-list-${collectionOwn}`">
        <template v-if="collectionType === 0 || collectionType === 1">
          <div
            v-for="item in SPs"
            :key="item.id"
            class="wish__collection-item"
            :class="{ own: ownMap[item.id] }"
            @click="showDetail(item, false)"
          >
            <img
              class="wish__collection-img"
              loading="lazy"
              :alt="item.name"
              :src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.id}.png`"
            />
            <div class="wish__collection-name">{{ item.name }}</div>
          </div>
        </template>
        <template v-if="collectionType === 0 || collectionType === 2">
          <div
            v-for="item in SSRs"
            :key="item.id"
            class="wish__collection-item"
            :class="{ own: ownMap[item.id] }"
            @click="showDetail(item)"
          >
            <img
              class="wish__collection-img"
              loading="lazy"
              :alt="item.name"
              :src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.id}.png`"
            />
            <div class="wish__collection-name">{{ item.name }}</div>
          </div>
        </template>
        <template v-if="collectionType === 0 || collectionType === 3">
          <div
            v-for="item in SRs"
            :key="item.id"
            class="wish__collection-item"
            :class="{ own: ownMap[item.id] }"
            @click="showDetail(item)"
          >
            <img
              class="wish__collection-img"
              loading="lazy"
              :alt="item.name"
              :src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.id}.png`"
            />
            <div class="wish__collection-name">{{ item.name }}</div>
          </div>
        </template>
        <template v-if="collectionType === 0 || collectionType === 4">
          <div
            v-for="item in Rs"
            :key="item.id"
            class="wish__collection-item"
            :class="{ own: ownMap[item.id] }"
            @click="showDetail(item)"
          >
            <img
              class="wish__collection-img"
              loading="lazy"
              :alt="item.name"
              :src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.id}.png`"
            />
            <div class="wish__collection-name">{{ item.name }}</div>
          </div>
        </template>
      </section>
    </div>
    <div v-show="recordVisible" class="wish__record-container" :class="{ active: recordVisible }">
      <p>概率说明：2% SSR；1% SP；20% SR；R 77%</p>
      <p>每次抽到 SSR、SP 时，25% 概率为未拥有（分别计算）</p>
      <p class="wish__record-clear" @click="clearData">清空记录</p>
      <p>已抽卡 {{ total }} 次</p>
      <p v-if="complete > 0">第 {{ complete }} 次抽卡完成全图鉴</p>
      <p v-else>图鉴 {{ ownLen }} / {{ ALLlen }}</p>
    </div>
    <div v-if="detailVisible" class="wish__detail-cover" @click="hideDetail">
      <img
        :alt="currentDetail.name"
        class="wish__detail-img1"
        :src="`https://yys.res.netease.com/pc/gw/20180913151832/data/name/${currentDetail.id}.png`"
      />
      <img
        decoding="async"
        class="wish__detail-img2"
        :src="`https://yys.res.netease.com/pc/zt/20161108171335/data/shishen_big_beforeAwake/${currentDetail.id}.png`"
        :alt="currentDetail.name"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
