class BaseRequest {
    get (parameter) {
        let url = this.url + '?'
        for (const key in parameter) {
            if (parameter[key]) {
                url += `${key}=${parameter[key]}&`
            }
        }
        return this.axios({
            url,
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
