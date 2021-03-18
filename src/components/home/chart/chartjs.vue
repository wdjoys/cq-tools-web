<template>
    <div class="chart-container"
         style="position: relative;height:350px">
        <canvas ref="myChart"
                class="main"></canvas>
    </div>
</template>

<script>
import Chart from '@/utils/chart'

export default {
    props: ['datasets', 'yAxesTicks'],
    data () {
        return {
            myChart: {}
        }
    },
    methods: {
        chartUpdata () {
            this.myChart.update()
        }
    },
    //             chart.data.datasets.forEach(dataset => {
    //             dataset.data.shift()
    //             dataset.data.push(data())
    //         })

    mounted () {
        // 获取元素对象
        var ctx = this.$refs.myChart
        // 创建chart
        this.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: this.datasets

            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            // displayFormats: {
                            //     quarter: 'MMM YYYY'
                            // }
                            unit: 'second'
                        },
                        gridLines: {
                            // zeroLineWidth: 2
                            display: false
                            // borderDash: [50, 2]
                        },
                        ticks: {
                            maxRotation: 0, // 刻度标签旋转角度
                            // padding: 1,
                            // sampleSize: 50,
                            autoSkipPadding: 40 // 标签之间距
                        }
                    }],

                    yAxes: [{
                        // 刻度标题
                        // scaleLabel: {
                        //     display: true,
                        //     labelString: 'xx'
                        // },

                        // 刻度
                        ticks: {
                            // 在ticks中包含一个美元符号
                            callback: (value) => this.yAxesTicks(value)
                        }
                    }]

                },
                layout: {
                    padding: 25
                },

                maintainAspectRatio: false, // 画布重置后，保持宽高比

                tooltips: {
                    mode: 'index',
                    axis: 'x'
                }
            }

        })
    }
}

</script>

<style lang="less" scoped>
.main {
    height: 480px;
}
</style>
