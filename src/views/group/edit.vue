<template>
    <div class="main">
        <router-link :to="{name:'group'}">
            <a-icon type="close"
                    style="font:italic bold 20px/20px ;margin-left:99%" />
        </router-link>

        <a-form-model ref="ruleForm"
                      :model="form"
                      :labelCol="{span:5}"
                      :wrapperCol="{span:14}"
                      :rules="formRules">
            <a-form-model-item label="分组名称"
                               prop="name">
                <a-input v-model="form.name">

                </a-input>
            </a-form-model-item>
            <a-form-model-item label="版本路径"
                               prop="root_server_path">
                <a-input v-model="form.root_server_path">
                </a-input>
            </a-form-model-item>
            <a-form-model-item label="可用变量">
                <template v-for="(v,k) in vars">

                    {{k}}: <a :key="k"
                       @click="insert_var(`{${v}}`,'template')">{{v}}</a>
                </template>
            </a-form-model-item>
            <a-form-model-item label="列表模板"
                               prop="template">
                <a-textarea v-model="form.template"
                            :auto-size="{ minRows: 10, maxRows:20 }"
                            class="pre"
                            ref="template" />
            </a-form-model-item>

            <a-form-model-item label="可用变量">
                <template v-for="(v,k) in sub_vars">

                    {{k}}: <a :key="k"
                       @click="insert_var(`{${v}}`,'template_sub')">{{v}}</a>
                </template>
            </a-form-model-item>
            <a-form-model-item label="分区模板"
                               prop="template_sub">
                <a-textarea v-model="form.template_sub"
                            :auto-size="{ minRows: 10, maxRows:20}"
                            class="pre"
                            ref="template_sub" />
            </a-form-model-item>
            <a-form-model-item>

                <a-button type="primary"
                          @click="submit"
                          style="width:100%;margin-left:35.5%"
                          :loading="submit_loadind">提交</a-button>
            </a-form-model-item>
            <a-form-model-item>
                <router-link :to="{name:'group'}">
                    <a-button type="primary"
                              style="width:100%;margin-left:35.5%">返回</a-button>
                </router-link>

            </a-form-model-item>

        </a-form-model>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('group')
export default {
    data () {
        return {
            submit_loadind: false,
            vars: {
                年: 'year',
                月: 'month',
                日: 'day',
                时: 'hour',
                分: 'minute',
                秒: 'second',
                分区列表位置: 'list-block'

            },
            sub_vars: {
                分区名称: 'name',
                电信ip: 'ct_ip',
                联通ip: 'cu_ip',
                移动ip: 'cm_ip',
                登录端口: 'port',
                微端ip: 'micro_server_ip',
                微端端口: 'micro_server_port',
                年: 'year',
                月: 'month',
                日: 'day',
                时: 'hour',
                分: 'minute',
                秒: 'second'
            },
            form: {
                name: '',
                root_server_path: '',
                template: '',
                template_sub: ''
            },
            formRules: {
                name: [
                    { required: true, message: '分组名称必填', trigger: 'blur' }

                ],
                root_server_path: [
                    { required: true, message: '版本路径必填', trigger: 'blur' }

                ],
                template: [
                    { required: true, message: '列表模板必填', trigger: 'blur' }

                ],
                template_sub: [
                    { required: true, message: '分区模板必填', trigger: 'blur' }

                ]
            }
        }
    },
    methods: {
        ...mapActions(['put', 'post']),

        submit (e) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let method
                    this.submit_loadind = true
                    // eslint-disable-next-line no-prototype-builtins
                    if (this.form.hasOwnProperty('id')) {
                        this.put(this.form)
                            .then(res => {
                                console.log(res)
                                this.submit_loadind = false
                                this.$message.success('修改成功！')
                            })
                            .catch(err => {
                                this.submit_loadind = false
                                this.$message.success('修改失败！')
                                console.log(err)
                            })
                    } else {
                        this.post(this.form)
                            .then(res => {
                                this.form = res
                                this.submit_loadind = false
                                this.$message.success('创建成功！')
                            })
                            .catch(err => {
                                this.submit_loadind = false
                                this.$message.success('创建失败！')
                                console.log(err)
                            })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        insert_var (str, ref) {
            // 选择dom
            const obj = this.$refs[ref].$el
            // console.log(typeof obj.selectionStart, obj)
            if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart
                var endPos = obj.selectionEnd
                var cursorPos = startPos
                var tmpStr = obj.value
                // obj.value =
                const valueText = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
                // console.log(valueText, ref)
                this.$set(this.form, ref, valueText)
                cursorPos += str.length
                obj.selectionStart = obj.selectionEnd = cursorPos
            }
        }

    },
    mounted () {
        this.form = this.$route.params

        console.log(this.msg)
    }
}
</script>

<style lang="less" scoped>
.main {
    background-color: #fff;
    padding: 40px;
    .pre {
        width: 100%;
        white-space: nowrap;
        overflow: scroll;
    }
}
</style>
