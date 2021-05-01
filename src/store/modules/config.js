import BaseModule from './base_module'

import { Config } from '@/api/restful/restful'

const config = new BaseModule('config', Config)

const configExtends = {
    state: {
        configObj: {}
    },
    mutations: {
        SET_CONFIG_OBJ (state, obj) {
            state.configObj = obj
        }
    },
    getters: {
        baseUrl: state => {
            return state.config.length !== 0
                ? `https://${state.configObj.system.cosBucketName}-${state.configObj.cos.APPID}.cos.${state.configObj.cos.Region}.myqcloud.com/`
                : ''
        }
    },
    actions: {
        get: ({ commit, state, dispatch }) => {
            return new Promise((resolve, reject) => {
                if (state[state.name].length === 0) {
                    // console.log(state, state.name, state[state.name].length, '长度')
                    state.request.get()
                        .then(res => {
                            commit('SET', res)
                            dispatch('generateConfigObj').then(result => {
                                commit('SET_CONFIG_OBJ', result)
                            })

                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    resolve(state[state.name])
                }
            })
        },
        put ({ commit, state, dispatch }, object) {
            return new Promise((resolve, reject) => {
                state.request.put(object)
                    .then(res => {
                        commit('PUT', object)
                        dispatch('generateConfigObj').then(result => {
                            commit('SET_CONFIG_OBJ', result)
                        })

                        resolve(object)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        generateConfigObj: ({ commit, state }) => {
            const tempConfigObj = {}
            state.config.map(item => {
                // 不存在这个键 需要先创建 否则报错
                if (!(item.group in tempConfigObj)) {
                    tempConfigObj[item.group] = {}
                }
                // console.log(item.name, item.value)
                tempConfigObj[item.group][item.name] = item.value
            })

            return tempConfigObj
        }
    }

}
// 扩展属性
Object.assign(config.state, configExtends.state)
Object.assign(config.actions, configExtends.actions)
Object.assign(config.mutations, configExtends.mutations)
// 新建属性
config.getters = configExtends.getters

export default config
