<template>
    <a-modal v-model="visible"
             title="注册账号"
             @ok="handleOk"
             :confirm-loading="confirmLoading"
             :centered="true"
             :width="700"
             :okText="`确定注册`"
             :cancelText="`取消`">
        <div class="form-container">
            <a-form-model ref="Form"
                          :model="Form"
                          :rules="rules"
                          :layout="'horizontal'"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          :labelAlign="'left'">
                <a-form-model-item label="账号"
                                   prop="user_name">
                    <a-input v-model="Form.user_name" />
                </a-form-model-item>
                <a-form-model-item label="密码"
                                   prop="password">
                    <a-input-password v-model="Form.password" />
                </a-form-model-item>
                <a-form-model-item label="重复密码"
                                   prop="checkPassword">
                    <a-input-password v-model="Form.checkPassword" />
                </a-form-model-item>
                <a-form-model-item label="QQ"
                                   prop="qq">
                    <a-input v-model="Form.qq" />
                </a-form-model-item>
                <a-form-model-item label="邮箱"
                                   prop="email">
                    <a-input v-model="Form.email" />
                </a-form-model-item>
                <!-- <a-form-model-item label="邮箱验证码"
                                   prop="code"
                                   :wrapperCol="{span:13}">
                    <a-input v-model.number="Form.code" />
                </a-form-model-item> -->
            </a-form-model>
            <!-- <a-button class="get-code"
                      type="">获取</a-button> -->
        </div>

    </a-modal>
</template>
<script>
import { register } from '@/api/restful/auth.center'
export default {

    data () {
        return {
            Form: {
                user_name: '',
                password: '',
                checkPassword: '',
                qq: '',
                email: '',
                code: '',
                promoter: null

            },
            rules: {
                user_name: [
                    { required: true, message: '请输入帐户名', trigger: 'blur' },
                    { min: 6, max: 15, message: '用户名6-15个字符', trigger: 'blur' },
                    { pattern: '^[0-9a-zA-Z]+$', message: '用户名只能是字母和数字', trigger: 'blur' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码6-15个字符', trigger: 'blur' },
                    { pattern: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/, message: '至少包含大小写字母、数字、符号中的两项', trigger: 'blur' }
                ],
                checkPassword: [

                    { required: true, message: '请重复输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.Form.password) {
                                callback(new Error('两次密码不一致'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                qq: [
                    { required: true, message: '请输入QQ号', trigger: 'blur' },
                    { min: 5, max: 13, message: '请输入正确QQ号', trigger: 'blur' },
                    { pattern: '^[0-9]+$', message: '请输入正确QQ号', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入您的邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 6, max: 6, message: '验证码为6位数', trigger: 'blur' }
                ]
            },
            visible: false,
            confirmLoading: false
        }
    },
    methods: {
        showModal () {
            this.visible = true
        },
        handleOk (e) {
            this.$refs.Form.validate(vlaid => {
                if (vlaid) {
                    // 获取推广人信息
                    this.Form.promoter = this.$route.query.promoter
                    this.confirmLoading = true

                    register(this.Form)
                        .then(res => {
                            this.confirmLoading = false
                            this.$message.success('注册成功！')
                            this.visible = false
                        })
                        .catch(err => {
                            if (err.response.status === 406) {
                                this.$message.error(err.response.data.detail)
                            } else {
                                this.$message.error('未知错误')
                            }
                            this.confirmLoading = false

                            console.log(err.response)
                        })
                }
            })
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
        left: 335px;
        top: -60px;
    }
}
</style>
