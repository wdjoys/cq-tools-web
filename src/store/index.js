import Vue from 'vue'
import Vuex from 'vuex'

// 导入子模块
import group from './modules/group'
import task from './modules/task'
import service from './modules/service'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        serverList: [],
        serverInfo: {
            ip: '127.0.0.1'
        }

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        group,
        task,
        service
    }
})
