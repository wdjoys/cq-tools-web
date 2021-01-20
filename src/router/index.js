import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterMap } from '@/config/config.router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: RouterMap,
    mode: 'history'
})

export default router
