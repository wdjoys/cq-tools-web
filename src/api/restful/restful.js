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

export { SrverInfo }
