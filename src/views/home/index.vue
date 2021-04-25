 <template>
    <div class="home">
        <a-row :gutter="[15,15]">
            <a-col :span="24">
                <slideshow />
            </a-col>
            <a-col :span="24">
                <service />
            </a-col>
            <a-col :span="12"
                   class="service-status">

                <load :load="serverInfo.load"
                      ref="load" />
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
import { network, slideshow, load } from '@/components/home'
import { service } from '@/components/service/'
import { ServerLoad } from '@/api/socket/socket'
export default {
    components: {
        service,
        load,
        slideshow,
        network
    },
    data () {
        return {
            serverInfo: {
                network: {
                    in: [],
                    out: []
                },
                load: {
                    cpu: [],
                    ram: [],
                    disk: []
                }
            }
        }
    },
    methods: {
        DataGenerater (data, timeKey, dataKey, model = 0) {
            // 生成数据集 根据 timeKey ，dataKey
            const dataArr = []
            let oldValue = data[0][dataKey]
            for (const d of data) {
                if (model === 1) {
                    dataArr.push({
                        x: d[timeKey] * 1000,
                        y: (d[dataKey] - oldValue) / 10
                    })
                    oldValue = d[dataKey]
                } else {
                    dataArr.push({
                        x: d[timeKey] * 1000,
                        y: d[dataKey]
                    })
                }
            }
            // console.log(dataArr, 'model:', model)
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
            // console.log(this.serverInfo)
        },

        ws_receive (data) {
            // 接受ws数据

            // 首次加载 构造基础历史数据
            if (this.serverInfo.network.in.length === 0) {
                // console.log(data, '首次加载', this.serverInfo.network.in.length === 0)
                this.serverInfo.network = {
                    in: this.DataGenerater(data, 'time_stamp', 'network_in', 1),
                    out: this.DataGenerater(data, 'time_stamp', 'network_out', 1)
                }
                this.serverInfo.load = {
                    cpu: this.DataGenerater(data, 'time_stamp', 'cpu'),
                    ram: this.DataGenerater(data, 'time_stamp', 'ram'),
                    disk: this.DataGenerater(data, 'time_stamp', 'disk')
                }
                // for (const item in this.serverInfo) {
                //     for (const key in this.serverInfo[item]) {
                //         this.$set(this.serverInfo[item], key, this.serverInfo[item][key])
                //     }
                // }
                // console.log(this.serverInfo, '首次加载')
            } else {
                // 其他 更新数据
                this.$refs.network.update(data)
                this.$refs.load.update(data)
            }
        }

    },
    mounted () {
        this.ws = new ServerLoad('ws', this.ws_receive)
        // s.receviMessage = this.xxx
        // console.log('xx')
    },
    destroyed () {
        this.ws.close()
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
