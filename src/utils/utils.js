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
