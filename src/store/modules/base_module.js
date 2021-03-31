export default class BaseModules {
    constructor (name, RequestClass, namespaced = true) {
        this.namespaced = namespaced

        this.name = name

        this.state = {
            request: new RequestClass(),
            name: this.name,
            [this.name]: []

        }
        this.mutations = {
            SET (state, objects) {
                state[this.name] = objects
            },
            DELETE (state, object) {
                state[this.name] = state[this.name].filter(item => item.id !== object.id)
            },
            ADD (state, object) {
                state[this.name].push(object)
            },
            PUT (state, object) {
                state[this.name] = state[this.name].map(item => {
                    if (item.id === object.id) {
                        return object
                    } else {
                        return item
                    }
                })
            }
        }
        this.actions = {
            get ({ commit, state }) {
                return new Promise((resolve, reject) => {
                    if (state[state.name].length === 0) {
                        state.request.get()
                            .then(res => {
                                commit('SET', res)
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
            post ({ commit, state }, object) {
                return new Promise((resolve, reject) => {
                    state.request.post(object)
                        .then(res => {
                            commit('ADD', res)
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            },
            put ({ commit, state }, object) {
                return new Promise((resolve, reject) => {
                    state.request.put(object)
                        .then(res => {
                            commit('PUT', object)
                            resolve(object)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            },
            delete ({ commit, state }, object) {
                return new Promise((resolve, reject) => {
                    state.request.delete(object)
                        .then(res => {
                            commit('DELETE', object)
                            resolve(object)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
            }
        }
    }
}
