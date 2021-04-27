import { USER_TOKEN } from '@/config/config.common'
export function bytesFormatter (value) {
    const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

    for (let i = 0; i < 10; i++) {
        if (value > 1024) {
            value = (value / 1024).toFixed(2)
        } else {
            return `${value} ${arr[i]}`
        }
    }
}
const getSession = (item) => {
    const value = sessionStorage.getItem('vuejs__' + item)
    const itemJson = JSON.parse(value)
    return itemJson.value
}

const getUserInfo = () => {
    try {
        return getSession(USER_TOKEN)
    } catch (error) {
        return null
    }
}
function fakeClick (obj) {
    var ev = document.createEvent('MouseEvents')
    ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    obj.dispatchEvent(ev)
}

export function exportRaw (name, data) {
    var urlObject = window.URL || window.webkitURL || window
    var exportBlob = new Blob([data])
    var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    saveLink.href = urlObject.createObjectURL(exportBlob)
    saveLink.download = name
    fakeClick(saveLink)
}

export { getSession, getUserInfo }
