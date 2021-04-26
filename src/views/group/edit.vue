<template>
    <div>
        <a-drawer :title="title"
                  :width="800"
                  :visible="visible"
                  :body-style="{ paddingBottom: '80px' }"
                  @close="onClose">
            <edit2 ref="edit2" />
            <div :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }">
                <a-button :style="{ marginRight: '8px' }"
                          @click="onClose">
                    取消
                </a-button>
                <a-button type="primary"
                          @click="submit">
                    提交
                </a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import edit2 from './edit2'
export default {
    components: { edit2 },
    data () {
        return {
            title: 'Create a new account',
            visible: false
        }
    },
    methods: {
        showDrawer () {
            this.visible = true
        },
        onClose () {
            this.visible = false
        },
        submit () {
            this.$refs.edit2.submit().then(res => {
                this.visible = false
            })
        }
    }
}
</script>
