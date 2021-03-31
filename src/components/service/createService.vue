<template>
    <div>
        <a-modal title="创建分区"
                 :visible="visible"
                 :confirm-loading="confirmLoading"
                 @ok="handleOk"
                 @cancel="handleCancel"
                 centered>
            <a-form-model :model="form"
                          :label-col="{span:6}"
                          :wrapper-col="{span:14}"
                          :rules="formRules"
                          ref="form">
                <a-form-model-item label="分区名称"
                                   prop="name">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="开区时间"
                                   prop="start_time">
                    <a-date-picker show-time
                                   placeholder="选择日期时间"
                                   @change="(moment)=> TimeChange(moment,form,'start_time')"
                                   style="width:100%" />
                </a-form-model-item>
                <a-form-model-item label="测试时间"
                                   prop="test_time">
                    <a-date-picker show-time
                                   placeholder="选择日期时间"
                                   @change="(moment)=> TimeChange(moment,form,'test_time')"
                                   style="width:100%" />
                </a-form-model-item>
                <a-form-model-item label="所属分组"
                                   prop="group">
                    <a-select style="width: 100%"
                              @change="(id)=> groupChange(id,form,'group')">
                        <a-select-option :value="group.id"
                                         v-for="group in groups"
                                         :key="group.id">
                            {{group.name}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="自动开区">
                    <a-switch v-model="form.createTask" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            form: {
                name: null,
                test_time: null,
                start_time: null,
                group: null,
                createTask: false

            },
            formRules: {
                name: [
                    { required: true, message: '服务器名称必填', trigger: 'blur' }

                ],
                group: [
                    { required: true, message: '请选择分组', trigger: 'blur' }

                ],
                test_time: [
                    { required: true, message: '请选择测试时间', trigger: 'change' },
                    {
                        validator: (rule, value, callback) => {
                            if (this.form.start_time - value < 600) {
                                callback(new Error('测试时间至少比开区时间提前十分钟'))
                            } else {
                                callback()
                            }
                        },
                        message: '测试时间至少比开区时间提前十分钟',
                        trigger: 'change'
                    }

                ],
                start_time: [
                    { required: true, message: '请选择正式开区时间', trigger: 'change' }

                ]
            },
            groups: []

        }
    },
    methods: {
        ...mapActions('group', {
            getGroup: 'get'
        }),

        ...mapActions('service', {
            postGameService: 'post'
        }),
        handleOk () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.confirmLoading = true
                    this.postGameService(this.form).then(res => {
                        this.confirmLoading = false
                        this.visible = false
                        console.log(res)
                        // eslint-disable-next-line no-unused-expressions
                        console.log(this.$store.state.gameService, 'xxx')
                    }).catch(() => {
                        this.confirmLoading = false
                    })
                }
            })
        },
        handleCancel (e) {
            console.log('Clicked cancel button')
            this.visible = false
        },
        groupChange (value, form, key) {
            form[key] = value
        },
        TimeChange (time, form, key) {
            form[key] = time.unix()
            console.log(this.form, form[key])
        }

    },
    mounted () {
        this.getGroup().then(res => {
            this.groups = res
        })
    }
}
</script>

<style lang="less" scoped>
</style>
