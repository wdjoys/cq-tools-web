<template>
    <div class="main">
        <div>
            <a-form-model :labelCol="{span:5}"
                          :wrapperCol="{span:14}"
                          v-model="cosData">
                <a-form-model-item label="付费">
                    <a-input />
                </a-form-model-item>
            </a-form-model>
        </div>
    </div>
</template>
<script>
import { Config } from '@/api/restful/restful'
export default {
    data () {
        return {
            cosData: []
        }
    },
    methods: {

    },
    mounted () {
        Config.get()
            .then(res => { console.log(res) })
            .catch()
    }
}
</script>
<style lang='less' scoped>
.main {
    background-color: #fff;
    min-height: 500px;
}
</style>
