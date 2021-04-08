<template>
    <div class="header">
        <a-row>
            <a-col :span="2">
                <a-dropdown>

                    <div class="select-server">
                        <a-icon type="database" />
                        切换服务器
                        <a-icon type="down" />
                    </div>
                    <a-menu slot="overlay">
                        <a-menu-item :key="server.ip"
                                     v-for="server in servers"
                                     @click="selecetServer(server)">

                            <a-icon type="desktop" /> {{server.name}}

                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-col>
            <a-col :span="18">
                <a-space :size="20">
                    <div v-if="server">
                        <span>
                            {{server.name}}
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
                    </div>

                </a-space>
            </a-col>

            <a-col :span="4">
                <div class="info">
                    <span class="bell">
                        <a-icon type="bell"
                                style="font-size:18px" />
                    </span>

                    <a-dropdown>
                        <span class="user-info">
                            <a class="ant-dropdown-link"
                               @click="e => e.preventDefault()">
                                <a-space>
                                    <a-avatar icon="user" />{{user.user_name}}
                                </a-space>
                            </a>
                        </span>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a-icon type="account-book" /> 授权管理
                            </a-menu-item>
                            <a-menu-item>
                                <a-icon type="user" />个人中心
                            </a-menu-item>
                            <a-menu-item>
                                <a-icon type="user" />推荐返利
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item @click="logout_">
                                <a-icon type="poweroff" />退出登录
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>

                </div>

            </a-col>
        </a-row>
    </div>

</template>

<script>
import { SrverInfo } from '@/api/restful/restful'
import { bytesFormatter } from '@/utils/utils'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    data () {
        return {
            serverInfo: {},
            disks: []
        }
    },
    methods: {
        bytesFormatter,
        ...mapActions('authCenter', ['getUserInfo', 'getServers', 'logout']),
        ...mapMutations(['SET_SERVER_INFO']),

        logout_ () {
            this.logout()
            this.$router.push({ path: '/user/login' })
        },
        selecetServer (server) {
            // console.log(server, 'dd')
            this.SET_SERVER_INFO(server)
            window.location.reload()
            // console.log(this.serverInfo, '11')
        }
    },
    mounted () {
        SrverInfo.get().then(res => {
            this.serverInfo = res
            this.disks = JSON.parse(this.serverInfo.disk.replace(/'/g, '"').replace(/False/g, 'false'))
        })

        if (Object.getOwnPropertyNames(this.user).length === 1) {
            this.getUserInfo()
            this.getServers()
        }
    },
    computed: {
        ...mapState('authCenter', ['user', 'servers']),
        ...mapGetters({ server: 'get_server' })
    }

}
</script>

<style lang="less" scoped>
.header {
    padding: 0 30px;
    // background-color: hotpink;
    // font-size: 12.5px;

    .select-server {
        color: rgb(64, 169, 255);
    }

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
