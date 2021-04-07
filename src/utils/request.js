import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { authURL, USER_TOKEN } from '@/config/config.common.js'

const service = axios.create({

    timeout: 4000 // 请求超时时间
})

const err = error => {
    // 有响应
    if (error.response) {
        const data = error.response.data
        const user = Vue.session.get(USER_TOKEN)
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
                store.dispatch('authCenter/logout')
            }
            window.location.reload()
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
    // console.log(config)

    if (config.url.indexOf(authURL) > -1) { // 请求我的服务器
        const token = Vue.session.get(USER_TOKEN)
        // console.log(token)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token.access_token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
    } else { // 请求用户的服务器

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
    const gameURL = '//' + store.state.serverInfo + ':7890/'
    config.url = gameURL + config.url
    console.log('axios', config)
    return service(config)
}

const axiosAuthServer = (config) => {
    config.url = authURL + config.url
    return service(config)
}

export { installer as VueAxios, axiosGameServer, axiosAuthServer }
