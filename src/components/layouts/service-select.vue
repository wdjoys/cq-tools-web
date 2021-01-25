<template>
    <div class="header">
        <a-dropdown>
            <a class="ant-dropdown-link"
               @click="e => e.preventDefault()">
                Hover me
                <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
        <span>
            <a-avatar size="large"
                      icon="user" />
            <span>王伟刚</span>
        </span>

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
}
</style>
