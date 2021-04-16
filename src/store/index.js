import Vue from 'vue'
import Vuex from 'vuex'

// 导入子模块
import group from './modules/group'
import task from './modules/task'
import taskCode from './modules/task_code'
import service from './modules/service'
import config from './modules/config'
import authCenter from './modules/auth.center'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        serverInfo: {}

    },
    mutations: {
        SET_SERVER_INFO (state, serverInfo) {
            state.serverInfo = serverInfo
            Vue.session.set('server', serverInfo)
        }
    },
    getters: {
        get_server: state => {
            const server = Vue.session.get('server')
            if (Object.keys(state.serverInfo).length === 0) {
                state.serverInfo = server
            }
            return state.serverInfo
        }
    },
    actions: {

    },
    modules: {
        group,
        task,
        service,
        taskCode,
        config,
        authCenter
    }
})
