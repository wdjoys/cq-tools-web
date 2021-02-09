<template>
    <div id="container">

    </div>
</template>

<script>
import { DualAxes } from '@antv/g2plot'
export default {
    data () {
        return {
            info: {
                netOut: 1024,
                netIn: 555

            },
            data: []

        }
    },
    methods: {
        getinfo () {
            const time = new Date()
            if (this.data.length > 35) { this.data.splice(0, 2) }
            this.data.push(
                {
                    time,
                    in: Math.round(Math.random() * 100),
                    out: Math.round(Math.random() * 100)
                }
            )
        }
    },
    mounted () {
        const area = new DualAxes('container', {
            padding: 30,
            animation: false,
            legend: {
                layout: 'horizontal',
                position: 'top',
                offsetX: 0
            },
            xField: 'time',
            yField: ['in', 'out'],
            seriesField: 'category',
            color: ['#f7b851', '#52a9ff'],
            xAxis: {
                type: 'time',
                mask: 'HH:MM:ss',
                tickCount: 60

            },
            smooth: true,
            isStack: false,
            // point: {},
            yAxis: {
                label: {
                    // 数值格式化为千分位
                    formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
                },
                min: 100,
                line: {
                    style: {

                        lineWidth: 0.5

                    }
                }

            },
            geometryOptions: [
                {
                    geometry: 'line',
                    color: '#5B8FF9'
                },
                {
                    geometry: 'line',
                    color: '#5AD8A6'
                }
            ]

        })

        console.log(area.options.data = this.data)
        // area.data = this.data
        area.render()
        setInterval(() => {
            this.getinfo()
            area.changeData([this.data, this.data])
        }, 3000)
    }
}
</script>

<style lang="less" scoped>
#container {
    padding: 30px;
}
</style>
