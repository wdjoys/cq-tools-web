import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { authURL, USER_INFO } from '@/config/config.common.js'

store.state.serverInfo.ip = '127.0.0.1'
const gameURL = '//' + store.state.serverInfo.ip + ':7890/'

const service = axios.create({

    timeout: 4000 // 请求超时时间
})

const err = error => {
    // 有响应
    if (error.response) {
        const data = error.response.data
        const user = Vue.session.get(USER_INFO)
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: '您的账号没有该操作权限！'
            })
        }
        if (
            error.response.status === 401 &&
            !(data.result && data.result.isLogin)
        ) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
            if (user) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                })
            }
        }
        // 超时
    } else if (error.message.indexOf('timeout') !== -1) {
        notification.error({
            message: 'Request Timeout',
            description: '请检查本地网络，或联系管理员'
        })
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
    const user = Vue.session.get(USER_INFO)
    if (user) {
        config.headers.Authorization = 'Bearer ' + user.token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    // console.log(config)
    return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
    return response.data
}, err)

const installer = {
    vm: {},
    install (Vue) {
        Vue.use(VueAxios, service)
    }
}

const axiosGameServer = (config) => {
    config.url = gameURL + config.url
    console.log('axios', config)
    return service(config)
    // return new Promise((resolve, reject) => {
    //     service(config).then(res => {
    //         resolve(res)
    //     }).catch(err => {
    //         reject(err)
    //     })
    // })
}

const axiosAuthServer = (config) => {
    config.url = authURL + config.url
    return service(config)
}

export { installer as VueAxios, axiosGameServer, axiosAuthServer }
