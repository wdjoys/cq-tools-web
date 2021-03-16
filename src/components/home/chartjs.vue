<template>
    <canvas id="myChart"
            class="main"></canvas>
</template>

<script>
import Chart from 'chart.js'

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
            return {
                x: timeStamp,
                y: this.out
            }
        },
        addData (chart, data) {
            chart.data.datasets.forEach(dataset => {
                dataset.data.shift()
                dataset.data.push(data)
            })
            chart.update()
        }
    },
    mounted () {
        const data = []
        for (let i = 0; i < 60; i++) {
            data.splice(0, 0, this.data_generater(i))
        }

        var ctx = document.getElementById('myChart')

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data,
                    borderColor: 'rgba(93, 217, 168,1)',
                    backgroundColor: 'rgba(93, 217, 168,0.4)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: 'origin'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                quarter: 'MMM YYYY'
                            }
                        },
                        gridLines: {
                            // zeroLineWidth: 2
                            // display: false,
                            // borderDash: [50, 2]
                        },
                        ticks: {
                            maxRotation: 0, // 刻度标签旋转角度
                            // padding: 1,
                            // sampleSize: 50,
                            autoSkipPadding: 40 // 标签之间距
                        }
                    }]
                },
                layout: {
                    padding: 25
                },
                plugins: {
                    filler: {
                        propagate: true
                    }
                }

            }

        })

        setInterval(() => {
            // data.splice(0, 2)
            this.addData(myChart, this.data_generater())
            // console.log('xxx', myChart.data)
        }, 3000
        )
    }
}

</script>

<style lang="less" scoped>
.main {
    height: 480px;
}
</style>
