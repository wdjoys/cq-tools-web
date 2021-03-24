import { axiosGameServer } from '@/utils/request'
import URL from '@/config/config.api.url'

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

export { SrverInfo, GameService }
