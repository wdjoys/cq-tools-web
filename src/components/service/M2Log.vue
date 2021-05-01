
<template>
    <div>

        <a-modal title="M2日志"
                 v-model="visible"
                 maskClosable
                 keyboard
                 centered
                 :bodyStyle="{height:'505px',padding:'15px'}">
            <textarea disabled
                      readonly
                      wrap=off
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

        getM2Log (file_name = null, page = null) {
            // eslint-disable-next-line camelcase
            const service_id = this.service_id
            new ServiceLog().get({ service_id, file_name, page })
                .then(res => {
                    this.text = ''
                    res.text.forEach(element => {
                        this.text += element
                    })
                    this.total = res.count_page * 100
                    // eslint-disable-next-line camelcase
                    this.current = res.page
                    console.log(this.current)
                })
        },
        pageChange (page) {
            this.getM2Log(null, page)
        }

    },
    mounted () {

    }
}
</script>

<style lang="less" scoped>
.textarea {
    // padding: 10px;
    background-color: black;
    color: chartreuse;
    height: 100%;
    width: 100%;
    resize: none;
    // white-space: normal;
    overflow: scroll;
}
</style>
