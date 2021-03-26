<template>
    <a-form-model :model="formInline"
                  @submit="handleSubmit"
                  :labelCol="{span:4}"
                  :wrapperCol="{span:14}">
        <a-form-model-item label="分组名称">
            <a-input v-model="formInline.user">

            </a-input>
        </a-form-model-item>
        <a-form-model-item label="版本路径">
            <a-input v-model="formInline.user">
            </a-input>
        </a-form-model-item>
        <a-form-model-item label="列表模板">
            <a-textarea v-model="formInline.user"
                        :auto-size="{ minRows: 10, maxRows:20 }"
                        class="pre" />
        </a-form-model-item>

        <a-form-model-item label="可用变量">
            电信ip：<a @click="insert_var('s')">{ip}</a>，
            联通ip：<a>{ip}</a>，
            移动ip：<a>{ip}</a>，
            登录端口：<a>{port}</a>，
            微端ip：<a>{micro_server_ip}</a>，
            微端端口：<a>{micro_server_port}</a>，
            年：<a>{year}</a>，
            月：<a>{month}</a>，
            日：<a>{day}</a>，
            时：<a>{hour}</a>，
            分：<a>{minute}</a>，
            秒：<a>{second}</a>，
        </a-form-model-item>
        <a-form-model-item label="分区模板">
            <a-textarea v-model="formInline.user"
                        :auto-size="{ minRows: 10, maxRows:20}"
                        class="pre"
                        ref="textarea" />
        </a-form-model-item>

    </a-form-model>
</template>
<script>
export default {
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit (e) {
            console.log(this.formInline)
        },
        insert_var (str) {
            const obj = this.$refs.textarea
            if (document.selection) {
                var sel = document.selection.createRange()
                sel.text = str
            } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart
                var endPos = obj.selectionEnd
                var cursorPos = startPos
                var tmpStr = obj.value
                obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
                cursorPos += str.length
                obj.selectionStart = obj.selectionEnd = cursorPos
            } else {
                obj.value += str
            }
        }
    }
}
</script>

<style lang="less" scoped>
.pre {
    width: 100%;
    white-space: nowrap;
    overflow: scroll;
}
</style>
