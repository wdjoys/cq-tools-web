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
        <chartjs :yAxesTicks="yAxesTicks" />
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
                    value: 555,
                    color: '#5dd9a8'
                }, {
                    label: '下行',
                    icon: 'caret-down',
                    value: 5555,
                    color: '#5b8ff9'

                }, {
                    label: '总发送',
                    icon: 'fund',
                    value: 555555,
                    color: '#5b8ff9'
                }, {
                    label: '总接收',
                    icon: 'fund',
                    value: 99999555,
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
            if (value > 1024) {
                value = (value / 1024).toFixed(2)
            } else {
                return `${value} KB`
            }

            if (value > 1024) {
                value = (value / 1024).toFixed(2)
            } else {
                return `${value} MB`
            }

            return `${value} GB`
        },
        yAxesTicks (value, index, values) {
            if (value < 1000) {
                return value + ' K'
            } else {
                return value / 1000 + ' M'
            }
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
