<template>
    <div class="home">
        <a-row :gutter="[15,15]">
            <a-col :span="24">
                <slideshow />
            </a-col>
            <!-- <a-col :span="24">
                <service class="service-status" />
            </a-col> -->
            <a-col :span="12"
                   class="service-status">

                <load :load="serverInfo.load" />
            </a-col>
            <a-col :span="12"
                   class="service-status">

                <network :network="serverInfo.network"
                         ref="network" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { service, network, slideshow, load } from '@/components/home'
import { ServerLoad } from '@/api/socket/socket'
export default {
    components: {
        // service,
        load,
        slideshow,
        network
    },
    data () {
        return {
            serverInfo: {
                network: {
                    in: []
                },
                load: {}
            }
        }
    },
    methods: {
        DataGenerater (data, timeKey, dataKey) {
            // 生成数据集 根据 timeKey ，dataKey
            const dataArr = []
            for (const d of data) {
                dataArr.push({
                    x: data[timeKey],
                    y: data[dataKey]
                })
            }
            return dataArr
        },
        // serverInfoDataGenerater (data) {
        //     for (const item in this.serverInfo) {
        //         for (const key in this.serverInfo[item]) {
        //             // this.serverInfo[item][key].shift()
        //             this.serverInfo[item][key].push({ x: data.time_stamp, y: data[key] })
        //         }
        //     }
        //     console.log(this.serverInfo)
        // },
        serverInfoDataGenerater (data) {
            for (const item in this.serverInfo) {
                for (const key in this.serverInfo[item]) {
                    this.$set(this.serverInfo[item], [key], data[key])
                }
            }
            console.log(this.serverInfo)
        },

        ws_receive (data) {
            // 首次加载 构造基础历史数据
            console.log(this.serverInfo.network.in, '首次加载', this.serverInfo.network.in.length === 0)
            if (this.serverInfo.network.in.length === 0) {
                this.serverInfo.network = {
                    in: this.DataGenerater(data, 'time_stamp', 'network_in'),
                    out: this.DataGenerater(data, 'time_stamp', 'network_out')
                }
                this.serverInfo.load = {
                    cpu: this.DataGenerater(data, 'time_stamp', 'cpu'),
                    ram: this.DataGenerater(data, 'time_stamp', 'ram'),
                    disk: this.DataGenerater(data, 'time_stamp', 'disk')
                }
                for (const item in this.serverInfo) {
                    for (const key in this.serverInfo[item]) {
                        this.$set(this.serverInfo[item], key, this.serverInfo[item][key])
                    }
                }
                console.log(this.serverInfo, '首次加载')
            }
            // 其他 更新数据
            this.$refs.network.update(data)
        }

    },
    mounted () {
        const s = new ServerLoad('ws', this.ws_receive)
        // s.receviMessage = this.xxx
        // console.log('xx')
    }
}
</script>

<style lang="less" scoped>
.home {
    .service-status {
        // background-color: rgb(255, 255, 255);
        height: 430px;

        div {
            background-color: rgb(255, 255, 255);
            height: 100%;
        }
    }
}
</style>
