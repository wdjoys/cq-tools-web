<template>
    <div class="main">
        <a-button type="primary"
                  icon="plus"
                  style="margin-bottom:15px"
                  @click="create">创建分区</a-button>
        <service />
        <createService ref="createService" />
    </div>
</template>

<script>

import { service, createService } from '@/components/service/'
export default {
    components: { service, createService },
    data () {
        return {

        }
    },

    methods: {
        create () {
            this.$refs.createService.visible = true
        }
    },
    mounted () {

    }
}
</script>

<style lang="less" scoped>
.main {
    background-color: #fff;
    padding: 20px;
}
</style>
