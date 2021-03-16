<template>
    <div class="home">
        <a-row :gutter="[15,15]">
            <a-col :span="24">
                <slideshow />
            </a-col>
            <!-- <a-col :span="24">
                <service class="service-status" />
            </a-col> -->
            <a-col :span="12">
                <monitor class="service-status" />
            </a-col>
            <a-col :span="12">
                <chartjs class="service-status" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { service, monitor, slideshow, chartjs } from '@/components/home'
export default {
    components: {
        // service,
        monitor,
        slideshow,
        chartjs
    }

}
</script>

<style lang="less" scoped>
.home {
    .service-status {
        background-color: rgb(255, 255, 255);
    }
}
</style>
