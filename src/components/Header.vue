<template>
    <div class="header">
        <div>
            <img src="@/assets/logo.png"
                 id="logo">
            <span>XXXXXX管理系统</span>
        </div>
        <!-- <p>可更新、可溯源、可xx 的</p> -->
    </div>
</template>

<script>
export default {
    name: 'NewHeader'
}
</script>

<style lang="less" scoped>
.header {
    // background-color: aqua;
    text-align: center;
    height: 100px;

    div {
        height: 60px;
        // background-color: gold;

        #logo {
            height: 100%;
            margin-right: 15px;
        }
        span {
            display: inline-block;
            font-size: 26px;
            font-weight: 900;
            // white-space: ;
            vertical-align: middle;
            color: black;
            letter-spacing: 3px;
        }
    }

    p {
        margin-top: 25px;
        color: grey;
    }
}
</style>
