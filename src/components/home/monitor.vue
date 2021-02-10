<template>
    <div id="main"
         style="height:400px">

    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components'
import {
    LineChart
} from 'echarts/charts'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
)

export default {
    data () {
        return {
            info: {
                netOut: 1024,
                netIn: 555

            },

            series: [
                { data: [] },
                { data: [] }
            ]

        }
    },
    methods: {
        getinfo () {
            console.log(this.series[0].data.length)
            if (this.series[0].data.length > 20) {
                this.series.map(item => {
                    item.data.shift()
                })
            }
            const t = Date.parse(new Date())

            this.series.map(item => { item.data.push([t, Math.round(Math.random() * 1000)]) })
            return this.series
        }
    },
    mounted () {
        var chartDom = document.getElementById('main')
        var myChart = echarts.init(chartDom)
        var option

        function randomData () {
            now = new Date(+now + oneDay)
            value = value + Math.random() * 21 - 10
            return {
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    Math.round(value)
                ]
            }
        }

        var data = []
        var now = +new Date(1997, 9, 3)
        var oneDay = 24 * 3600 * 1000
        var value = Math.random() * 1000
        for (var i = 0; i < 1000; i++) {
            data.push(randomData())
        }

        option = {
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            // tooltip: {
            //     trigger: 'axis',
            //     formatter: function (params) {
            //         params = params[0]
            //         var date = new Date(params.name)
            //         return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
            //     },
            //     axisPointer: {
            //         animation: false
            //     }
            // },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data,
                areaStyle: {}

            }]
        }

        setInterval(() => {
            for (var i = 0; i < 5; i++) {
                data.shift()
                data.push(randomData())
            }

            myChart.setOption({
                series: [{
                    data: data
                }]
            })
        }, 1000)

        option && myChart.setOption(option)
    }
}
</script>

<style lang="less" scoped>
#container {
    padding: 30px;
}
</style>
