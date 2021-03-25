<template>
    <a-layout id="components-layout-demo-side"
              style="min-height: 100vh">
        <a-layout-sider v-model="collapsed"
                        collapsible>
            <div class="logo" />
            <a-menu theme="dark"
                    :default-selected-keys="['1']"
                    mode="inline">
                <template v-for="(menu,index) in menus">
                    <!-- menu是否有子菜单 -->
                    <template v-if="!('children' in menu)">
                        <a-menu-item v-if="!menu.hidden"
                                     :key="index">
                            <router-link :to="{name:menu.to}">
                                <a-icon :type="menu.icon" />
                                <span>{{menu.label}}</span>
                            </router-link>

                        </a-menu-item>
                    </template>

                    <!-- menu有子菜单 创建sub-menu -->
                    <a-sub-menu v-else
                                :key="index">
                        <span slot="title">
                            <a-icon :type="menu.icon" /><span>{{menu.label}}</span>
                        </span>
                        <!--遍历 menu.children -->
                        <template v-for="(submenu,subindex) in menu.children">
                            <a-menu-item v-if="!submenu.hidden"
                                         :key="(index*100 + subindex)">
                                <router-link :to="{name:submenu.to}">{{submenu.label}}</router-link>

                            </a-menu-item>
                        </template>

                    </a-sub-menu>
                </template>

            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <serviceSelect />
            </a-layout-header>
            <a-layout-content style="margin:20px 30px;">
                <!-- <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb> -->
                <div :style="{  minHeight: '360px' }">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
import { menus } from '@/config/config.menu'

import serviceSelect from './service-select'
export default {
    components: { serviceSelect },
    data () {
        return {
            collapsed: false,
            menus
        }
    }
}
</script>

<style>
#components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>
