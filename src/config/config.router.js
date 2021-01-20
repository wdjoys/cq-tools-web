
export const RouterMap = [
    {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "test" */ '@/layouts/WorkplaceLayout'),
        meta: { title: '首页' },
        children: []
    }
]
