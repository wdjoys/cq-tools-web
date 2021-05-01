<template>
    <div class="login">
        <a-tabs default-active-key="1"
                :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
            <a-tab-pane key="1"
                        tab="帐号密码登录">

                <a-form-model layout="horizontal"
                              ref="loginForm"
                              :model="formInline"
                              :rules="rules"
                              @submit="handleSubmit"
                              @submit.native.prevent>
                    <a-form-model-item prop="username">
                        <a-input v-model="formInline.username"
                                 size="large"
                                 placeholder="请输入用户名">
                            <a-icon slot="prefix"
                                    type="user"
                                    style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="password">
                        <a-input-password v-model="formInline.password"
                                          size="large"
                                          placeholder="请输入密码">
                            <a-icon slot="prefix"
                                    type="lock"
                                    style="color:rgba(0,0,0,.25)" />
                        </a-input-password>
                    </a-form-model-item>
                    <a-form-model-item :hidden="errorHidden">
                        <a-alert :message="errmessage "
                                 type="error"
                                 show-icon />
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-checkbox v-model="formInline.checked">
                            24小时自动登录
                        </a-checkbox>
                        <a style="float:right"
                           @click="()=>{$refs.LostPassword.showModal()}">忘记密码</a>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-button type="primary"
                                  html-type="submit"
                                  block
                                  size="large"
                                  :loading="loading">
                            登录
                        </a-button>
                    </a-form-model-item>
                </a-form-model>
            </a-tab-pane>
            <!-- <a-tab-pane key="2"
                        tab="手机扫码登录">
                <qr-login style="width:250px" />
            </a-tab-pane> -->
        </a-tabs>
        <a @click="()=>{$refs.Register.showModal()}">注册用户</a>
        <Register ref="Register" />
        <LostPassword ref="LostPassword" />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
// import QrLogin from './QrLogin'
import Register from './Register'
import LostPassword from './LostPassword'
export default {
    components: { Register, LostPassword },
    name: 'Login',
    data () {
        return {
            errmessage: '',
            errorHidden: true,
            formInline: {
                username: '',
                password: '',
                checked: false
            },
            rules: {
                username: [
                    { required: true, message: '请输入帐户名', trigger: 'blur' },
                    { min: 6, max: 18, message: '用户名6-18个字符', trigger: 'blur' },
                    { pattern: '^[0-9a-zA-Z]+$', message: '用户名只能是字母和数字', trigger: 'blur' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码6-18个字符', trigger: 'blur' }
                ]

            },
            loading: false

        }
    },
    methods: {
        ...mapActions('authCenter', ['login']),

        handleSubmit () {
            const { Login } = this
            // 校验输入是否符合规则
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.login(this.formInline)
                        .then(res => {
                            this.loading = false
                            console.log(res)
                            if (res.disable) {
                                this.$notification('用户未激活，请验证邮箱！')
                            }
                            this.$router.push({ path: '/workplace/home' })
                        })
                        .catch(err => {
                            this.loading = false
                            console.log(err)
                            if (err.response.status === 401) {
                                this.$notification.open({
                                    message: '登录失败',
                                    description:
                                        '请确认用户密码是否匹配！',
                                    icon: <a-icon type="safety" style="color: #ff0000" />
                                })
                            }
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
    // beforeCreate () {
    //     if (this.$store.getters.GetInfo.token) {
    //         this.$router.push({ path: '/workplace/report-forms' })
    //     }
    // }
}
</script>

<style lang="less" scoped>
.login {
    width: 370px;
    height: 300px;
    margin: 30px auto 0;
    a-tabs {
        text-align: center;
    }
}
</style>
