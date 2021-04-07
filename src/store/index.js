import Vue from 'vue'
import Vuex from 'vuex'

// 导入子模块
import group from './modules/group'
import task from './modules/task'
import taskCode from './modules/task_code'
import service from './modules/service'
import authCenter from './modules/auth.center'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        serverInfo: '127.0.0.1'

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        group,
        task,
        service,
        taskCode,
        authCenter
    }
})
