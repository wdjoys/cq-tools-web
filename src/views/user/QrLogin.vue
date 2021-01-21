
<template>
    <div class="main">
        <vue-qr class="img"
                ref="qr"
                :logoScale="20"
                :text="codeValue"
                :margin="0"
                :dotScale="1"
                :size='300' />
        <div class="tips"
             v-if="istTimeout"
             @click="reload">
            <div>
                <a-icon type="redo" />
                <span> 点击刷新</span>
                <p>二维码已经超时失效</p>
            </div>
        </div>
    </div>
</template>

<script>
import vueQr from 'vue-qr'
import { QrCode } from '@/api/user'
import { mapActions, mapState } from 'vuex'
export default {
    components: { vueQr },
    data () {
        return {
            codeValue: '',
            uid: '',
            istTimeout: false

        }
    },
    computed: {
        ...mapState({
            user: state => state.user.info
        })
    },

    methods: {
        ...mapActions(['QrLogin']),
        guid () {
            function S4 () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            }
            return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
        },
        getUserInfo () {
            // console.log(this.user, 'user')
            this.QrLogin({ uuid: this.uid })
                .then(res => {
                    if (!res.is_active) {
                        this.errmessage = '用户被禁用，请联系管理员！'
                        this.errorHidden = false
                    } else if (res.token) {
                        this.$router.push({ path: '/workplace/report-forms' })
                    }
                })
        },
        createUuid () {
            QrCode.post({ uuid: this.uid })
                .then(res => {
                    console.log(res)
                })
        },
        reload () {
            this.istTimeout = !this.istTimeout
            this.init()
        },

        init () {
            let t = 200
            this.uid = this.guid()
            this.codeValue = document.location.origin + '/user/login/?qr-code=' + this.uid
            // 创建二维码请求
            this.createUuid()
            // 定时请求
            const t1 = setInterval(() => {
                if (t > 0 && !this.user.token) {
                    this.getUserInfo()
                    t -= 1
                } else {
                    this.istTimeout = true
                    clearInterval(t1)
                }
            }, 1500)
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style lang="less" scoped>
.main {
    height: 100%;
    width: 10%;
    margin: 10px auto;
    text-align: center;
    img {
        width: 85%;
    }

    .tips {
        background-color: gray;
        height: 240px;
        position: relative;
        top: -225px;
        opacity: 0.9;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
