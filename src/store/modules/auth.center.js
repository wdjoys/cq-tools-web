import { login, getUserInfo, getServers, getCards, serverAuthor, deleteServer, getCoinLogs, getCoinLogType } from '@/api/restful/auth.center'
import { USER_TOKEN } from '@/config/config.common'
import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        user: {},
        cards: {},
        servers: [],
        serverInfo: {
            ip: '127.0.0.1'
        },
        coinLogs: [],
        coinLogType: []

    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
        },
        SET_CARDS (state, cards) {
            state.cards = cards
        },
        SET_SERVERS (state, servers) {
            state.servers = servers
        },
        UPDATE_SERVERS (state, server) {
            const res = state.servers.find(item => {
                if (item.ip === server.ip) {
                    item.expiration_time = server.expiration_time
                    item.liecese = server.liecese
                    return true
                } else {
                    return false
                }
            })
            if (typeof (res) === 'undefined') {
                state.servers.push(server)
            }
        },
        DELETE_SERVER (state, server) {
            state.servers = state.servers.filter(item => item.ip !== server.ip)
        },
        SET_COIN_LOGS (state, coinLogs) {
            state.coinLogs = coinLogs
        },
        SET_COIN_LOG_TYPE (state, coinLogType) {
            state.coinLogType = coinLogType
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
        logout ({ state, commit }) {
            Vue.session.clear()
            Vue.session.clear()
            commit('SET_TOKEN', null)
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
        },
        getCards ({ state, commit }) {
            return new Promise((resolve, reject) => {
                getCards()
                    .then(res => {
                        commit('SET_CARDS', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        serverAuthor ({ state, commit }, data) {
            return new Promise((resolve, reject) => {
                serverAuthor(data)
                    .then(res => {
                        commit('UPDATE_SERVERS', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        deleteServer ({ state, commit }, data) {
            return new Promise((resolve, reject) => {
                deleteServer(data)
                    .then(res => {
                        commit('DELETE_SERVER', data)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getCoinLogs ({ state, commit }) {
            return new Promise((resolve, reject) => {
                getCoinLogs()
                    .then(res => {
                        commit('SET_COIN_LOGS', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        getCoinLogType ({ state, commit }) {
            return new Promise((resolve, reject) => {
                getCoinLogType()
                    .then(res => {
                        commit('SET_COIN_LOG_TYPE', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }

    }

}
