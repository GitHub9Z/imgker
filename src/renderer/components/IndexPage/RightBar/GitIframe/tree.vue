<script>
    export default {
        name: 'tree',
        props: {
            tree: {
                type: Object,
                default: {}
            }
        },
        computed: {
        },
        created () {
        },
        updated() {
        },
        data() {
            return {
            }
        },
        methods: {
            getItemById(id) {
                let tmp = id.split('-').filter(item => item)
                let Item = {
                    child: this.tree
                }
                for (let index in tmp) {
                    Item = Item.child[Number(tmp[index])]
                }
                return Item
            },
            getFatherById(id) {
                let tmp = id.split('-').filter(item => item)
                tmp.pop()
                let Item = {
                    child: [this.tree],
                    type: 1
                }
                for (let index in tmp) {
                    Item = Item.child[Number(tmp[index])]
                }
                return Item
            },
            getHtml(tree, createElement) {
                if (!tree) return ''
                let elementTree = {}
                elementTree = tree.map((item, index) => {
                    return createElement('div', {
                        class: {
                            'content-tree-item': true
                        }
                    }, [createElement('div', {
                        class: {
                            'content-tree-item-main': true
                        },
                        domProps: {
                            info: item,
                            title: item.title
                        },
                        on: {
                            click: this.handleClick
                        }
                    }, [
                        createElement('img', {
                            class: {
                                'content-tree-item-main-img': true,
                                'content-tree-item-main-img-active': item.commit === this.tree.HEAD
                            },
                            domProps: {
                                src: item.child.length > 1 ? (item.commit === this.tree.HEAD ? require('@/assets/icon/circle_blue_icon.png') : require('@/assets/icon/circle_normal_icon.png')) : (item.commit === this.tree.HEAD ? require('@/assets/icon/block_blue_icon.png') : require('@/assets/icon/block_green_icon.png')),
                                info: item
                            }
                        })
                    ]), createElement('div', {
                        class: {
                            'content-tree-item-child': true
                        }
                    }, this.getHtml(item.child, createElement))])
                })
                let virtualTree = []
                elementTree.forEach(item => {
                    virtualTree = [...virtualTree, item]
                })
                return virtualTree
            },
            handleClick(e) {
                console.log('hahahah', e)
                this.$emit('reset', e.target.info.commit)
            }
        },
        render(createElement) {
            console.log('sdad', this.tree)
            let res = this.getHtml([this.tree], createElement)
            /*
            return <div domPropsInnerHTML = {
                res
            }> </div>
            */
            /*
             return createEl
             ement('div', {
                 domProps: {
                     innerHTML: res
                 }
             })
             */
            return createElement('div', {}, res)
        }
    }
</script>

<style>
    * {
        padding: 0px;
    }


    .content-tree-child {
        padding: 0;
    }
    
    .content-tree-item {
        display: flex;
        flex-direction: row;
    }
    .content-tree-item-main {
        height: 16px;
        width: 16px;
        padding: 1px;
    }

    .content-tree-item-main:hover {
        height: 16px;
        width: 16px;
        padding: 1px;
        background: white;
    }
    
    
    .content-tree-item-main-img {
        height: 14px;
        width: 14px;
        margin: 0;
    }

    .content-tree-item-main-img-active {
        height: 14px;
        width: 14px;
        margin: 0;
    }
</style>
