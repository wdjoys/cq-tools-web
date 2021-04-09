<template>
    <div>
        <h1 class="title"># 个人信息</h1>

        <a-descriptions bordered
                        class="cell">
            <a-descriptions-item label="用户名">
                {{user.user_name}}
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">

                <input type="text"
                       class="email"
                       :style="{backgroundColor:bgColor}"
                       :disabled="emailDisable"
                       v-model="user.email">

                <a-tag color="green"
                       v-if="!user.disable">已验证</a-tag>
                <!-- <a-tag color="red"
                       v-else>未验证</a-tag> -->
                <template v-else>
                    <a-button type="primary"
                              size="small"
                              @click="changEmail"
                              class="button">{{emailButtonText}}</a-button>
                    <a-button type="primary"
                              size="small"
                              class="button"
                              @click="sendEmail"
                              :loading="emailButtonLoading">验证</a-button>

                </template>

            </a-descriptions-item>
            <a-descriptions-item label="QQ">
                {{user.qq}}
            </a-descriptions-item>
            <a-descriptions-item label="剩余金额">
                {{user.coin}}
            </a-descriptions-item>
            <a-descriptions-item label="最后登录时间">
                {{user.last_login_time}}
            </a-descriptions-item>
        </a-descriptions>
        <a-divider></a-divider>
        <h1 class="title"># 我得推广</h1>

        <a-descriptions bordered
                        class="cell">
            <a-descriptions-item label="推广人数">
                16
            </a-descriptions-item>
            <a-descriptions-item label="推广分成">
                20% + 5%
            </a-descriptions-item>
            <a-descriptions-item label="推广收入">
                856元
            </a-descriptions-item>
            <a-descriptions-item label="推广链接"
                                 span="3">
                http:{{domain}}/user/login?promoter={{user.id}}
            </a-descriptions-item>
            <a-descriptions-item label="系统文案"
                                 span="3">
                http:{{domain}}/user/login?promoter={{user.id}}
            </a-descriptions-item>
            <a-descriptions-item label="推广说明"
                                 span="3">

                <li>用户通过推广链接注册，并激活账户，推广人与被推广人各得10元</li>
                <li>被推广人首次充值，推广人获得其充值金额的20%返利</li>
                <li>被推广人后续充值，推广人获得其充值金额的5%返利</li>

            </a-descriptions-item>

        </a-descriptions>

        <a-divider></a-divider>
        <h1 class="title"># 金币记录</h1>
        <a-table :columns="columns"
                 :data-source="coinLogs"
                 size="middle"
                 style="background-color:#fff">
            <span slot="coin"
                  slot-scope="text,record">
                {{ record.after-record.before}}
            </span>
            <span slot="time"
                  slot-scope="time">
                {{$moment(time*1000).format('YYYY-MM-D, HH:mm:ss')}}
            </span>
            <span slot="type"
                  slot-scope="type">
                {{coinLogType[type-1].name}}
            </span>

        </a-table>

    </div>
</template>
<script>

import { sendActiceMessage, changeEmail } from '@/api/restful/auth.center'
import { mapState, mapActions } from 'vuex'
const columns = [
    {
        title: '类型',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: '时间',
        dataIndex: 'time',
        scopedSlots: { customRender: 'time' }
    },
    {
        title: '金额',
        scopedSlots: { customRender: 'coin' }
    },
    {
        title: '变化前',
        dataIndex: 'before'
    },
    {
        title: '变化后',
        dataIndex: 'after'
    }
]
export default {
    data () {
        return {
            domain: window.location.host,
            columns,
            emailButtonText: '修改邮箱',
            emailButtonLoading: false,
            emailDisable: true,
            bgColor: '#fff'

        }
    },
    methods: {
        ...mapActions('authCenter', ['getCoinLogs', 'getCoinLogType']),
        sendEmail () {
            this.emailButtonLoading = true
            sendActiceMessage()
                .then(res => {
                    this.emailButtonLoading = false
                    this.$message.success('激活邮件已发送！')
                })
                .catch()
        },
        changEmail () {
            if (this.emailDisable) {
                this.emailButtonText = '确定修改'
                this.bgColor = '#d9d9d9'
                this.emailDisable = false
            } else {
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/
                console.log(reg.test(this.user.email), 2342342)
                if (reg.test(this.user.email)) {
                    this.emailButtonText = '正在修改'
                    changeEmail(this.user.email)
                        .then(res => {
                            this.bgColor = '#fff'
                            this.emailDisable = true
                            this.emailButtonText = '修改邮箱'
                            this.$message.success('邮箱修改成功！')
                        })
                        .catch(err => {
                            this.emailButtonText = '修改邮箱'

                            this.$message.error(err.response.data.detail)
                        }

                        )
                } else {
                    this.$message.error('邮箱地址不合法！')
                }
            }
        }
    },
    computed: {
        ...mapState('authCenter', ['user', 'coinLogs', 'coinLogType'])
    },
    mounted () {
        // console.log(this.coinLogs, this.coinLogs.length === 0, '1111')
        this.coinLogs.length === 0 && this.getCoinLogs()
        this.coinLogType.length === 0 && this.getCoinLogType()
    }
}
</script>
<style lang='less' scoped>
.cell {
    background-color: #fff;
}

.title {
    font-weight: 600;
    font-size: 18px;
}

.button {
    margin: 0 4px;
}
.email {
    width: 200px;
    height: 24px;

    padding: 1px 8px;
    border: none;
    outline: 0;
}
</style>
