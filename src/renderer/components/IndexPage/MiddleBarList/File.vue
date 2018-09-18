<template>
  <!-- index{middle-bar-list{file{*}}} -->
  <div class='files'>
    <div class='file' @click="onClick" @contextmenu.stop="handlerFiles">
      <img class='url-icon' :src="logoURL">{{item.name}}<img class='circle' src='@/assets/icon/circle_green_icon.png' :style='{display: fileStatus}'>
    </div>
    {{flashFathStatus}}
  </div>
</template>
<script>
  export default {
    props: ['item', 'chooseId'],
    data () {
      return {
        fileStatus: 'none',
        logoURL: require('@/assets/icon/url_blue_icon.png')
      }
    },
    created () {
      if (this.item.kind === 'file') this.logoURL = require('@/assets/icon/url_blue_icon.png')
      else if (this.item.kind === 'back') this.logoURL = require('@/assets/icon/back_green_icon.png')
    },
    computed: {
      flashFathStatus () {
        if (this.item.id === this.chooseId) {
          this.fileStatus = 'block'
        } else {
          this.fileStatus = 'none'
        }
      }
    },
    methods: {
      onClick () {
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
            smalltalk.confirm('删除文件', '删除将无法恢复 确认删除吗')
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

        let editUrlMenu = new MenuItem({
          label: '修改 URL',
          accelerator: 'CmdOrCtrl+U',
          click () {
            let smalltalk = require('smalltalk/legacy')
            let message = {
              'oper': 'reurl',
              'url': '',
              'id': thiz.item.id
            }
            smalltalk.prompt('修改 URL', '请输入新URL', thiz.item.url)
              .then(function (url) {
                if (url !== null && url !== '') {
                  message.url = url
                  thiz.$emit('childOper', message)
                }
              }, function () {
                console.log('close')
              })
          }
        })

        menu1.append(editMenu)
        menu1.append(deleteMenu)
        menu1.append(editUrlMenu)
        menu1.popup(this.$electron.remote.getCurrentWindow())
      }
    }
  }
</script>
<style>

  * {
    padding: 0;
    margin: 0;
  }

  .file {
    width: 100%;
    padding: 3px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    color: rgb(211, 211, 211);
  }

  img {
    height: 10px;
    width: 10px;
    margin: 0 8px 0 15px;
    padding: 0;
  }
  
</style>

