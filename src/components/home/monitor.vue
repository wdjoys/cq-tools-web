<template>
    <div id="main"
         style="height:400px">

    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    GridComponent
} from 'echarts/components'
import {
    LineChart
} from 'echarts/charts'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [GridComponent, LineChart, CanvasRenderer]
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
            if (this.series[0].data.length > 8) {
                this.series.map(item => {
                    item.data.shift()
                })
            }
            const t = new Date()

            this.series.map(item => { item.data.push([t, Math.round(Math.random() * 1000)]) })
            return this.series
        }
    },
    mounted () {
        var chartDom = document.getElementById('main')
        var myChart = echarts.init(chartDom)
        var option

        option = {

            xAxis: {
                type: 'time',
                boundaryGap: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            series: [{
                data: [],
                type: 'line',
                areaStyle: {}
            },
            {
                data: [],
                type: 'line',
                areaStyle: {},
                showSymbol: false,
                hoverAnimation: false
            }]
            // animation: false,
            // animationDurationUpdate: 500,
            // animationEasingUpdateL: 'quadraticOut'
        }

        option && myChart.setOption(option)
        const that = this
        setInterval(() => {
            const series = that.getinfo()
            myChart.setOption({
                series
            })
            console.log(series)
        }, 1000)
    }
}
</script>

<style lang="less" scoped>
#container {
    padding: 30px;
}
</style>
