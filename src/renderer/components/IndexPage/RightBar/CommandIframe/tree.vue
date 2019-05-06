<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        name: 'tree',
        props: {
            treeArr: {
                type: Object,
                default: {}
            }
        },
        computed: {
            ...mapState('commandIframe', ['dragItem'])
        },
        created () {
            let code = this.convertTreeToCode(this.treeArr)
            this.$emit('codeUpdate', code)
        },
        updated() {
            let code = this.convertTreeToCode(this.treeArr)
            this.$emit('codeUpdate', code)
        },
        data() {
            return {
                poolConfig: [{
                    title: '单选题目',
                    icon: require('@/assets/icon/radio_purple_icon.png'),
                    allowTypes: [1]
                }, {
                    title: '单选选项',
                    icon: require('@/assets/icon/radio_yellow_icon.png'),
                    allowTypes: [0, 2, 3, 4, 5, 6, 7]
                }, {
                    title: '问答',
                    icon: require('@/assets/icon/radio_green_icon.png'),
                    allowTypes: [0, 2, 3, 4, 5, 6, 7]
                }, {
                    title: '加载',
                    icon: require('@/assets/icon/radio_blue_icon.png'),
                    allowTypes: []
                }, {
                    title: '结束加载',
                    icon: require('@/assets/icon/radio_blue_icon.png'),
                    allowTypes: []
                }, {
                    title: '普通文本',
                    icon: require('@/assets/icon/radio_pink_icon.png'),
                    allowTypes: []
                }, {
                    title: '炫彩文字',
                    icon: require('@/assets/icon/radio_red_icon.png'),
                    allowTypes: []
                }, {
                    title: '备注',
                    icon: require('@/assets/icon/radio_gray_icon.png'),
                    allowTypes: []
                }]
            }
        },
        methods: {
            ...mapMutations('commandIframe', ['COMMIT_DRAG_ITEM']),
            getItemById(id) {
                let tmp = id.split('-').filter(item => item)
                let Item = {
                    child: this.treeArr
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
                    child: this.treeArr,
                    type: 1
                }
                for (let index in tmp) {
                    Item = Item.child[Number(tmp[index])]
                }
                return Item
            },
            convertTreeToCode(tree) {
                let head = `
        #!/usr/bin/env node
        
        process.env.NODE_ENV = 'production';
                
        const chalk = require('chalk');
        const error = chalk.bold.red;
        const warning = chalk.keyword('orange');
        const underline = chalk.underline;
        const bgRed = chalk.white.bgKeyword('red').bold;
        const bgBlack = chalk.white.bgKeyword('black').bold;
        const ora = require('ora');
        const inquirer = require('inquirer');
        const CFonts = require('cfonts');
        const Multispinner = require('multispinner');
                `
                return head + tree.map(item => this.convertItemToCode(item)).join('')
            },
            convertItemToCode(Item) {
                switch (Item.type) {
                    case 0:
                        return `
        inquirer
            .prompt([{
                type: 'list',
                name: 'versionType',
                message: '${Item.title}',
                choices: ${Item.child ? JSON.stringify(Item.child.map(item => ({
                    name: item.title,
                    value: item.title
                }))) : ''}
            }])
            .then(answers => {
                switch(answers) {
    ${Item.child ? Item.child.map(item => this.convertItemToCode(item)).join('') : ''}
                }
            });
        `
                    case 1:
                        return `
                    case '${Item.title}': 
                        ${Item.child ? Item.child.map(item => this.convertItemToCode(item)).join('') : ''}
                        break;
        `
                    case 2:
                        return `
        inquirer
            .prompt([{
                type: 'input',
                name: 'versionType',
                message: '${Item.title}'
            }])
            .then(answers => {
                ${Item.child ? Item.child.map(item => this.convertItemToCode(item)).join('') : ''}
            });
`
                    case 3:
                        return `
            const spinner = ora('${Item.title}').start();`
                    case 4:
                        return `
            spinner.stop();`
                    case 5:
                        return `
            console.log('${Item.title}');`
                    case 6:
                        return `
        CFonts.say(${Item.title}, {
            font: 'block', // define the font face
            align: 'left', // define text alignment
            colors: ['yellow'], // define all colors
            background: 'transparent', // define the background color
            letterSpacing: 1, // define letter spacing
            lineHeight: 1, // define the line height
            space: true, // define if the output text should have empty lines on top and on the bottom
            maxLength: '0', // define how many character can be on one line
        });
        `
                    case 7:
                        return `// ${Item.title}`
                }
            },
            deleteItemById(id) {
                console.log('删除', id)
                let tmp = id.split('-').filter(item => item)
                let pop = tmp.pop()
                this.getItemById(tmp.join('-')).child.splice(Number(pop), 1)
                this.$forceUpdate()
            },
            getHtml(treeArr, createElement, head = '') {
                if (!treeArr) return ''
                let elementTree = {}
                elementTree = treeArr.map((item, index) => {
                    item.id = (head ? (head + '-') : '') + index
                    return [createElement('div', {
                        class: {
                            'content-tree-line-normal': !item.active,
                                'content-tree-line-active': item.active
                        },
                        domProps: {
                            info: item
                        },
                        on: {
                            dragenter: this.handleEnter,
                            dragleave: this.handleLeave,
                            drop: this.handleDrop,
                            dragover: e => e.preventDefault()
                        }
                    }), createElement('div', {
                        class: {
                            'content-tree-title-normal': !item.folderActive,
                                'content-tree-title-active': item.folderActive
                        },
                        domProps: {
                            info: item,
                            draggable: true
                        },
                        on: {
                            click: this.handleClick,
                            dragenter: this.handleFolderEnter,
                            dragleave: this.handleFolderLeave,
                            dragstart: this.handleFolderDrag,
                            drop: this.handleFolderDrop,
                            contextmenu: this.handleRightClick,
                            dragover: e => e.preventDefault()
                        }
                    }, [
                        createElement('img', {
                            class: {
                                'content-tree-img': true,
                                'content-tree-img-hidden': !!item.hidden && item.child
                            },
                            domProps: {
                                src: this.poolConfig[item.type].icon,
                                draggable: false
                            }
                        }), item.title
                    ]), createElement('div', {
                        class: {
                            'content-tree-child': true,
                            'content-tree-child-hidden': !!item.hidden
                        }
                    }, this.getHtml(item.child, createElement, item.id))]
                })
                let virtualTree = []
                elementTree.forEach(item => {
                    virtualTree = [...virtualTree, ...item]
                })
                return virtualTree
            },
            handleClick(e) {
                if (!e.target.info.hidden) e.target.info.hidden = true
                else e.target.info.hidden = false
                this.$forceUpdate()
            },
            handleRightClick(e) {
                const MenuItem = this.$electron.remote.MenuItem
                const Menu = this.$electron.remote.Menu
                const menu = new Menu()
                let thiz = this
                let deleteItem = new MenuItem({
                    label: '删除',
                    accelerator: 'CmdOrCtrl+D',
                    click() {
                        let smalltalk = require('smalltalk/legacy')
                        smalltalk.confirm('删除步骤', '删除将无法恢复 确认删除吗')
                            .then(() => {
                                console.log('fuckc')
                                thiz.deleteItemById(e.target.info.id)
                            })
                            .catch(() => {
                                //
                            })
                    }
                })
    
                let editItem = new MenuItem({
                    label: '重命名',
                    accelerator: 'CmdOrCtrl+R',
                    click() {
                        let smalltalk = require('smalltalk/legacy')
                        smalltalk.prompt('重命名', '请输入新名称', e.target.info.title)
                            .then(function(name) {
                                if (name) {
                                    e.target.info.title = name
                                }
                            }, function() {
                                //
                            })
                    }
                })
                menu.append(editItem)
                menu.append(deleteItem)
                menu.popup(this.$electron.remote.getCurrentWindow())
            },
            handleEnter(e) {
                if (e.target.info.id.indexOf(this.dragItem.id) === 0 || !this.poolConfig[this.getFatherById(e.target.info.id).type].allowTypes.includes(this.dragItem.type)) {
                    return
                }
                if (e.target.info) {
                    e.target.info.active = true
                    this.$forceUpdate()
                }
            },
            handleLeave(e) {
                if (e.target.info.id.indexOf(this.dragItem.id) === 0 || !this.poolConfig[this.getFatherById(e.target.info.id).type].allowTypes.includes(this.dragItem.type)) {
                    return
                }
                if (e.target.info) {
                    e.target.info.active = false
                    this.$forceUpdate()
                }
            },
            handleDrop(e) {
                // 浅拷贝是为了使用删除后页面重绘后的id
                let targetItem = e.target.info
                if (e.target.info.id.indexOf(this.dragItem.id) === 0 || !this.poolConfig[this.getFatherById(e.target.info.id).type].allowTypes.includes(this.dragItem.type)) {
                    this.handleLeave(e)
                    return
                }
                if (this.dragItem.id) {
                    this.deleteItemById(this.dragItem.id)
                }
                this.$nextTick(() => {
                    console.log('移动到他的上面', targetItem.title)
                    let tmp = targetItem.id.split('-').filter(item => item)
                    let dropedItem = null
                    for (let index in tmp) {
                        if (tmp.length === (Number(index) + 1)) {
                            if (!dropedItem) {
                                this.treeArr.splice(Number(tmp[index]), 0, JSON.parse(JSON.stringify(this.dragItem)))
                            } else dropedItem.child.splice(Number(tmp[index]), 0, JSON.parse(JSON.stringify(this.dragItem)))
                        } else {
                            if (!dropedItem) {
                                dropedItem = this.treeArr[Number(tmp[index])]
                            } else dropedItem = dropedItem.child[Number(tmp[index])]
                        }
                    }
                    targetItem.active = false
                    this.$forceUpdate()
                }, 1000)
            },
            handleFolderEnter(e) {
                if (e.target.info.id.indexOf(this.dragItem.id) === 0 || !this.poolConfig[e.target.info.type].allowTypes.includes(this.dragItem.type)) {
                    return
                }
                console.log('进入', e)
                if (e.target.info) {
                    e.target.info.folderActive = true
                    this.$forceUpdate()
                    console.log('进入', JSON.parse(JSON.stringify(e.target.info)))
                }
            },
            handleFolderLeave(e) {
                if (e.target.info.id.indexOf(this.dragItem.id) === 0 || !this.poolConfig[e.target.info.type].allowTypes.includes(this.dragItem.type)) {
                    return
                }
                console.log('离开', e)
                if (e.target.info) {
                    e.target.info.folderActive = false
                    this.$forceUpdate()
                    console.log('离开', JSON.parse(JSON.stringify(e.target.info)))
                }
            },
            handleFolderDrop(e) {
                let targetItem = e.target.info
                if (e.target.info.id.indexOf(this.dragItem.id) === 0 || !this.poolConfig[e.target.info.type].allowTypes.includes(this.dragItem.type)) {
                    this.handleFolderLeave(e)
                    return
                }
                console.log('删除', this.dragItem.id)
                if (this.dragItem.id) {
                    this.deleteItemById(this.dragItem.id)
                }
                this.$nextTick(() => {
                    console.log('添加进', targetItem.id)
                    let tmp = targetItem.id.split('-').filter(item => item)
                    let dropedItem = null
                    for (let index in tmp) {
                        if (!dropedItem) {
                            dropedItem = this.treeArr[Number(tmp[index])]
                        } else {
                            dropedItem = dropedItem.child[Number(tmp[index])]
                        }
                        if (tmp.length === (Number(index) + 1)) {
                            if (dropedItem.child) dropedItem.child.push(JSON.parse(JSON.stringify(this.dragItem)))
                            else dropedItem.child = [JSON.parse(JSON.stringify(this.dragItem))]
                        }
                    }
                    targetItem.folderActive = false
                    this.$forceUpdate()
                })
            },
            handleFolderDrag(e) {
                this.COMMIT_DRAG_ITEM(JSON.parse(JSON.stringify(e.target.info)))
            }
        },
        render(createElement) {
            let res = this.getHtml(this.treeArr, createElement)
            console.log('cnm', res)
            /*
            return <div domPropsInnerHTML = {
                res
            }> </div>
            */
            /*
             return createElement('div', {
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
    .content-tree-child {
        padding: 0 0 0 25px;
    }
    
    .content-tree-child-hidden {
        display: none;
    }
    
    .content-tree-line-normal {
        height: 10px;
        background: white;
    }
    
    .content-tree-line-active {
        height: 10px;
        background: #67C23A;
    }
    
    .content-tree-title-normal {
        background: white;
    }
    
    .content-tree-title-active {
        background: #409EFF;
    }
    
    .content-tree-img {
        height: 10px;
        width: 10px
    }
    
    .content-tree-img-hidden {
        height: 12px;
        width: 12px
    }
</style>
