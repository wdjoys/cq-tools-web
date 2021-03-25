import Vue from 'vue'
import Vuex from 'vuex'

import { GameService } from '@/api/restful/restful'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        serverList: [],
        serverInfo: {
            ip: '127.0.0.1'
        },
        group: [],
        gameService: []
    },
    mutations: {
        SET_GAME_SERVICE (state, res) {
            state.gameService = res
        },
        DELETE_GAME_SERVICE (state, index) {
            state.gameService.splice(index, 1)
        },
        ADD_GAME_SERVICE (state, gameService) {
            state.gameService.push(gameService)
        },
        PUT_GAME_SERVICE (state, index, gameService) {
            state.gameService.splice(index, 1, gameService)
        }
    },
    actions: {
        getGameService ({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.gameService.length === 0) {
                    GameService.get()
                        .then(res => {
                            commit('SET_GAME_SERVICE', res)
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    resolve(state.gameService)
                }
            })
        },
        postGameService ({ commit, state }, gameService) {
            return new Promise((resolve, reject) => {
                GameService.post(gameService, gameService.createTask)
                    .then(res => {
                        commit('ADD_GAME_SERVICE', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }

    },
    modules: {
        group
    }
})
