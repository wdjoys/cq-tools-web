import store from '@/store'
import { serviceURL } from '@/config/config.common'
class ServerLoad {
    constructor (wsUrl, receviFunc) {
        this.ws = new WebSocket(`wss://${store.getters.get_server.id.toString().padStart(6, '0')}.${serviceURL}/${wsUrl}`)
        this.ws.onmessage = (event) => { receviFunc(this.receviMessage(event)) }

        // this.ws.onmessage = this.websocketonmessage;
        // this.ws.onopen = this.websocketonopen;
        // this.ws.onerror = this.websocketonerror;
        // this.ws.onclose = this.websocketclose;
    }

    receviMessage (event) {
        return JSON.parse(event.data)
    }

    sendMessage (messageText) {
        this.ws.send(messageText)
    }

    close () {
        this.ws.close()
    }
}

export { ServerLoad }
