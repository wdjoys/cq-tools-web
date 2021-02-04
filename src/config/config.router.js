
export const RouterMap = [
    {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/layouts/BasicLayout'),
        meta: { title: '首页' },
        children: [
            {
                path: 'workplace',
                name: 'workplace',
                component: () => import(/* webpackChunkName: "workplace" */ '@/layouts/WorkplaceLayout'),
                meta: { title: '工作区' },
                children: [
                    {
                        path: 'home',
                        name: 'home',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '主页' }
                    },
                    {
                        path: 'task',
                        name: 'task',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '任务管理' }
                    },
                    {
                        path: 'group',
                        name: 'group',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '分组' }
                    },
                    {
                        path: 'list',
                        name: 'list',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '列表管理' }
                    },
                    {
                        path: 'monitor',
                        name: 'monitor',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '负载监控' }
                    },
                    {
                        path: 'userx',
                        name: 'userx',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '用户管理xx' }
                    }
                ]
            },
            {
                path: 'user',
                name: 'user',
                component: () => import(/* webpackChunkName: "user" */ '@/layouts/UserLayout'),
                meta: { title: '用户' },
                children: [
                    {
                        path: 'login',
                        name: 'login',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
                        meta: { title: '登录' }
                    }
                ]
            }
        ]
    }
]
