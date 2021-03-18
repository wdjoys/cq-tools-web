import Chart from 'chart.js'

// 点指示器配置
Object.assign(
    Chart.defaults.global.elements.point,
    {
        radius: 0 // 点大小
    })

// 动画配置
Object.assign(
    Chart.defaults.global.animation,
    {
        easing: 'easeInOutQuad', // 动画
        duration: 300 // 持续时间
    }
)

// 图例配置
Object.assign(
    Chart.defaults.global.legend
    , {
        display: false
    })

// 折线图配置
Object.assign(
    Chart.defaults.global.elements.line,
    {
        borderWidth: 3, // 线宽
        pointRadius: 5, // 点大小
        tension: 0 // 曲率
    })

// 提示配置
Object.assign(
    Chart.defaults.global.tooltips,
    {
        intersect: false // 如果为 true，则提示框模式仅在鼠标位置与元素相交时才适用。如果为 false，该模式将随时应用。

    })

export default Chart
