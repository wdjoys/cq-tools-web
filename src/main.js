import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { VueAxios } from './utils/request'
import {
    DatePicker, Tabs, FormModel, Input, Button, Checkbox, Icon, Layout, Radio, Pagination,
    Menu, Alert, Avatar, Dropdown, Table, Tag, Divider, Modal, message, Popconfirm, Drawer,
    Select, Card, Row, Col, Steps, Result, Tree, InputNumber, Descriptions, Badge, notification, Switch,
    TreeSelect, Statistic, Transfer, Spin, Upload, List, Skeleton, Breadcrumb, Carousel, Space, Popover, Progress
} from 'ant-design-vue'
import vueConfig from '../vue.config'

import Storage from 'vue-ls'

import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn')

const options = {
    namespace: 'vuejs__', // key键前缀
    name: 'local', // 命名Vue变量.[ls]或this.[$ls],
    storage: 'local' // 存储名称: session, local, memory
}

Vue.use(Storage, options)
// 或 Vue.use(Storage);
const options1 = {
    namespace: 'vuejs__', // key键前缀
    name: 'session', // 命名Vue变量.[ls]或this.[$ls],
    storage: 'session' // 存储名称: session, local, memory
}
const Storage_ = Object.assign({}, Storage)
Vue.use(Storage_, options1)
// 或 Vue.use(Storage);

Vue.config.productionTip = false

// antv组件

Vue.use(Drawer)
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
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Pagination)

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
