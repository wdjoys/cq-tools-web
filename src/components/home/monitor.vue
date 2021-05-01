<template>
    <div id="container">

    </div>
</template>

<script>
import { Area } from '@antv/g2plot'
import { log } from '@antv/g2plot/lib/utils'

export default {
    data () {
        return {
            in: 300,
            out: 300
        }
    },
    methods: {
        data_generater (i = 0) {
            const timeStamp = new Date().getTime() - i * 3000
            this.in = this.in + Math.round(Math.random() * 40) - 20
            this.out = this.out + Math.round(Math.random() * 40) - 20
            return [
                {
                    timeStamp: timeStamp,
                    value: this.out,
                    category: 'out'
                },
                {
                    timeStamp: timeStamp,
                    value: this.in,
                    category: 'in'
                }
            ]
        }
    },
    mounted () {
        const data = []
        for (let i = 0; i < 60; i++) {
            data.splice(0, 0, ...this.data_generater(i))
        }
        console.log(data)
        const options = {
            renderer: 'canvas',
            data,
            xField: 'timeStamp',
            yField: 'value',
            seriesField: 'category',
            xAxis: {
                type: 'time',
                mask: 'HH:m:ss'
                // min: data[0].timeStamp
            },
            yAxis: {
                line: {
                    style: {
                        stroke: '#d5d5d5',
                        lineWidth: 1,
                        lineDash: [0, 0],
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0

                    },
                    nice: false

                }
            },
            padding: 50,
            isStack: false,
            legend: false
        }
        const area = new Area('container', options)
        area.render()

        setInterval(() => {
            data.splice(0, 2)
            data.push(...this.data_generater())
            area.changeData(data)
        }, 3000
        )
    }

}
</script>

<style lang="less" scoped>
.main {
    height: 500px;
}
</style>>
