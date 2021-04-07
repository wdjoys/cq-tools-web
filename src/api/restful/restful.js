import { axiosGameServer } from '@/utils/request'
import URL from '@/config/config.api.url'
import { BaseRequest as BR } from './base'
class BaseRequest extends BR {
    constructor () {
        super()
        this.axios = axiosGameServer
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

class GameService extends BaseRequest {
    constructor () {
        super()
        this.url = URL.gameService
    }
}
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

class TaskCode extends BaseRequest {
    constructor () {
        super()
        this.url = URL.taskCode
    }
}
export { SrverInfo, GameService, Group, Task, TaskCode }
