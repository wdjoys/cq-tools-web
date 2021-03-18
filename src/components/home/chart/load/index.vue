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
                 :datasets="datasets" />
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
                    value: 555,
                    color: '#5dd9a8'
                }, {
                    label: '内存负载',
                    icon: 'caret-down',
                    value: 5555,
                    color: '#5b8ff9'
                }, {
                    label: '磁盘负载',
                    icon: 'caret-down',
                    value: 555555,
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
        netValueFormatter (value) {
            if (value > 1024) {
                value = (value / 1024).toFixed(2)
            } else {
                return `${value} KB`
            }
            // MB处理
            if (value > 1024) {
                value = (value / 1024).toFixed(2)
            } else {
                return `${value} MB`
            }
            // GB处理
            return `${value} GB`
        },
        yAxesTicks (value, index, values) {
            return value + ' %'
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
