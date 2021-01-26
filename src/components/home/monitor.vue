<template>
    <div id="container">

    </div>
</template>

<script>
import { Area } from '@antv/g2plot'
export default {
    data () {
        return {}
    },
    mounted () {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
            .then((res) => res.json())
            .then((data) => {
                const area = new Area('container', {
                    data,
                    padding: 50,

                    legend: {
                        layout: 'horizontal',
                        position: 'top',
                        offsetX: -60
                    },
                    xField: 'year',
                    yField: 'value',
                    seriesField: 'category',
                    color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
                    xAxis: {
                        type: 'time',
                        mask: 'YYYY'
                    },
                    yAxis: {
                        label: {
                            // 数值格式化为千分位
                            formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
                        }
                    }
                })

                area.render()
            })
    }
}
</script>

<style lang="less" scoped>
#container {
    padding: 30px;
}
</style>
