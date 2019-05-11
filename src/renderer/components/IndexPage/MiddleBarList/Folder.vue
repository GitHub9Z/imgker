<template>
  <!-- index{middle-bar-list{folder{*}}} -->
  <div class='folders' draggable='true' @dragstart.stop="drag($event)" @drop.stop="drop($event)" @dragover.stop="allowDrop($event)" @dragenter.stop="enter($event)" @dragleave.stop="leave($event)" :style="{background: isDragedOver?'rgb(87, 86, 86)':''}">
    <div class='folder' @click="onClick" @contextmenu.stop="handlerFiles">
      <img class='arrow' :src="arrowURL">{{item.name}}<img class='circle' src='@/assets/icon/circle_green_icon.png' :style='{display: fathStatus}'>
    </div>
    <div class='child-folder' :style='{display: childStatus}'>
      <slot></slot>
    </div>
    {{flashFathStatus}}
  </div>
</template>
<script>
  export default {
    props: ['item', 'chooseId'],
    data () {
      return {
        fileslist: '',
        childStatus: 'block',
        fathStatus: 'none',
        arrowURL: require('@/assets/icon/down_arrow_icon.png'),
        isDragedOver: false
        // arrowURL: '@/assets/icon/down_arrow_icon.png"'
      }
    },
    created () {
      this.getFilesList()
    },
    computed: {
      flashFathStatus () {
        if (this.item.id === this.chooseId) {
          this.fathStatus = 'block'
        } else {
          this.fathStatus = 'none'
        }
      }
    },
    methods: {
      getFilesList () {
        // wait-for-add
      },
      drag () {
        this.$store.commit('DRAG_ITEM', this.item)
      },
      drop (event) {
        this.isDragedOver = false
        if (this.item.id === this.$store.state.Counter.dragItem.id) return
        let message = {
          'oper': 'drop',
          'id': this.item.id
        }
        this.$emit('childOper', message)
      },
      allowDrop (event) {
        event.preventDefault()
        this.isDragedOver = true
        this.childStatus = 'block'
      },
      enter (event) {
        this.isDragedOver = true
        this.childStatus = 'block'
        console.log('enter')
      },
      leave (event) {
        this.isDragedOver = false
        console.log('leave')
      },
      onClick () {
        if (this.childStatus === 'block') {
          this.arrowURL = require('@/assets/icon/left_arrow_icon.png')
          // this.arrowURL = '@/assets/icon/down_arrow_icon.png'
          this.childStatus = 'none'
        } else {
          this.arrowURL = require('@/assets/icon/down_arrow_icon.png')
          // this.arrowURL = '@/assets/icon/down_arrow_icon.png'
          this.childStatus = 'block'
        }
        let message = {
          'oper': 'click',
          'id': this.item.id
        }
        this.$emit('childOper', message)
      },
      handlerFiles () {
        let message = {
          'oper': 'click',
          'id': this.item.id
        }
        this.$emit('childOper', message)
        const MenuItem = this.$electron.remote.MenuItem
        const Menu = this.$electron.remote.Menu
        let thiz = this
        /* {Dialog&Smalltalk{advocated in electron}} */
        const menu1 = new Menu()
        let deleteMenu = new MenuItem({
          label: '删除',
          accelerator: 'CmdOrCtrl+D',
          click () {
            let smalltalk = require('smalltalk/legacy')
            // let utils = require('../../../../static/utils.js')
            let message = {
              'oper': 'delete',
              'id': thiz.item.id
            }
            smalltalk.confirm('删除文件夹', '删除将无法恢复 确认删除吗')
              .then(() => {
                thiz.$emit('childOper', message)
              })
              .catch(() => {
                console.log('no')
              })
          }
        })

        let editMenu = new MenuItem({
          label: '重命名',
          accelerator: 'CmdOrCtrl+R',
          click () {
            let smalltalk = require('smalltalk/legacy')
            let message = {
              'oper': 'rename',
              'name': '',
              'id': thiz.item.id
            }
            smalltalk.prompt('重命名', '请输入新名称', thiz.item.name)
              .then(function (name) {
                if (name !== null && name !== '') {
                  message.name = name
                  thiz.$emit('childOper', message)
                }
              }, function () {
                console.log('close')
              })
            /* {DOM-prompt{deprecated in electron}}
            let name = prompt('请输入新名称', thiz.name)
            if (name !== null && name !== '') {
              message.name = name
              thiz.$emit('childRename', message)
            } */
          }
        })

        let newFolderMenu = new MenuItem({
          label: '新建文件夹',
          accelerator: 'CmdOrCtrl+C',
          click () {
            let smalltalk = require('smalltalk/legacy')
            // let utils = require('../../../../static/utils.js')
            let message = {
              'oper': 'new',
              'id': thiz.rndNum(3),
              'name': '',
              'fath': thiz.item.id,
              'kind': 'folder',
              'url': '',
              'lib_id': thiz.$store.state.Counter.userInfo.lib[0].id
            }
            smalltalk.prompt('新建文件夹', '请输入文件夹名称', '新建文件夹')
              .then(function (name) {
                if (name !== null && name !== '') {
                  thiz.childStatus = 'block'
                  message.name = name
                  thiz.$emit('childOper', message)
                }
              }, function () {
                console.log('close')
              })
          }
        })

        let newFileMenu = new MenuItem({
          label: '新建文件',
          accelerator: 'CmdOrCtrl+X',
          click () {
            let smalltalk = require('smalltalk/legacy')
            // let utils = require('../../../../static/utils.js')
            let message = {
              'oper': 'new',
              'id': thiz.rndNum(3),
              'name': '',
              'fath': thiz.item.id,
              'kind': 'file',
              'url': '',
              'lib_id': thiz.$store.state.Counter.userInfo.lib[0].id
            }
            smalltalk.prompt('新建文件', '请输入文件名称', '新建文件')
              .then(function (name) {
                if (name !== null && name !== '') {
                  thiz.childStatus = 'block'
                  message.name = name
                  smalltalk.prompt('新建文件', '请输入绑定链接', 'http://')
                    .then(function (url) {
                      if (url !== null && url !== '') {
                        message.url = url
                        thiz.$emit('childOper', message)
                      }
                    }, function () {
                      console.log('close')
                    })
                }
              }, function () {
                console.log('close')
              })
          }
        })

        let newCommandMenu = new MenuItem({
          label: '新建命令行',
          accelerator: 'CmdOrCtrl+X',
          click () {
            let smalltalk = require('smalltalk/legacy')
            // let utils = require('../../../../static/utils.js')
            let message = {
              'oper': 'new',
              'id': thiz.rndNum(3),
              'name': '',
              'fath': thiz.item.id,
              'kind': 'command',
              'url': '',
              'lib_id': thiz.$store.state.Counter.userInfo.lib[0].id
            }
            smalltalk.prompt('新建命令行', '请输入命令行名称', '新建命令行')
              .then(function (name) {
                if (name !== null && name !== '') {
                  thiz.childStatus = 'block'
                  message.name = name
                  thiz.$emit('childOper', message)
                }
              }, function () {
                console.log('close')
              })
          }
        })

        let newBackMenu = new MenuItem({
          label: '新建后台',
          accelerator: 'CmdOrCtrl+B',
          click () {
            let smalltalk = require('smalltalk/legacy')
            // let utils = require('../../../../static/utils.js')
            let message = {
              'oper': 'new',
              'id': thiz.rndNum(3),
              'name': '',
              'fath': thiz.item.id,
              'kind': 'back',
              'url': '',
              'lib_id': thiz.$store.state.Counter.userInfo.lib[0].id
            }
            smalltalk.prompt('新建后台', '请输入后台名称', '新建后台')
              .then(function (name) {
                if (name !== null && name !== '') {
                  thiz.childStatus = 'block'
                  message.name = name
                  smalltalk.prompt('新建后台', '请输入后台URL', 'http://')
                    .then(function (url) {
                      if (url !== null && url !== '') {
                        message.url = url
                        thiz.$emit('childOper', message)
                      }
                    }, function () {
                      console.log('close')
                    })
                }
              }, function () {
                console.log('close')
              })
          }
        })
        menu1.append(newFolderMenu)
        menu1.append(newCommandMenu)
        menu1.append(newFileMenu)
        menu1.append(newBackMenu)
        menu1.append(editMenu)
        menu1.append(deleteMenu)
        menu1.popup(this.$electron.remote.getCurrentWindow())
      },
      rndNum (n) {
        var rnd = ''
        for (var i = 0; i < n; i++) {
          rnd += Math.floor(Math.random() * 10)
        }
        return rnd
      }
    }
  }
</script>
<style>

  * {
    padding: 0;
    margin: 0;
  }

  .folder {
    width: 100%;
    padding: 3px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    color: rgb(211, 211, 211);
  }

  .folder:hover {
    width: 100%;
    padding: 3px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    color: rgb(124, 122, 248);
  }

  .child-folder {
    width: 100%;
    padding: 0 0 0 16px;
  }

  img {
    height: 10px;
    width: 10px;
    margin: 0 8px 0 15px;
    padding: 0;
  }
  
</style>