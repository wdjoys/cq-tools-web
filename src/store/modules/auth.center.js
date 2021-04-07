import { login, getUserInfo, getServers } from '@/api/restful/auth.center'
import { USER_TOKEN } from '@/config/config.common'
import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        user: {},
        token: {},
        servers: [],
        serverInfo: {
            ip: '127.0.0.1'
        }

    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
        },
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_SERVERS (state, servers) {
            state.servers = servers
        }
    },
    actions: {
        login ({ state, commit }, data) {
            return new Promise((resolve, reject) => {
                login(data)
                    .then(res => {
                        commit('SET_TOKEN', res)
                        // 设置token到浏览器保存
                        Vue.session.set(USER_TOKEN, res)
                        if (data.checked) {
                            Vue.session.local(USER_TOKEN, res, 3600 * 24 * 7)
                        }
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getUserInfo ({ state, commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then(res => {
                        commit('SET_USER', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getServers ({ state, commit }) {
            return new Promise((resolve, reject) => {
                getServers()
                    .then(res => {
                        commit('SET_SERVERS', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }

    }

}
