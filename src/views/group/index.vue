<template>
    <div>
        <a-row>
            <a-col :md="24"
                   :xl="12"
                   :xxl="8"
                   style="padding:10px">
                <a-button type=""
                          style="width:100%;height:217px">
                    <a-icon type="plus" />创建分区
                </a-button>
            </a-col>
            <a-col v-for="group in groups"
                   :key="group.id"
                   :md="24"
                   :xl="12"
                   :xxl="8"
                   style="padding:10px">

                <a-card :title="group.name"
                        class="card">
                    <a slot="extra"
                       href="#">编辑</a>
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

                    <p>列表更新时间：</p>
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
        ...mapActions(['getGroup']),
        getGroupData () {
            this.getGroup()
                .then(res => {
                    this.groups = res
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
    display: inline-block;

    width: 100%;

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
