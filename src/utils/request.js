import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { authURL, USER_TOKEN } from '@/config/config.common.js'

import md5 from 'js-md5'
const service = axios.create({

    timeout: 40000 // 请求超时时间
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
                window.location.reload()
            }
        }
        // 超时
    } else if (error.message.indexOf('timeout') !== -1 || error.message.indexOf('Network Error') !== -1) {
        notification.error({
            message: 'Request Timeout',
            description: '请检查本地网络，或联系管理员'
        })
    }
    // console.log(error.message)
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
        const license = store.getters.get_server.key
        const timeStamp = new Date().getTime()
        const md5Str = md5(`${timeStamp}${license}`)
        // console.log(`${timeStamp}${license}`)
        config.headers['Server-Token'] = `${md5Str} - ${timeStamp}` // 让每个请求携带自定义 token 请根据实际情况自行修改
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
    if (!store.getters.get_server) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('无服务器ip')
    }
    const gameURL = '//' + store.getters.get_server.ip + ':7890/'
    config.url = gameURL + config.url
    console.log('axios', config)
    return service(config)
}

const axiosAuthServer = (config) => {
    config.url = authURL + config.url
    return service(config)
}

export { installer as VueAxios, axiosGameServer, axiosAuthServer }
