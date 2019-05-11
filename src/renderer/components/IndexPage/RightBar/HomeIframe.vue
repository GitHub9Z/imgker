<template>
    <!-- index{right-bar{home-iframe{*}}} -->
    <div class="content">
        <img class="content-logo" src="@/assets/icon/gker_logo.png">
        <div class="content-text">
            v1.0.5
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {}
        },
        created() {},
        computed: {},
        methods: {
        }
    }
</script>

<style lang="less" scoped>
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content-logo {
        height: 180px;
        width: 180px;
    }

    .content-text {
        padding: 10px;
        font-size: 20px;
        color: gray;
    }
</style>