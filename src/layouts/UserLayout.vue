<template>
    <div class="userlayout">
        <div class="contaier">
            <div class="top">
                <i-header />
                <router-view />
            </div>
        </div>
        <i-footer class="footer" />
    </div>
</template>

<script>
import { Footer, Header } from '@/components'

export default {
    name: 'UserLayout',
    components: { 'i-header': Header, 'i-footer': Footer }
}
</script>

<style lang="less" scoped>
.userlayout {
    height: 100%;
    background: #eceef1 url(~@/assets/background.svg) no-repeat 50%;

    .contaier {
        height: calc(100vh - 75px);

        .top {
            position: relative;
            top: 43%;
            transform: translateY(-50%);
        }
    }

    .footer {
        height: 64px;
    }
}
</style>
