<template>
    <!-- index{right-bar{command-iframe{*}}} -->
    <div class="content">
        <div class="content-tools">
            <div class="content-tools-item" v-for="item in poolConfig" draggable='true' @dragstart.stop="drag(item)">
                <img :src="item.icon">{{item.title}}
            </div>
        </div>
        <div class="content-tree">
            <tree :treeArr="treeObj" @codeUpdate="handleCodeUpdate"></tree>
        </div>
        <div class="content-code" v-highlight v-html="code">
        </div>
        <div class="content-console">
            <img src="@/assets/icon/copy_gray_icon.png">
            <img src="@/assets/icon/save_gray_icon.png" @click="handleSaveCommand">
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import tree from './CommandIframe/tree.vue'
    export default {
        props: ['file'],
        components: {
            tree
        },
        data() {
            return {
                code: 'fuck',
                poolConfig: [{
                    title: '单选题目',
                    type: 0,
                    icon: require('@/assets/icon/radio_purple_icon.png')
                }, {
                    title: '单选选项',
                    type: 1,
                    icon: require('@/assets/icon/radio_yellow_icon.png')
                }, {
                    title: '问答',
                    type: 2,
                    icon: require('@/assets/icon/radio_green_icon.png')
                }, {
                    title: '加载',
                    type: 3,
                    icon: require('@/assets/icon/radio_blue_icon.png')
                }, {
                    title: '结束加载',
                    type: 4,
                    icon: require('@/assets/icon/radio_blue_icon.png')
                }, {
                    title: '普通文本',
                    type: 5,
                    icon: require('@/assets/icon/radio_pink_icon.png')
                }, {
                    title: '炫彩文字',
                    type: 6,
                    icon: require('@/assets/icon/radio_red_icon.png')
                }, {
                    title: '备注',
                    type: 7,
                    icon: require('@/assets/icon/radio_gray_icon.png')
                }],
                treeObj: [{
                    title: 'Hello World',
                    type: 6
                }, {
                    title: 'FuckingBoy',
                    type: 0,
                    child: [{
                        title: 'FuckingBoy-1',
                        type: 1,
                        child: [{
                            title: '普通文字区域',
                            type: 5
                        }, {
                            title: '备注',
                            type: 7
                        }]
                    }, {
                        title: 'FuckingBoy-2',
                        type: 1,
                        child: [{
                            title: 'Loading',
                            type: 3
                        }, {
                            title: '备注',
                            type: 7
                        }, {
                            title: 'end-Loading',
                            type: 4
                        }]
                    }, {
                        title: 'FuckingBoy-3',
                        type: 1,
                        child: [{
                            title: '备注',
                            type: 7
                        }]
                    }]
                }]
            }
        },
        created() {
            if (this.file.url) this.treeObj = JSON.parse(this.file.url)
            console.log('dahsduas', this.treeObj)
        },
        computed: {
            ...mapState('commandIframe', ['dragItem'])
        },
        methods: {
            ...mapMutations('commandIframe', ['COMMIT_DRAG_ITEM']),
            drag(item) {
                this.COMMIT_DRAG_ITEM({
                    title: item.title,
                    type: item.type
                })
                console.log('当前拖拽', this.dragItem)
            },
            handleCodeUpdate(code) {
                const Showdown = require('showdown')
                let converter = new Showdown.Converter()
                let beautify = require('js-beautify').js
                let beautifiedCode = beautify(code, {
                    indent_size: 2,
                    space_in_empty_paren: true
                })
                console.log(beautifiedCode)
                this.code = converter.makeHtml('```\n' + beautifiedCode + '\n```')
            },
            handleSaveCommand() {
                this.file.url = JSON.stringify(this.treeObj)
                let message = {
                    'from': 'global',
                    'oper': 'saveTree',
                    'core': `编辑命令行[${this.file.name}]`
                }
                this.$emit('childOper', message)
                this.$toast('保存成功')
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        display: flex;
        flex-direction: row;
        .content-tools {
            padding: 10px 30px 10px 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            z-index: 9;
            background: white;
            .content-tools-item {
                padding: 10px 20px;
                color: #606266;
            }
        }
        .content-tree {
            flex: 1;
            padding: 10px 30px 10px 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            overflow: auto;
            background: white;
            .content-tree-child {
                padding: 0 0 0 10px;
            }
        }
        .content-code {
            flex: 2;
            padding: 10px 30px 10px 10px;
            overflow: auto;
            background: #282828;
            user-select: text;
        }
        .content-console {
            position: fixed;
            right: 10px;
            top: 80px;
            img {
                height: 30px;
                width: 30px;
                padding: 10px;
                margin: 0;
            }
        }
    }
</style>