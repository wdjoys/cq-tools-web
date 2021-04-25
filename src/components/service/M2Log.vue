
<template>
    <div>

        <a-modal title="M2日志"
                 v-model="visible"
                 maskClosable
                 keyboard
                 centered
                 :bodyStyle="{height:'500px',padding:'15px'}">
            <textarea disabled
                      readonly
                      v-model="text"
                      class="textarea">
            </textarea>

            <a-pagination slot="footer"
                          v-model="current"
                          :total="total"
                          :defaultPageSize="100"
                          @change="pageChange"
                          style="display: flex;justify-content:center; " />
        </a-modal>
    </div>
</template>
<script>
import { ServiceLog } from '@/api/restful/restful'
export default {
    name: 'M2Log',
    data () {
        return {
            text: '',
            total: 0,
            visible: false,
            service_id: 0,
            current: 0

        }
    },
    methods: {

        getM2Log (file_name = null, start_line = null) {
            // eslint-disable-next-line camelcase
            const service_id = this.service_id
            new ServiceLog().get({ service_id, file_name, start_line })
                .then(res => {
                    this.text = ''
                    res.text.forEach(element => {
                        this.text += element
                    })
                    this.total = res.count_line
                    // eslint-disable-next-line camelcase
                    this.current = Math.ceil(res.count_line / 100) ? this.current === 0 : Math.ceil(start_line / 100)
                    console.log(this.current)
                })
        },
        pageChange (page) {
            this.getM2Log(null, ((page - 1) * 100) + 1)
        }

    },
    mounted () {

    }
}
</script>

<style lang="less" scoped>
.textarea {
    background-color: black;
    color: chartreuse;
    height: 100%;
    width: 100%;
    resize: none;
}
</style>
