<template>
    <div>
        <a-table :columns="columns"
                 :data-source="service"
                 :pagination="false"
                 class="main"
                 rowKey="id">
            <a slot="name"
               slot-scope="text">{{ text }}</a>

            <span slot="state"
                  slot-scope="state,record">
                <a-tag :color="formateState(record)[1]">
                    {{formateState(record)[0]}}
                </a-tag>
            </span>
            <span slot="start_time"
                  slot-scope="start_time">
                {{$moment(start_time*1000).format("YYYY-MM-D ,  HH:mm:ss")}}
            </span>
            <span slot="player"
                  slot-scope="player">
                <a>{{player}}
                    <a-icon type="line-chart"
                            style="margin-left:5px" />
                </a>
            </span>

            <span slot="action"
                  slot-scope="text, record">
                <a>开区</a>
                <a-divider type="vertical" />
                <a>关区</a>
                <a-divider type="vertical" />
                <a>合区</a>
                <a-divider type="vertical" />
                <a @click="()=>{
                     $refs.m2log.service_id = record.id
                     $refs.m2log.getM2Log()
                    $refs.m2log.visible=true}">M2日志</a>
                <a-divider type="vertical" />
                <a>网关日志</a>
                <a-divider type="vertical" />

                <a-popconfirm title="Are you sure delete this service?"
                              @confirm="delete_(record)">
                    <a>删除</a>
                </a-popconfirm>
            </span>
        </a-table>
        <M2Log ref='m2log' />
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import M2Log from './M2Log'
const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        title: '分区名称'
    },

    {
        title: '开区时间',
        dataIndex: 'start_time',
        key: 'start_time',
        scopedSlots: { customRender: 'start_time' }
    },
    {
        title: '在线人数',
        dataIndex: 'player',
        key: 'player',
        scopedSlots: { customRender: 'player' }
    },

    {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        scopedSlots: { customRender: 'state' }
    },
    {
        title: '备份',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' }
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
]

export default {
    components: { M2Log },
    data () {
        return {
            columns
        }
    },
    methods: {
        ...mapActions('service', ['get', 'delete']),
        ...mapActions('task', ['task_not_execute']),
        formateState (record) {
            const nowTimeStamp = new Date().getTime() / 1000
            if (record.state) {
                if (record.start_time < nowTimeStamp) {
                    return ['正式开区', 'green']
                } else {
                    return ['测试开区', 'cyan']
                }
            } else {
                if (record.test_time > nowTimeStamp) {
                    return ['等待测试', '#2db7f5']
                } else {
                    return ['关闭', '#f50']
                }
            }
        },

        delete_ (record) {
            this.delete(record)
                .then(res => {
                    this.getTableData()
                })
                .catch()
        }

    },
    computed: {
        ...mapState('service', ['service'])

    },
    async mounted () {
        this.service.length === 0 && this.get()

        // 定时检查任务
        setInterval(async () => {
            await this.task_not_execute() && this.get()
        }, 2000)
    }
}
</script>

<style lang="less" scoped>
.main {
    background-color: #fff;
}
</style>
