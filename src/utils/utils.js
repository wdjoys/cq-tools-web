import { USER_INFO } from '@/config/config.common'
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
        return getSession(USER_INFO)
    } catch (error) {
        return null
    }
}

export { getSession, getUserInfo }
