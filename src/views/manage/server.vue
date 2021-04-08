<template>
    <div class="main">
        <a-button type="primary"
                  style="margin-bottom:10px"
                  @click="visible=true">创建授权</a-button>
        <a-table class="table"
                 :columns="columns"
                 :data-source="servers"
                 rowKey="licence">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
            <span slot="customTitle">
                <a-icon type="desktop" /> 服务器名称
            </span>
            <span slot="type"
                  slot-scope="type,record">
                <a-tag v-if="timeStampNow < record.expiration_time"
                       color="red">
                    付费
                </a-tag>
                <a-tag v-else
                       color="geekblue">
                    免费
                </a-tag>
            </span>

            <span slot="licence"
                  slot-scope="licence">
                <input :value="licence"
                       class="text"
                       readonly />
            </span>
            <span slot="expiration_time"
                  slot-scope="time">
                <template v-if="timeStampNow < time">{{$moment.duration(timeStampNow-time, "seconds").humanize()}}</template>
                <template v-else>无限期</template>
            </span>
            <span slot="action"
                  slot-scope="text, record">

                <template v-if="timeStampNow < record.expiration_time">
                    <a>续期</a>
                    <a-divider type="vertical" />
                    <a>转移</a>
                </template>
                <template v-else>
                    <a>升级</a>
                    <a-divider type="vertical" />
                    <a>删除</a>
                </template>

            </span>

        </a-table>

        <a-modal title="创建授权"
                 v-model="visible"
                 :confirm-loading="confirmLoading"
                 maskClosable
                 @ok="handleOk">
            <a-form-model :labelCol="{span:5}"
                          :wrapperCol="{span:15}"
                          v-model="Form"
                          ref="Form"
                          :rules="FormRules">
                <a-form-model-item label="名称备注"
                                   prop="name">
                    <a-input v-model="Form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="服务器IP"
                                   prop="ip">
                    <a-input v-model="Form.ip"></a-input>
                </a-form-model-item>
                <a-form-model-item label="付费时长">
                    <a-select v-model="Form.card">
                        <a-select-option v-for="card in cards"
                                         :key="card.days"
                                         :value="card.type">
                            {{card.type}}卡 - 价格：{{card.price}} - 时长： {{card.days}}天
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

            </a-form-model>
        </a-modal>
    </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
const columns = [
    {
        dataIndex: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' }
    },
    {
        title: 'IP地址',
        dataIndex: 'ip'
    },
    {
        title: 'LICENSE',
        dataIndex: 'licence',
        scopedSlots: { customRender: 'licence' }
    },
    {
        title: '授权类型',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: '剩余时间',
        dataIndex: 'expiration_time',
        scopedSlots: { customRender: 'expiration_time' }

    },
    {
        title: '操作',

        scopedSlots: { customRender: 'action' }
    }

]

export default {
    data () {
        return {
            columns,
            timeStampNow: new Date().getTime() / 1000,
            visible: false,
            confirmLoading: false,
            Form: {
                name: '',
                ip: '',
                card: ''
            },
            FormRules: {
                name: [],
                ip: [],
                card: []
            }

        }
    },
    methods: {
        ...mapActions('authCenter', ['getCards']),
        handleOk (e) {
            this.confirmLoading = true
            console.log(this.Form)
            setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
            }, 2000)
        }

    },
    computed: {
        ...mapState('authCenter', ['servers', 'cards'])
    },
    mounted () {
        this.getCards()
    }
}
</script>

<style lang="less" scoped>
.main {
    .table {
        background-color: #fff;
    }
    .text {
        height: 24px;
        background-color: rgb(213, 221, 255);
        padding: 1px 8px;
        border: none;
        outline: 0;
    }
}
</style>
