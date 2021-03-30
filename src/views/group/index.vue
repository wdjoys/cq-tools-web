<template>
    <div>
        <a-row>
            <a-col :md="24"
                   :xl="12"
                   :xxl="8"
                   class="card">
                <router-link :to="{ name:'group-edit'}">
                    <a-button type=""
                              style="width:100%;height:217px">
                        <a-icon type="plus" />创建分区
                    </a-button>
                </router-link>

            </a-col>
            <a-col v-for="group in groups"
                   :key="group.id"
                   :md="24"
                   :xl="12"
                   :xxl="8"
                   class="card">

                <a-card :title="group.name">
                    <template slot="extra">

                        <a-popconfirm title="Are you sure delete this group?"
                                      placement="bottom"
                                      ok-text="Yes"
                                      cancel-text="No"
                                      @confirm="delete_group(group)">
                            <a style="margin-right:10px">删除</a>
                        </a-popconfirm>
                        <router-link :to="{
                                     name:'group-edit',
                                     params: group
                        }">
                            编辑
                        </router-link>
                    </template>

                    <p><span>分组列表地址：</span>
                        <input :ref="`${group.id}-url`"
                               v-model="group.root_server_path"
                               class="text"
                               readonly />
                        <a-icon type="copy"
                                class="copy"
                                @click="copy(`${group.id}-url`)" />
                    </p>
                    <p><span>服务端根路径：</span>
                        <input :ref="`${group.id}-path`"
                               v-model="group.root_server_path"
                               class="text"
                               readonly />
                        <a-icon type="copy"
                                class="copy"
                                @click="copy(`${group.id}-path`)" />
                    </p>

                    <p>列表更新时间：{{$moment(group.update_time*1000).format("YYYY MMMM Do , hh:mm:ss")}}</p>
                </a-card>
            </a-col>

        </a-row>

    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            groups: []
        }
    },
    methods: {
        ...mapActions(['getGroup', 'deleteGroup']),
        getGroupData () {
            this.getGroup()
                .then(res => {
                    this.groups = res
                })
                .catch()
        },
        delete_group (group) {
            this.deleteGroup(group)
                .then(res => {
                    console.log(res)
                    this.getGroupData()
                })
                .catch()
        },

        copy (ref) {
            // console.log(this.$refs[ref])
            this.$refs[ref][0].select()
            document.execCommand('Copy')
            this.$message.success('复制成功')
        }
    },
    mounted () {
        this.getGroupData()
    }
}
</script>
<style lang='less' scoped>
.card {
    padding: 0px 20px 20px 00px;

    // &:nth-child(2) {
    // }

    .text {
        width: calc(100% - 130px);
        height: 24px;
        background-color: rgb(213, 221, 255);
        padding: 1px 8px;
        border: none;
        outline: 0;
    }
    .copy {
        margin: 3px;
        float: right;
        font-size: 17px;
        // color: rgb(114, 199, 248);
    }
}
</style>
