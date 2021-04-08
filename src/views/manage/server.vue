<template>
    <div class="main">
        <a-button type="primary"
                  style="margin-bottom:10px">创建授权</a-button>
        <a-table class="table"
                 :columns="columns"
                 :data-source="servers">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
            <span slot="customTitle">
                <a-icon type="desktop" /> 服务器名称
            </span>
            <span slot="tags"
                  slot-scope="tags">
                <a-tag v-for="tag in tags"
                       :key="tag"
                       :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                    {{ tag.toUpperCase() }}
                </a-tag>
            </span>
            <span slot="licence"
                  slot-scope="licence">
                <input :value="licence"
                       class="text"
                       readonly />
            </span>
            <span slot="action"
                  slot-scope="text, record">
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> More actions
                    <a-icon type="down" />
                </a>
            </span>

        </a-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' }
    },
    {
        title: 'IP地址',
        dataIndex: 'ip',
        key: 'ip'
    },
    {
        title: 'LICENSE',
        dataIndex: 'licence',
        key: 'licence',
        scopedSlots: { customRender: 'licence' }
    },
    {
        title: '授权类型',
        key: 'type',
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: '剩余时间',
        key: 'expiration_time',
        dataIndex: 'expiration_time'

    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }

]

export default {
    data () {
        return {

            columns
        }
    },
    computed: {
        ...mapState('authCenter', ['servers'])
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
