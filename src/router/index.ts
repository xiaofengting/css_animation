import { createRouter, createWebHashHistory } from "vue-router"

const Home = () => import("../pages/home/index.vue")
const Palette = () => import("../pages/palette/index.vue")
const Wish = () => import("../pages/wish/index.vue")

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/palette", name: "palette", component: Palette },
  { path: "/wish", name: "wish", component: Wish },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})