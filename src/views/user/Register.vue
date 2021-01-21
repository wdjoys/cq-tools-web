<template>
    <a-modal v-model="show"
             title="Basic Modal"
             @ok="handleOk"
             @cancel="handleOk">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'show',
        event: 'changShow'
    },
    data () {
        return {

        }
    },
    methods: {
        showModal () {
            this.visible = true
        },
        handleOk (e) {
            console.log(e)
            this.$emit('changShow', false)
        }
    }
}
</script>
