<template>
    <div class="main">
        <a-button type="primary"
                  icon="plus"
                  style="margin-bottom:15px"
                  @click="()=>{visible=true;inputDisable=false}">创建授权</a-button>
        <a-table class="table"
                 :columns="columns"
                 :data-source="servers"
                 rowKey="ip">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
            <span slot="customTitle">
                <a-icon type="desktop" /> 服务器名称
            </span>
            <span slot="type"
                  slot-scope="type,record">
                <a-tag v-if="timeStampNow() < record.expiration_time"
                       color="red">
                    高级
                </a-tag>
                <a-tag v-else
                       color="geekblue">
                    免费
                </a-tag>
            </span>

            <span slot="expiration_time"
                  slot-scope="time">
                <template v-if="timeStampNow() < time">{{$moment.duration(timeStampNow()-time, "seconds").humanize()}}</template>
                <template v-else>无限期</template>
            </span>
            <span slot="action"
                  slot-scope="text, record">
                <a @click="down(record)">
                    <a-icon type="download" /> 下载 licence
                </a>
                <a-divider type="vertical" />
                <template v-if="timeStampNow() < record.expiration_time">
                    <a @click="auth(record)">续期</a>
                    <a-divider type="vertical" />
                    <a>转移</a>
                </template>
                <template v-else>
                    <a @click="auth(record)">升级</a>
                    <a-divider type="vertical" />

                    <a-popconfirm title="Are you sure delete this server?"
                                  ok-text="Yes"
                                  cancel-text="No"
                                  @confirm="delete_(record)">
                        <a>删除</a>
                    </a-popconfirm>
                </template>

            </span>

        </a-table>

        <a-modal title="创建授权"
                 v-model="visible"
                 :confirm-loading="confirmLoading"
                 centered
                 @ok="handleOk">
            <a-form-model :labelCol="{span:5}"
                          :wrapperCol="{span:15}"
                          :model="Form"
                          ref="Form"
                          :rules="FormRules">
                <a-form-model-item label="名称备注"
                                   prop="name">
                    <a-input :disabled="inputDisable"
                             v-model="Form.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="服务器IP"
                                   prop="ip">
                    <a-input :disabled="inputDisable"
                             v-model="Form.ip"></a-input>
                </a-form-model-item>
                <a-form-model-item label="付费时长"
                                   prop="card">
                    <a-select v-model="Form.card">
                        <template v-for="card in cards">
                            <a-select-option :key="card.days"
                                             :value="card.type"
                                             v-if="!inputDisable || card.type!=='免费'">
                                {{card.type}}卡 - 价格：{{card.price}} - 时长： {{card.days}}天
                            </a-select-option>
                        </template>

                    </a-select>
                </a-form-model-item>

            </a-form-model>
        </a-modal>
    </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import { getServerLicence } from '@/api/restful/auth.center'
import { exportRaw } from '@/utils/utils'
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
            timeStampNow: () => new Date().getTime() / 1000,
            visible: false,
            confirmLoading: false,
            Form: {
                name: '',
                ip: '',
                card: ''
            },
            FormRules: {
                name: [
                    { required: true, message: '请填写服务器名称', trigger: 'blur' },
                    { max: 15, min: 3, message: '限制3-15个字符', trigger: 'blur' }
                ],
                ip: [
                    { required: true, message: '请填写服务器IP', trigger: 'blur' },
                    { pattern: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/, message: '请填写正确服务器IP', trigger: 'blur' }],
                card: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ]

            },
            inputDisable: false

        }
    },
    methods: {
        ...mapActions('authCenter', ['getCards', 'serverAuthor', 'deleteServer']),
        handleOk (e) {
            this.$refs.Form.validate(valid => {
                if (valid) {
                    this.confirmLoading = true
                    this.serverAuthor(this.Form)
                        .then(res => {
                            this.confirmLoading = false
                            this.visible = false
                            this.$message.success('操作成功')
                            console.log(res)
                        })
                        .catch(err => {
                            this.confirmLoading = false
                            this.$message.error(err.response.data.detail)
                            console.log(err.response.data)
                        })
                }
            })
        },
        auth (record) {
            this.visible = true
            this.Form.name = record.name
            this.Form.ip = record.ip
            this.Form.card = null
            this.inputDisable = true
        },
        delete_ (record) {
            this.deleteServer(record)
                .then(res => {
                    this.$message.success('删除成功！')
                })
                .catch()
        },
        down (record) {
            getServerLicence(record)
                .then(res => {
                    exportRaw('licence.lic', res)
                })
                .catch()
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
    background-color: #fff;
    padding: 20px;
}
</style>
