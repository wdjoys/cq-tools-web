// import Vuex from 'vuex'
// import Vue from 'vue'
import { Group } from '@/api/restful/restful'
// Vue.use(Vuex)

export default ({
    state: {
        group: []
    },
    mutations: {
        SET_GROUP (state, groups) {
            state.group = groups
        },
        DELETE_GROUP (state, index) {
            state.group.splice(index, 1)
        },
        ADD_GROUP (state, group) {
            state.group.push(group)
        },
        PUT_GROUP (state, index, group) {
            state.group.splice(index, 1, group)
        }

    },
    actions: {
        getGroup ({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.group.length === 0) {
                    Group.get()
                        .then(res => {
                            commit('SET_GROUP', res)
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    resolve(state.group)
                }
            })
        },
        postGroup ({ commit, state }, group) {
            return new Promise((resolve, reject) => {
                Group.post(group, group.createTask)
                    .then(res => {
                        commit('ADD_GROUP', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
)
