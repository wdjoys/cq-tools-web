<template>
    <a-modal v-model="show"
             title="注册账号"
             @ok="handleOk"
             @cancel="handleOk"
             :centered="true"
             :width="700"
             :okText="`确定注册`"
             :cancelText="`取消`">
        <div class="form-container">
            <a-form-model ref="Form"
                          :model="Form"
                          :rules="rules"
                          :layout="'horizontal'"
                          :labelCol="{span:5}"
                          :wrapperCol="{span:19}"
                          :labelAlign="'left'">
                <a-form-model-item label="账号"
                                   prop="account">
                    <a-input v-model="Form.pass"
                             type="password"
                             autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item label="密码"
                                   prop="age">
                    <a-input v-model.number="Form.age" />
                </a-form-model-item>
                <a-form-model-item label="重复密码"
                                   prop="age">
                    <a-input v-model.number="Form.age" />
                </a-form-model-item>
                <a-form-model-item label="QQ"
                                   prop="checkPass">
                    <a-input v-model="Form.checkPass"
                             type="password"
                             autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item label="邮箱"
                                   prop="checkPass">
                    <a-input v-model="Form.checkPass"
                             type="password"
                             autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item label="验证码"
                                   prop="age"
                                   :wrapperCol="{span:12}">
                    <a-input v-model.number="Form.age" />
                </a-form-model-item>
            </a-form-model>
            <a-button class="get-code"
                      type="">获取验证码</a-button>
        </div>

    </a-modal>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'show',
        event: 'changShow'
    },
    data () {
        return {
            Form: {

            },
            rules: {}
        }
    },
    methods: {
        showModal () {
            this.visible = true
        },
        handleOk (e) {
            console.log(e)
            this.$emit('changShow', false)
        }
    }
}
</script>

<style lang="less" scoped>
.form-container {
    width: 400px;
    margin: 0 auto;
    // background-color: green;

    .get-code {
        position: relative;
        left: 298px;
        top: -60px;
    }
}
</style>
