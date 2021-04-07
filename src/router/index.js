import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterMap } from '@/config/config.router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: RouterMap,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const userInfo = getUserInfo()
    if (!userInfo && to.path !== '/user/login' && to.path.indexOf('/info/') === -1) {
        next('/user/login')
    } else if (to.path === '/user/login' && userInfo) {
        next('/workplace/report-forms')
    } else {
        next()
    }
})
export default router
