<template>
    <div>
        <div class="tip">
            <div v-for="tip in tips"
                 :key="tip.label"
                 class="grid">
                <div>
                    <a-icon :type="tip.icon"
                            :style="{marginRight:'5px',color:tip.color}" /><span>{{tip.label}}</span>
                </div>
                <span>{{netValueFormatter(tip.value)}}</span>
            </div>
        </div>
        <chartjs :yAxesTicks="yAxesTicks"
                 :datasets="datasets"
                 ref="chart" />
    </div>
</template>

<script>
import chartjs from '../chartjs'

export default {
    props: ['network'],
    components: { chartjs },
    data () {
        return {
            tips: [
                {
                    label: '上行',
                    icon: 'caret-up',
                    value: 0,
                    color: '#5dd9a8'
                }, {
                    label: '下行',
                    icon: 'caret-down',
                    value: 0,
                    color: '#5b8ff9'

                }, {
                    label: '总发送',
                    icon: 'fund',
                    value: 0,
                    color: '#5dd9a8'
                }, {
                    label: '总接收',
                    icon: 'fund',
                    value: 0,
                    color: '#5b8ff9'
                }
            ],

            datasets: [{
                label: '出网流量',
                data: this.network.out,
                borderColor: 'rgba(93, 217, 168,1)',
                backgroundColor: 'rgba(93, 217, 168,0.3)'
            },
            {
                label: '入网流量',
                data: this.network.in,
                borderColor: 'rgba(91, 143, 249,1)',
                backgroundColor: 'rgba(91, 143, 249,0.5)'
            }]
        }
    },
    methods: {
        netValueFormatter (value) {
            const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

            for (let i = 0; i < 10; i++) {
                if (value > 1024) {
                    value = (value / 1024).toFixed(2)
                } else {
                    return `${value} ${arr[i]}`
                }
            }
        },
        yAxesTicks (value, index, values) {
            const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

            for (let i = 0; i < 10; i++) {
                if (value > 1000) {
                    value = (value / 1000).toFixed(1)
                } else {
                    return `${value} ${arr[i]}`
                }
            }
        },
        update (data) {
            const arr = []
            arr[0] = this.tips[2].value === 0 ? 0 : (data.network_out - this.tips[2].value) / 10
            arr[1] = this.tips[3].value === 0 ? 0 : (data.network_in - this.tips[3].value) / 10
            arr[2] = data.network_out
            arr[3] = data.network_in

            for (let i = 0; i < 4; i++) {
                this.$set(this.tips[i], 'value', arr[i])
            }
            // console.log('dfsdfs', data)

            // 队列元素 删除开头 新加一个到结尾
            function quee (l, el) {
                l.shift(el)
                l.push(el)
            }

            quee(this.network.in, { x: data.time_stamp * 1000, y: arr[1] })
            quee(this.network.out, { x: data.time_stamp * 1000, y: arr[0] })

            this.$refs.chart.chartUpdata()
            // for (const item in this.serverInfo) {
            //     //         for (const key in this.serverInfo[item]) {
            //     //             // this.serverInfo[item][key].shift()
            //     //             this.serverInfo[item][key].push({ x: data.time_stamp, y: data[key] })
            //     //         }
            //     //     }

            // }
        }
    },
    mounted () {

    },
    watch: {
        network (v) {
            // console.log(v, '数据变化')
            this.$set(this.datasets[0], 'data', this.network.in)
            this.$set(this.datasets[1], 'data', this.network.out)
        }
    }

}
</script>

<style lang="less" scoped>
.tip {
    padding: 20px 0px 10px;

    .grid {
        // background-color: aqua;
        width: 25%;
        display: inline-block;
        text-align: center;
    }
}
</style>
