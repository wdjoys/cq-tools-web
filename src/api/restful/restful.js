import { axiosGameServer } from '@/utils/request'
import URL from '@/config/config.api.url'

class BaseRequest {
    get () {
        return axiosGameServer({
            url: this.url,
            method: 'get'
            // data: parameter
        })
    }

    post (parameter) {
        return axiosGameServer({
            url: this.url,
            method: 'post',
            data: parameter
        })
    }

    put (parameter) {
        return axiosGameServer({
            url: this.url,
            method: 'put',
            data: parameter
        })
    }

    delete (parameter) {
        return axiosGameServer({
            url: this.url,
            method: 'delete',
            data: parameter
        })
    }
}

class SrverInfo {
    static get () {
        return axiosGameServer({
            url: URL.serverInfo,
            method: 'get'
            // data: parameter
        })
    }
}

class GameService {
    static get () {
        return axiosGameServer({
            url: URL.gameService,
            method: 'get'
            // data: parameter
        })
    }

    static post (parameter) {
        return axiosGameServer({
            url: URL.gameService,
            method: 'post',
            data: parameter
        })
    }

    static put (parameter) {
        return axiosGameServer({
            url: URL.gameService,
            method: 'put',
            data: parameter
        })
    }

    static delete (parameter) {
        return axiosGameServer({
            url: URL.gameService,
            method: 'delete',
            data: parameter
        })
    }
}

// class Group {
//     static get () {
//         return axiosGameServer({
//             url: URL.group,
//             method: 'get'
//             // data: parameter
//         })
//     }

//     static post (parameter) {
//         return axiosGameServer({
//             url: URL.group,
//             method: 'post',
//             data: parameter
//         })
//     }

//     static put (parameter) {
//         return axiosGameServer({
//             url: URL.group,
//             method: 'put',
//             data: parameter
//         })
//     }

//     static delete (parameter) {
//         return axiosGameServer({
//             url: URL.group,
//             method: 'delete',
//             data: parameter
//         })
//     }
// }
class Group extends BaseRequest {
    constructor () {
        super()
        this.url = URL.group
    }
}

class Task extends BaseRequest {
    constructor () {
        super()
        this.url = URL.task
    }
}
export { SrverInfo, GameService, Group }
