<template>
    <div class="main">
        <a-button type="primary"
                  style="margin-bottom:10px"
                  @click="showModal">创建任务</a-button>
        <a-table :columns="columns"
                 :data-source="task"
                 rowKey="id"
                 :expandIconColumnIndex="2"
                 class="table">
            <!-- <p slot="expandedRowRender"
               slot-scope="record"
               style="margin: 0">
                {{ record }}
            </p> -->
            <span slot="task_code"
                  slot-scope="task_code_id">
                {{formatToServer(task_code_id)}}
            </span>

            <span slot="time"
                  slot-scope="text, record">
                <span v-if="record.model===0">
                    {{$moment(text*1000).format("YYYY-MM-DD , HH:mm:ss")}}

                </span>
                <span v-if="record.model===1">
                    每{{text}}秒
                </span>
            </span>

            <span slot="model"
                  slot-scope="text,">
                <span v-if="text===0">
                    定时执行
                </span>
                <span v-if="text===1">
                    循环执行
                </span>
            </span>

            <span slot="game_service"
                  slot-scope="services_id">
                <span v-if="services_id===null">
                    无
                </span>
                <span v-else>
                    <p v-for="service in formateService(services_id)"
                       :key="service.id">
                        {{service.name}}
                    </p>
                </span>
            </span>
            <span slot="action"
                  slot-scope="text, record">

                <a-popconfirm title="Are you sure delete this task?"
                              ok-text="Yes"
                              cancel-text="No"
                              @confirm="taskDelete(record)">
                    <a>删除任务</a>
                </a-popconfirm>

            </span>
        </a-table>
        <a-modal title="创建任务"
                 :visible="visible"
                 :confirm-loading="confirmLoading"
                 @ok="handleOk"
                 @cancel="handleCancel"
                 width="600px"
                 centered>
            <a-form-model :model="taskForm"
                          :label-col="{span:6}"
                          :wrapper-col="{span:14}"
                          ref="taskForm"
                          :rules="taskFormRule">
                <a-form-model-item label="任务名称"
                                   prop="task_code">
                    <a-select style="width: 100%"
                              v-model='taskForm.task_code'
                              @change="taskCodeChange">
                        <a-select-option v-for="t in taskCode"
                                         :value="t.id"
                                         :key="t.id">
                            {{t.name}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="关联分区"
                                   prop="game_service"
                                   v-show="linkServiceShow">
                    <a-select mode="multiple"
                              placeholder="Please select"
                              style="width: 100%"
                              v-model='taskForm.game_service'>
                        <a-select-option v-for="s in service"
                                         :value="s.id"
                                         :key="s.id">
                            {{s.name}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="合区名称"
                                   prop="parameters"
                                   v-show="parametersShow">
                    <a-input v-model="taskForm.parameters" />
                </a-form-model-item>
                <a-form-model-item label="任务模式"
                                   prop="model">
                    <a-radio-group name="radioGroup"
                                   v-model="taskForm.model">
                        <a-radio :value="0">
                            定时执行
                        </a-radio>
                        <a-radio :value="1">
                            循环执行
                        </a-radio>

                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="间隔时间"
                                   v-if="taskForm.model===1"
                                   prop="time">
                    <a-input v-model="taskForm.time"
                             suffix="分钟" />
                </a-form-model-item>
                <a-form-model-item label="执行时间"
                                   prop="time"
                                   v-else>
                    <a-date-picker show-time
                                   placeholder="选择日期时间"
                                   @change="(moment)=> TimeChange(moment,taskForm,'time')"
                                   style="width:100%" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>

import { mapActions, mapGetters, mapState } from 'vuex'

const columns = [
    {
        dataIndex: 'task_code',
        title: '任务名称',
        scopedSlots: { customRender: 'task_code' }
    },
    {
        title: '关联分区',
        dataIndex: 'game_service',
        scopedSlots: { customRender: 'game_service' }
    }, {
        title: '执行时间',
        dataIndex: 'time',
        scopedSlots: { customRender: 'time' }
    },
    {
        title: '模式',
        dataIndex: 'model',
        scopedSlots: { customRender: 'model' }

    },
    {
        title: '操作',
        // key: 'action',
        scopedSlots: { customRender: 'action' }
    }
]

export default {
    data () {
        return {

            visible: false,
            confirmLoading: false,

            columns,
            taskForm: {
                model: 0,
                task_code: null,
                game_service: [],
                time: null,
                parameters: null

            },
            linkServiceShow: true,
            parametersShow: false,
            taskFormRule: {
                parameters: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.parametersShow === true && value.length === 0) {
                                callback(new Error('请填写合区后的名称'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change',
                        message: '请填写合区后的名称'

                    }],
                task_code: [
                    { required: true, message: '请选择任务', trigger: 'blur' }],
                time: [
                    { required: true, message: '请选择时间', trigger: 'change' }],
                game_service: [
                    {
                        validator: (rule, value, callback) => {
                            console.log(value, this.linkServiceShow)
                            if (this.linkServiceShow === true && value.length === 0) {
                                callback(new Error('请选择要关联的分区'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change',
                        message: '请选择要关联的分区'
                    }]
            }

        }
    },
    methods: {
        ...mapActions('task', ['get', 'post', 'delete', 'task_not_execute']),
        ...mapActions('taskCode', {
            getTaskCode_: 'get'
        }),
        ...mapActions('service', {
            getService_: 'get'
        }),

        formatToServer (id) {
            // console.log(this.taskCode[id - 1], id)
            return this.taskCode[id - 1].name
        },
        formateService (ids) {
            let idArr = []
            if (ids.indexOf(',') > -1) {
                idArr.push(...ids.slice(1, -1).split(','))
            } else {
                idArr.push(ids)
            }
            idArr = idArr.map(Number)

            return this.service.filter(item => {
                // console.log(idArr.indexOf(item.id) > -1, item.id)
                return idArr.indexOf(item.id) > -1
            })
        },

        // 表格 Actions
        taskDelete (task) {
            this.delete(task).then(res => {
                console.log(res)
                this.getTask()
            }
            ).catch(err => {
                console.log(err)
            })
        },

        // 模态框相关操作
        showModal () {
            this.visible = true
        },
        handleOk (e) { // 提交表单
            this.$refs.taskForm.validate(valid => {
                console.log(valid, 1111111111)
                if (valid) {
                    this.confirmLoading = true
                    console.log(this.taskForm)
                    const form = { ...this.taskForm }
                    // 列表数组转字符串
                    form.game_service = `[${form.game_service.toString()},]`
                    this.post(form)
                        .then(res => {
                            this.confirmLoading = false
                            this.visible = false
                            console.log(res)
                        })
                        .catch()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        handleCancel (e) {
            this.visible = false
        },

        // 表单相关
        taskCodeChange (taskId) { // 任务类型改变
            console.log(this.taskCode[taskId - 1])
            // 通过选择项 设置关联分区表单项  是否显示
            this.linkServiceShow = this.taskCode[taskId - 1].need_link
            this.taskForm.game_service = []
            this.parametersShow = this.taskCode[taskId - 1].name === '合区'
        },
        TimeChange (time, form, key) {
            form[key] = time.unix()
            console.log(this.form, form[key + 1])
        }

    },
    computed: {
        ...mapState('task', ['task']),
        ...mapState('taskCode', ['taskCode']),
        ...mapState('service', ['service'])

    },
    async mounted () {
        this.taskCode.length !== 0 || await this.getTaskCode_()
        this.task.length !== 0 || this.get()
        this.service.length !== 0 || this.getService_()

        // 定时检查任务
        setInterval(async () => {
            await this.task_not_execute() && this.getService_()
        }, 2000)
    }
}
</script>

<style lang="less" scoped>
.main {
    .table {
        background-color: #fff;
    }
}
</style>
