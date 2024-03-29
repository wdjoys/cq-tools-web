import { axiosAuthServer } from '@/utils/request'
import URL from '@/config/config.api.url'
import { BaseRequest as BR } from './base'

class BaseRequest extends BR {
    constructor () {
        super()
        this.axios = axiosAuthServer
    }
}

function login (params) {
    const form = new FormData()
    form.append('username', params.username)
    form.append('password', params.password)
    return axiosAuthServer({
        url: URL.login,
        method: 'post',
        data: form,
        headers: {
            'Content-Type': 'multipart/form-data;charset=utf-8'
        }
    })
}

function getUserInfo () {
    return axiosAuthServer({
        url: URL.userInfo,
        method: 'get'

    })
}

function getServers () {
    return axiosAuthServer({
        url: URL.server,
        method: 'get'

    })
}

function getCards () {
    return axiosAuthServer({
        url: URL.card,
        method: 'get'

    })
}

function sendActiceMessage () {
    return axiosAuthServer({
        url: URL.active,
        method: 'post'

    })
}

function register (params) {
    return axiosAuthServer({
        url: URL.register,
        method: 'post',
        data: params

    })
}

function serverAuthor (params) {
    return axiosAuthServer({
        url: URL.serverAuthor,
        method: 'post',
        data: params

    })
}

function deleteServer (params) {
    return axiosAuthServer({
        url: URL.server,
        method: 'delete',
        data: params

    })
}

function getCoinLogs () {
    return axiosAuthServer({
        url: URL.coinLogs,
        method: 'get'

    })
}
function getCoinLogType () {
    return axiosAuthServer({
        url: URL.coinLogType,
        method: 'get'

    })
}

function changeEmail (email) {
    return axiosAuthServer({
        url: URL.email + '?email=' + email,
        method: 'put'

    })
}

function getServerLicence (params) {
    return axiosAuthServer({
        url: URL.serverLicence,
        method: 'post',
        data: params

    })
}

function charge (params) {
    return axiosAuthServer({
        url: URL.charge,
        method: 'post',
        data: params
    })
}

export {
    login, getUserInfo, getServers, getCards, sendActiceMessage, register, serverAuthor, deleteServer, getCoinLogs, getCoinLogType,
    changeEmail, getServerLicence, charge
}
