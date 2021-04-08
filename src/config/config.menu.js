export const menus = [
    {
        label: '主页',
        icon: 'home',
        to: 'home'

    },
    {
        label: '任务管理',
        icon: 'hourglass',
        to: 'task'

    },

    {
        label: '分组管理',
        icon: 'interaction',
        to: 'group'

    },
    {
        label: '分区管理',
        icon: 'menu',
        to: 'sub-server'

    },

    {
        label: '负载监控',
        icon: 'file-search',
        to: 'monitor'

    },
    {
        label: '管理中心',
        icon: 'user',
        to: 'monitor',
        children: [
            {
                label: '授权管理',
                icon: 'user',
                to: 'auth'
            }, {
                label: '用户管理',
                icon: 'user',
                to: 'me'
            },
            {
                label: '推荐返利',
                icon: 'user',
                to: 'promote'
            }

        ]

    }
]
