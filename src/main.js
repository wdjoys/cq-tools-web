import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { VueAxios } from './utils/request'
import {
    DatePicker, Tabs, FormModel, Input, Button, Checkbox, Icon, Layout,
    Menu, Alert, Avatar, Dropdown, Table, Tag, Divider, Modal, message, Popconfirm,
    Select, Card, Row, Col, Steps, Result, Tree, InputNumber, Descriptions, Badge, notification,
    TreeSelect, Statistic, Transfer, Spin, Upload, List, Skeleton, Breadcrumb, Carousel, Space
} from 'ant-design-vue'
import vueConfig from '../vue.config'

Vue.config.productionTip = false

// antv组件
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Alert)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Select)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Steps)
Vue.use(Result)
Vue.use(Tree)
Vue.use(InputNumber)
Vue.use(Descriptions)
Vue.use(Badge)
Vue.use(TreeSelect)
Vue.use(Statistic)
Vue.use(Transfer)
Vue.use(Spin)
Vue.use(Upload)
Vue.use(List)
Vue.use(Skeleton)
Vue.use(Breadcrumb)
Vue.use(Carousel)
Vue.use(Space)

Vue.component(Breadcrumb.name, Breadcrumb)
Vue.config.productionTip = false
Vue.prototype.$message = message
message.config({
    duration: 4, // 持续时间
    top: '60px', // 到页面顶部距离
    maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
})

Vue.prototype.$notification = notification
notification.config({
    placement: 'topRight',
    top: '50px',
    duration: 4 // 持续时间
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
