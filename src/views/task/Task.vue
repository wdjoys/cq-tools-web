<template>
    <div class="main">
        <a-table :columns="columns"
                 :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
            <span slot="customTitle">
                <a-icon type="smile-o" /> Name
            </span>
            <span slot="tags"
                  slot-scope="tags">
                <a-tag v-for="tag in tags"
                       :key="tag"
                       :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                    {{ tag.toUpperCase() }}
                </a-tag>
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

import { createNamespacedHelpers } from 'vuex'

import task from '@/store/modules/task'
const { mapState, mapActions } = createNamespacedHelpers('task')
const columns = [
    {
        dataIndex: 'name',
        // key: 'name',
        title: '任务名称'
    },
    {
        title: '关联分区',
        dataIndex: 'address'
        // key: 'address'
    }, {
        title: '执行时间',
        dataIndex: 'age'
        // key: 'age'
    },
    {
        title: '模式',
        // key: 'tags',
        dataIndex: 'tags'

    },
    {
        title: '操作',
        // key: 'action',
        scopedSlots: { customRender: 'action' }
    }
]

export default {
    data () {
        return {
            data: [],
            columns
        }
    },
    methods: {
        ...mapActions(['get', 'post'])
    },
    mounted () {
        const xx = { xxx: 1 }
        console.log(xx)
        console.log(task)
        this.get()
            .then(res => {
                console.log(res)
            })
            .catch()
    }
}
</script>

<style lang="less" scoped>
.main {
    background-color: #fff;
}
</style>
