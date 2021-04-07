class BaseRequest {
    get () {
        return this.axios({
            url: this.url,
            method: 'get'
            // data: parameter
        })
    }

    post (parameter) {
        return this.axios({
            url: this.url,
            method: 'post',
            data: parameter
        })
    }

    put (parameter) {
        return this.axios({
            url: this.url,
            method: 'put',
            data: parameter
        })
    }

    delete (parameter) {
        return this.axios({
            url: this.url,
            method: 'delete',
            data: parameter
        })
    }
}

export { BaseRequest }
