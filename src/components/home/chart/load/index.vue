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
                <span>{{tip.value}} %</span>
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
    props: ['load'],
    components: { chartjs },
    data () {
        return {
            tips: [
                {
                    label: '处理器负载',
                    icon: 'caret-up',
                    value: 0,
                    color: '#5dd9a8'
                }, {
                    label: '内存负载',
                    icon: 'caret-down',
                    value: 0,
                    color: '#5b8ff9'
                }, {
                    label: '磁盘负载',
                    icon: 'caret-down',
                    value: 0,
                    color: '#5b8ff9'
                }
            ],

            datasets: [{
                label: '处理器负载',
                data: this.load.cpu,
                borderColor: 'rgba(93, 217, 168,1)',
                backgroundColor: 'rgba(93, 217, 168,0.3)'
            },
            {
                label: '内存负载',
                data: this.load.ram,
                borderColor: 'rgba(91, 143, 249,1)',
                backgroundColor: 'rgba(91, 143, 249,0.5)'
            },
            {
                label: '磁盘负载',
                data: this.load.disk,
                borderColor: 'rgba(91, 143, 249,1)',
                backgroundColor: 'rgba(91, 143, 249,0.5)'
            }]
        }
    },
    methods: {

        yAxesTicks (value, index, values) {
            return value + ' %'
        },
        update (data) {
            const arr = []
            arr[0] = data.cpu
            arr[1] = data.ram
            arr[2] = data.disk

            for (let i = 0; i < 3; i++) {
                this.$set(this.tips[i], 'value', arr[i])
            }
            // console.log('dfsdfs', data)

            // 队列元素 删除开头 新加一个到结尾
            function quee (l, el) {
                l.shift(el)
                l.push(el)
            }

            quee(this.load.cpu, { x: data.time_stamp * 1000, y: arr[0] })
            quee(this.load.ram, { x: data.time_stamp * 1000, y: arr[1] })
            quee(this.load.disk, { x: data.time_stamp * 1000, y: arr[2] })

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
    watch: {
        load (v) {
            // console.log(v, '数据变化')
            this.$set(this.datasets[0], 'data', this.load.cpu)
            this.$set(this.datasets[1], 'data', this.load.ram)
            this.$set(this.datasets[2], 'data', this.load.disk)
        }
    }
}
</script>

<style lang="less" scoped>
.tip {
    padding: 20px 0px 10px;

    .grid {
        // background-color: aqua;
        width: 33.333%;
        display: inline-block;
        text-align: center;
    }
}
</style>
