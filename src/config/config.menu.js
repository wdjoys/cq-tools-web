export const menus = [
    {
        label: '主页',
        icon: 'home',
        to: ''

    },
    {
        label: '任务管理',
        icon: 'hourglass',
        to: '',
        children: [
            { label: '属性管理', to: 'facility-prop' }

        ]
    },

    {
        label: '分组管理',
        icon: 'interaction',
        to: '',
        children: [
            { label: '属性管理', to: 'facility-prop' }

        ]
    },
    {
        label: '列表模板',
        icon: 'menu',
        to: '',
        children: [
            { label: '属性管理', to: 'facility-prop' }

        ]
    },
    {
        label: '负载监控',
        icon: 'file-search',
        to: '',
        children: [
            { label: '属性管理', to: 'facility-prop' }

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
