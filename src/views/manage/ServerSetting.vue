<template>
    <div class="main">

        <div v-if="dataAlready">
            <div class="box">
                <h1 class="title"># 基本配置</h1>
                <a-divider></a-divider>
                <a-form-model :labelCol="{span:5}"
                              :wrapperCol="{span:14}"
                              v-model="config.base"
                              class="form">

                    <a-form-model-item :label="key"
                                       v-for="(value,key) in config_obj.base"
                                       :key="key">
                        <a-input v-model="config_obj.base[key]" />
                    </a-form-model-item>
                </a-form-model>
            </div>

            <a-divider></a-divider>
            <div class="box">
                <h1 class="title"># 腾讯云配置</h1>
                <a-divider></a-divider>
                <a-form-model :labelCol="{span:5}"
                              :wrapperCol="{span:14}"
                              v-model="config_obj.cos"
                              class="form">

                    <a-form-model-item :label="key"
                                       v-for="(value,key) in config_obj.cos"
                                       :key="key">
                        <a-input v-model="config_obj.cos[key]" />
                    </a-form-model-item>
                </a-form-model>

            </div>
            <a-button type="primary"
                      style="width:100%;margin:35px 0px;"
                      @click="submit">全部提交</a-button>
        </div>
        <a-skeleton active
                    v-else />
    </div>
</template>
<script>
import { Config } from '@/api/restful/restful'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    data () {
        return {
            config_obj: {},
            dataAlready: false
        }
    },
    computed: {
        ...mapState('config', ['config'])
    },
    methods: {
        ...mapActions('config', { configActionGet: 'get' }),
        ...mapMutations('config', { configMutationSet: 'SET' }),
        submit () {
            // 查找出数据变动的数据列表，并更新元数据列表
            const configTemp = [...this.config]

            const changedConfig = configTemp.filter(item => {
                if (item.value !== this.config_obj[item.group][item.name]) {
                    item.value = this.config_obj[item.group][item.name]
                    return true
                } else {
                    return false
                }
            })
            // console.log(changedConfig)
            // console.log(this.config)
            // console.log(this.configList)
            if (changedConfig.length === 0) {
                this.$message.error('配置数据无更新')
            } else {
                this.configMutationSet(configTemp)
                new Config().put(changedConfig)
                    .then(res => {
                        console.log(res)
                        this.$message.success('配置数据更新成功')
                    })
                    .catch()
            }
        }
    },
    async mounted () {
        // 如果 config 不存在就请求 此处需要异步改成同步，否则config没获取到无法计算
        this.config.length !== 0 || await this.configActionGet()

        this.config.map(item => {
            // 不存在这个键 需要先创建 否则报错
            if (!(item.group in this.config_obj)) {
                this.config_obj[item.group] = {}
            }
            // console.log(item.name, item.value)
            this.config_obj[item.group][item.name] = item.value
        })
        // console.log(this.config_obj, this.config)
        this.dataAlready = true
    }
}
</script>

<style lang='less' scoped>
.box {
    background-color: #fff;
    padding: 20px;
}
.main {
    // background-color: #fff;
    // min-height: 500px;

    .title {
        font-weight: 600;
        font-size: 18px;
    }

    .form {
        background-color: #fff;
        padding: 24px 0px 1px 0px;
    }
}
</style>
