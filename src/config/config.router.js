
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
                        component: () => import(/* webpackChunkName: "user" */ '@/views/task/Task'),
                        meta: { title: '任务管理' }
                    },
                    {
                        path: 'group',
                        name: 'group',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/group/index'),
                        meta: { title: '分组管理' }
                    },
                    {
                        path: 'group-edit',
                        name: 'group-edit',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/group/edit'),
                        meta: { title: '分组管理' }
                    },
                    {
                        path: 'sub-server',
                        name: 'sub-server',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/server/index'),
                        meta: { title: '分区管理' }
                    },
                    {
                        path: 'monitor',
                        name: 'monitor',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/home/index'),
                        meta: { title: '负载监控' }
                    },
                    {
                        path: 'me',
                        name: 'me',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/manage/me'),
                        meta: { title: '用户管理' }
                    },
                    {
                        path: 'auth',
                        name: 'auth',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/manage/server'),
                        meta: { title: '授权管理' }
                    },
                    {
                        path: 'promote',
                        name: 'promote',
                        component: () => import(/* webpackChunkName: "user" */ '@/views/manage/promote'),
                        meta: { title: '推荐返利' }
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
