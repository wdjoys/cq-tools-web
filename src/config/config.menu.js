export const menus = [
    {
        label: '主页',
        icon: 'home',
        to: 'home'

    },
    {
        label: '任务管理',
        icon: 'hourglass',
        to: '',
        children: [
            { label: '属性管理', to: 'task' }

        ]
    },

    {
        label: '分组管理',
        icon: 'interaction',
        to: '',
        children: [
            { label: '属性管理', to: 'group' }

        ]
    },
    {
        label: '分区管理',
        icon: 'menu',
        to: 'sub-server'

    },

    {
        label: '负载监控',
        icon: 'file-search',
        to: '',
        children: [
            { label: '属性管理', to: 'monitor' }

        ]
    },
    {
        label: '用户管理',
        icon: 'user',
        to: '',
        children: [
            { label: '属性管理', to: 'facility-prop' }

        ]
    }
]
