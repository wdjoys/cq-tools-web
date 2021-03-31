<template>
    <div class="main">
        <a-button type="primary"
                  style="margin:10px 0px;"
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
                    {{$moment(text*1000).format()}}
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
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> More actions
                    <a-icon type="down" />
                </a>
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
                              v-model='taskForm.task_code'>
                        <a-select-option v-for="t in taskCode"
                                         :value="t.id"
                                         :key="t.id">
                            {{t.name}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="关联分区"
                                   prop="service">
                    <a-select mode="multiple"
                              placeholder="Please select"
                              style="width: 100%"
                              v-model='taskForm.service'>
                        <a-select-option v-for="s in service"
                                         :value="s.id"
                                         :key="s.id">
                            {{s.name}}
                        </a-select-option>
                    </a-select>
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
                <a-form-model-item label="执行时间"
                                   v-if="taskForm.model===1"
                                   prop="time">
                    <a-input v-model="taskForm.time"
                             suffix="分钟" />
                </a-form-model-item>
                <a-form-model-item label="间隔时间"
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

import { mapActions } from 'vuex'

const columns = [
    {
        dataIndex: 'task_code',
        // key: 'name',
        title: '任务名称',
        scopedSlots: { customRender: 'task_code' }
    },
    {
        title: '关联分区',
        dataIndex: 'game_service',
        // key: 'address'
        scopedSlots: { customRender: 'game_service' }
    }, {
        title: '执行时间',
        dataIndex: 'time',
        // key: 'age',
        scopedSlots: { customRender: 'time' }
    },
    {
        title: '模式',
        // key: 'tags',
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
            task: [],
            taskCode: [{ name: '' }],
            service: [],
            columns,
            taskForm: {
                model: 0,
                task_code: null,
                service: [],
                time: null
            },
            taskFormRule: {
                task_code: [
                    { required: true, message: '请选择任务', trigger: 'blur' }],
                time: [
                    { required: true, message: '请选择时间', trigger: 'blur' }]
            }

        }
    },
    methods: {
        ...mapActions('task', ['get', 'post']),
        ...mapActions('taskCode', {
            getTaskCode_: 'get'
        }),
        ...mapActions('service', {
            getService_: 'get'
        }),

        getTask () {
            this.get()
                .then(res => {
                    this.task = res
                    console.log(res)
                })
                .catch()
        },
        getTaskCode () {
            this.getTaskCode_()
                .then(res => {
                    this.taskCode = res
                    console.log(this.taskCode)
                })
                .catch()
        },
        getService () {
            this.getService_()
                .then(res => {
                    this.service = res
                    console.log(this.service)
                })
                .catch()
        },
        formatToServer (id) {
            console.log(this.taskCode[id - 1], id)
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
                console.log(idArr.indexOf(item.id) > -1, item.id)
                return idArr.indexOf(item.id) > -1
            })
        },
        // 模态框相关操作
        showModal () {
            this.visible = true
        },
        handleOk (e) {
            console.log(this.taskForm)
        },
        handleCancel (e) {
            this.visible = false
        },

        // 表单相关

        TimeChange (time, form, key) {
            form[key] = time.unix()
            console.log(this.form, form[key])
        }

    },
    mounted () {
        this.getTaskCode()
        this.getService()
        this.getTask()
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
