<template>
    <div class="header">
        <a-row>
            <a-col :span="2">
                <a-dropdown :trigger="['click']">

                    <a class="ant-dropdown-link"
                       @click="e => e.preventDefault()">
                        <a-icon type="database" />
                        切换服务器
                        <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item key="0">
                            <a href="http://www.alipay.com/">1st menu item</a>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a href="http://www.taobao.com/">2nd menu item</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-col>
            <a-col :span="10">
                <a-space :size="20">
                    <span>
                        腾讯云 4h8g
                    </span>
                    <span>
                        <a-icon type="windows"
                                style="margin-right:5px" />系统：
                        windows server 2019
                    </span>
                    <span>
                        已不间断运行：15天
                    </span>
                </a-space>
            </a-col>
            <a-col :span="8">
                <a-space class="load"
                         :size="16">
                    <span>
                        CPU:10%
                    </span>
                    <span>
                        内存：55%
                    </span>
                    <span>
                        上传：100kb/s
                    </span>
                    <span>
                        下载：100kb/s
                    </span>
                </a-space>
            </a-col>

            <a-col :span="4">
                <div class="info">
                    <span class="bell">
                        <a-icon type="bell"
                                style="font-size:18px" />
                    </span>
                    <span class="user-info">

                        <a-dropdown>
                            <a class="ant-dropdown-link"
                               @click="e => e.preventDefault()">
                                <a-space>
                                    <a-avatar icon="user" />xiaocao-dev
                                </a-space>
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item>

                                    <a-icon type="bell" />1st menu item

                                </a-menu-item>
                                <a-menu-item>
                                    <a-icon type="down" />个人中心
                                </a-menu-item>
                                <a-menu-item>
                                    <a-icon type="down" />退出登录
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </span>

                </div>

            </a-col>
        </a-row>
    </div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header {
    padding: 0 30px;
    // background-color: hotpink;

    .info {
        float: right;
        position: relative;
        left: -15px;

        .user-info {
            padding: 0 20px;
            display: inline-block;

            &:hover {
                background-color: rgb(230, 230, 230);
            }
        }

        .bell {
            display: inline-block;
            text-align: center;
            width: 50px;
            &:hover {
                background-color: rgb(230, 230, 230);
            }
        }
    }

    .load {
        float: right;
    }
}
</style>
