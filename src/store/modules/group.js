import { Group } from '@/api/restful/restful'

const groupRequest = new Group()

export default ({
    state: {
        group: []
    },
    mutations: {
        SET_GROUP (state, groups) {
            state.group = groups
        },
        DELETE_GROUP (state, group) {
            state.group = state.group.filter(item => item.id !== group.id)
        },
        ADD_GROUP (state, group) {
            state.group.push(group)
        },
        PUT_GROUP (state, group) {
            state.group = state.group.map(item => {
                if (item.id === group.id) {
                    return group
                } else {
                    return item
                }
            })
        }

    },
    actions: {
        getGroup ({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.group.length === 0) {
                    groupRequest.get()
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
                groupRequest.post(group, group.createTask)
                    .then(res => {
                        commit('ADD_GROUP', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        putGroup ({ commit, state }, group) {
            return new Promise((resolve, reject) => {
                groupRequest.put(group)
                    .then(res => {
                        commit('PUT_GROUP', group)
                        resolve(group)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        deleteGroup ({ commit, state }, group) {
            return new Promise((resolve, reject) => {
                groupRequest.delete(group)
                    .then(res => {
                        commit('DELETE_GROUP', group)
                        resolve(group)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
)
