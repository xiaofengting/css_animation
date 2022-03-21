import { createRouter, createWebHashHistory } from "vue-router"

const Home = () => import("../pages/home/index.vue")

const routes = [
  { path: "/", name: "home", component: Home },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})