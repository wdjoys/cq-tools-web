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

                <network :network="serverInfo.network" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { service, network, slideshow, load } from '@/components/home'
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
                load: {
                    cpu: [],
                    ram: [],
                    disk: []

                },
                network: {
                    in: [],
                    out: []
                }
            }
        }
    },
    methods: {
        data_generater (i = 0) {
            // 时间戳
            const timeStamp = new Date().getTime() - i * 5000

            this.in = this.load.cpu[-1] + Math.round(Math.random() * 100) - 50
            this.out = this.out + Math.round(Math.random() * 100) - 50
            return {
                x: timeStamp,
                y: this.out
            }
        },
        // 构造初始数据
        data_list_generater () {
            const data = []
            for (let i = 0; i < 120; i++) {
                data.push(this.data_generater(i))
            }
            return data
        }

    },
    mounted () {
        setInterval(() => {
            for (const key in this.serverInfo.network) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key]
                }
            }
        }, 3000)
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
