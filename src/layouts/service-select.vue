<template>
    <div class="header">
        <a-row>
            <a-col :span="2">
                <a-dropdown :trigger="['click']">

                    <a class="ant-dropdown-link"
                       @click="e => e.preventDefault()">
                        <a-icon type="database" />
                        切换服务器
                        <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item key="0">
                            <a href="http://www.alipay.com/">1st menu item</a>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a href="http://www.taobao.com/">2nd menu item</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-col>
            <a-col :span="18">
                <a-space :size="20">
                    <span>
                        腾讯云 4h8g
                    </span>
                    <span>
                        <a-icon type="windows"
                                style="margin-right:5px" />系统：
                        {{serverInfo.system_version}}
                    </span>

                    <span>
                        开机时间：{{$moment(parseInt(serverInfo.boot_time)*1000).fromNow()}}
                    </span>
                    <a-popover>
                        <template slot="content">
                            <p>物理内存：{{bytesFormatter(serverInfo.ram)}}，交换内存：{{bytesFormatter(serverInfo.swap) }}</p>
                            <p>处理器：{{ serverInfo.cpu_name}} × {{serverInfo.cpu_count}}路，{{ serverInfo.cpu_core}} 核心，{{ serverInfo.cpu_threads}} 线程</p>

                            <div v-for="disk in disks"
                                 :key="disk.path">
                                {{disk.path}}，总容量：{{bytesFormatter(disk.size.total)}}，已使用：{{bytesFormatter(disk.size.used)}}
                                <a-progress :percent="disk.size.percent" />
                            </div>

                        </template>
                        <span>更多</span>
                    </a-popover>
                </a-space>
            </a-col>

            <a-col :span="4">
                <div class="info">
                    <span class="bell">
                        <a-icon type="bell"
                                style="font-size:18px" />
                    </span>
                    <span class="user-info">

                        <a-dropdown>
                            <a class="ant-dropdown-link"
                               @click="e => e.preventDefault()">
                                <a-space>
                                    <a-avatar icon="user" />xiaocao-dev
                                </a-space>
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item>

                                    <a-icon type="bell" />1st menu item

                                </a-menu-item>
                                <a-menu-item>
                                    <a-icon type="down" />个人中心
                                </a-menu-item>
                                <a-menu-item>
                                    <a-icon type="down" />退出登录
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </span>

                </div>

            </a-col>
        </a-row>
    </div>

</template>

<script>
import { SrverInfo } from '@/api/restful/restful'
import { bytesFormatter } from '@/utils/utils'
export default {
    data () {
        return {
            serverInfo: {},
            disks: []
        }
    },
    methods: {
        bytesFormatter
    },
    mounted () {
        SrverInfo.get().then(res => {
            this.serverInfo = res
            this.disks = JSON.parse(this.serverInfo.disk.replace(/'/g, '"').replace(/False/g, 'false'))
        })
    },
    computed: {

    }

}
</script>

<style lang="less" scoped>
.header {
    padding: 0 30px;
    // background-color: hotpink;
    // font-size: 12.5px;

    .info {
        float: right;
        position: relative;
        left: -15px;

        .user-info {
            padding: 0 20px;
            display: inline-block;

            &:hover {
                background-color: rgb(230, 230, 230);
            }
        }

        .bell {
            display: inline-block;
            text-align: center;
            width: 50px;
            &:hover {
                background-color: rgb(230, 230, 230);
            }
        }
    }

    .load {
        float: right;
    }
}
</style>
