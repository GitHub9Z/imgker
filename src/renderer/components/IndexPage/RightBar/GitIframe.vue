<template>
    <!-- index{right-bar{git-iframe{*}}} -->
    <div class="content">
        <div class="content-tree" :style="{'background-image': `url(${require('@/assets/icon/block_gray_icon.png')})`}">
            <tree :tree="tree" @reset="handleGitReset" v-if="tree"></tree>
        </div>
    </div>
</template>

<script>
    import tree from './GitIframe/tree.vue'
    export default {
        props: ['tree'],
        components: {
            tree
        },
        data() {
            return {}
        },
        created() {},
        computed: {},
        methods: {
            handleGitReset(commit) {
                this.$emit('reset', commit)
                this.tree.HEAD = commit
                this.$axios.get('submitLib', {
                        params: {
                            id: this.$store.state.Counter.userInfo.lib[0].id,
                            history_tree: JSON.stringify(this.tree)
                        }
                    })
                    .then(response => {
                        this.$store.state.Counter.userInfo.lib[0].history_tree = JSON.stringify(this.tree)
                        let message = {
                            'from': 'git',
                            'oper': 'loadData'
                        }
                        this.$emit('childOper', message)
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .content-tree {
        width: 100%;
        padding: 16px;
    }
</style>