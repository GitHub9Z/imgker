<template>
  <!-- index{middle-bar-list{*}} -->
  <div class='middle-bar-list-content'>
    <folder :item="item" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="item in fileslist" :key='item' v-if="item.fath===''&&item.kind==='folder'">
      <folder :item="itemTwo" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemTwo in fileslist" :key='itemTwo' v-if="itemTwo.fath===item.id&&itemTwo.kind==='folder'">
        <folder :item="itemthree" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemthree in fileslist" :key='itemthree' v-if="itemthree.fath===itemTwo.id&&itemthree.kind==='folder'">
          <folder :item="itemfour" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemfour in fileslist" :key='itemfour' v-if="itemfour.fath===itemthree.id&&itemfour.kind==='folder'">
            <folder :item="itemfive" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemfive in fileslist" :key='itemfive' v-if="itemfive.fath===itemfour.id&&itemfive.kind==='folder'"></folder>
            <file :item="itemfive" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemfive in fileslist" :key='itemfive' v-if="itemfive.fath===itemfour.id&&itemfive.kind!=='folder'"></file>
          </folder>
          <file :item="itemfour" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemfour in fileslist" :key='itemfour' v-if="itemfour.fath===itemthree.id&&itemfour.kind!=='folder'"></file>
        </folder>
        <file :item="itemthree" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemthree in fileslist" :key='itemthree' v-if="itemthree.fath===itemTwo.id&&itemthree.kind!=='folder'"></file>
      </folder>
      <file :item="itemTwo" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="itemTwo in fileslist" :key='itemTwo' v-if="itemTwo.fath===item.id&&itemTwo.kind!=='folder'"></file>
    </folder>
    <file :item="item" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="item in fileslist" :key='item' v-if="item.fath===''&&item.kind!=='folder'"></file>
    <div class='block' @contextmenu.stop="renderMenu" @drop.stop="drop($event)" @dragover.stop="allowDrop($event)" @dragenter.stop="enter($event)" @dragleave.stop="leave($event)" :style="{background: isDragedOver?'rgb(87, 86, 86)':''}">
      <!-- {static-list{deprecated v0->v1.0.0}}
                    <folder name="hello" id="1" :chooseId="chooseId" v-on:childClick="onChildClick">
                      <folder name="hello-1" id="2"  :chooseId="chooseId" v-on:childClick="onChildClick">
                        <folder name="hello-1-1" id="4"  :chooseId="chooseId" v-on:childClick="onChildClick">
                          <file name="file-1-1" id="5"  :chooseId="chooseId" v-on:childClick="onChildClick"></file>
                        </folder>
                        <file name="file-1" id="6"  :chooseId="chooseId" v-on:childClick="onChildClick"></file>
                      </folder>
                    </folder>
                    <folder name="world" id="3"  :chooseId="chooseId" v-on:childClick="onChildClick">
                      <file name="file-2" id="7"  :chooseId="chooseId" v-on:childClick="onChildClick"></file>
                    </folder>
                    -->
    </div>
</template>

<script>
  import Folder from '@/components/IndexPage/MiddleBarList/Folder'
  import File from '@/components/IndexPage/MiddleBarList/File'
  export default {
    props: ['fileslist', 'chooseId'],
    components: {
      Folder,
      File
    },
    data() {
      return {
        ddfileslist: [{
            'id': '1',
            'name': 'folder-1',
            'fath': '',
            'kind': 'folder',
            'url': ''
          },
          {
            'id': '2',
            'name': 'folder-1-1',
            'fath': '1',
            'kind': 'folder',
            'url': ''
          },
          {
            'id': '3',
            'name': 'folder-1-2',
            'fath': '1',
            'kind': 'folder',
            'url': ''
          },
          {
            'id': '4',
            'name': 'folder-2',
            'fath': '',
            'kind': 'folder',
            'url': ''
          },
          {
            'id': '5',
            'name': 'file-2-1',
            'fath': '4',
            'kind': 'file',
            'url': 'http://www.w3school.com.cn/'
          },
          {
            'id': '6',
            'name': 'file-1-2-1',
            'fath': '3',
            'kind': 'file',
            'url': 'https://www.cnblogs.com/carekee/articles/1729574.html'
          },
          {
            'id': '7',
            'name': 'file-1-2-2',
            'fath': '3',
            'kind': 'file',
            'url': 'https://www.zybang.com/question/110a0cb803b58b9188e642912ef4fa32.html'
          },
          {
            'id': '8',
            'name': 'file-2-2',
            'fath': '4',
            'kind': 'file',
            'url': 'https://blog.csdn.net/xiha_zhu/article/details/80449339'
          }
        ],
        isDragedOver: false
      }
    },
    created() {
      this.getFilesList()
    },
    mounted() {},
    computed: {
      /* {string-render{deprecated v0->v1.0.0}}
      renderHtml () {
        var index
        var htmlStr = ''
        for (index in this.fileslist) {
          if (this.fileslist[index].fath === '') {
            htmlStr += this.renderItem(this.fileslist[index])
          }
        }
        alert(htmlStr)
      } */
    },
    methods: {
      drop(event) {
        this.isDragedOver = false
        let message = {
          'oper': 'drop',
          'id': ''
        }
        this.onChildOper(message)
      },
      allowDrop(event) {
        event.preventDefault()
        this.isDragedOver = true
      },
      enter(event) {
        this.isDragedOver = true
        console.log('enter')
      },
      leave(event) {
        this.isDragedOver = false
        console.log('leave')
      },
      renderMenu() {
        const MenuItem = this.$electron.remote.MenuItem
        const Menu = this.$electron.remote.Menu
        const menu1 = new Menu()
        let thiz = this
        let newFolderMenu = new MenuItem({
          label: '新建文件夹',
          accelerator: 'CmdOrCtrl+C',
          click() {
            let smalltalk = require('smalltalk/legacy')
            // let utils = require('../../../../static/utils.js')
            let message = {
              'oper': 'new',
              'id': thiz.rndNum(3),
              'name': '',
              'fath': '',
              'kind': 'folder',
              'url': '',
              'lib_id': thiz.$store.state.Counter.userInfo.lib[0].id
            }
            smalltalk.prompt('新建文件夹', '请输入文件夹名称', '新建文件夹')
              .then(function(name) {
                if (name !== null && name !== '') {
                  message.name = name
                  thiz.onChildOper(message)
                }
              }, function() {
                console.log('close')
              })
          }
        })
        menu1.append(newFolderMenu)
        menu1.popup(this.$electron.remote.getCurrentWindow())
      },
      getFilesList() {
        // wait-for-add？网络请求
      },
      onChildClick(data) {
        this.chooseId = data.id
        // eval("this.$refs."+data+".getfathStatus()")？refs如何遍历
        // this.$forceUpdate()！强制渲染元素
        let index
        for (index in this.fileslist) {
          if (this.fileslist[index].id === data.id && this.fileslist[index].kind !== 'folder') {
            this.fileslist[index].oper = 'click'
            this.fileslist[index].from = 'list'
            this.$emit('childOper', this.fileslist[index])
            return
          }
        }
      },
      onChildOper(data) {
        switch (data.oper) {
          case 'click':
            this.onChildClick(data)
            break
          case 'rename':
            this.onChildRename(data)
            break
          case 'reurl':
            this.onChildReurl(data)
            break
          case 'new':
            this.onChildNew(data)
            break
          case 'delete':
            this.onChildDelete(data)
            break
          case 'drop':
            this.onChildDrop(data)
            break
        }
      },
      onChildRename(data) {
        let index
        let smalltalk = require('smalltalk/legacy')
        let thiz = this
        for (index in this.fileslist) {
          if (thiz.fileslist[index].name === data.name) {
            smalltalk.alert('重命名', '命名冲突')
              .then(() => {})
            return
          }
        }
        for (index in this.fileslist) {
          if (this.fileslist[index].id === data.id) {
            thiz.fileslist[index].name = data.name
            this.$axios.get('submitFile', {
                params: {
                  ...thiz.fileslist[index]
                }
              })
              .then(function(response) {
                thiz.rebuildHistoryTree(`重命名[${thiz.fileslist[index].name}]`)
                thiz.$nextTick(() => {
                  let message = {
                    'from': 'list',
                    'oper': 'loadData',
                    'id': data.id
                  }
                  thiz.$emit('childOper', message)
                })
              })
              .catch(function(error) {
                smalltalk.alert('重命名', error)
                  .then(() => {})
              })
          }
        }
      },
      onChildDrop(data) {
        let smalltalk = require('smalltalk/legacy')
        let thiz = this
        let item = thiz.$store.state.Counter.dragItem
        item.fath = data.id
        this.$axios.get('submitFile', {
            params: {
              ...item
            }
          })
          .then(function(response) {
            thiz.rebuildHistoryTree(`移动[${item.name}]`)
            thiz.$nextTick(() => {
              let message = {
                'from': 'list',
                'oper': 'loadData',
                'id': data.id
              }
              thiz.$emit('childOper', message)
            })
          })
          .catch(function(error) {
            smalltalk.alert('重命名', error)
              .then(() => {})
          })
      },
      onChildReurl(data) {
        let index
        let smalltalk = require('smalltalk/legacy')
        let thiz = this
        for (index in this.fileslist) {
          if (this.fileslist[index].id === data.id) {
            this.fileslist[index].url = data.url
            this.$axios.get('submitFile', {
                params: {
                  ...thiz.fileslist[index]
                }
              })
              .then(function(response) {
                thiz.rebuildHistoryTree(`编辑[${thiz.fileslist[index].name}]`)
                thiz.$nextTick(() => {
                  let message = {
                    'from': 'list',
                    'oper': 'loadData',
                    'id': data.id
                  }
                  thiz.$emit('childOper', message)
                })
              })
              .catch(function(error) {
                smalltalk.alert('修改 URL', error)
                  .then(() => {})
              })
          }
        }
      },
      onChildNew(data) {
        let index
        let thiz = this
        let smalltalk = require('smalltalk/legacy')
        for (index in this.fileslist) {
          if (thiz.fileslist[index].name === data.name) {
            smalltalk.alert('新建', '命名冲突')
              .then(() => {})
            return
          }
        }
        this.$axios.get('submitFile', {
            params: {
              ...data
            }
          })
          .then(function(response) {
            thiz.fileslist.push(data)
            thiz.rebuildHistoryTree(`新建[${data.name}]`)
            thiz.$nextTick(() => {
              let message = {
                'from': 'list',
                'oper': 'loadData',
                'id': data.id
              }
              thiz.$emit('childOper', message)
            })
          })
          .catch(function(error) {
            smalltalk.alert('新建', error)
              .then(() => {})
          })
      },
      onChildDelete(data) {
        let index
        let thiz = this
        let smalltalk = require('smalltalk/legacy')
        for (index in this.fileslist) {
          if (this.fileslist[index].id === data.id) {
            data.oper = 'close'
            data.lastChoose = this.chooseId
            const fileName = this.fileslist[index].name
            this.fileslist.splice(index, 1)
            this.$emit('childOper', data)
            // this.fileslist.splice(index, 1)
            this.$axios.get('deleteFile', {
                params: {
                  'delid': data.id
                }
              })
              .then(function(response) {
                thiz.rebuildHistoryTree(`删除[${fileName}]`)
                thiz.$nextTick(() => {
                  let message = {
                    'from': 'list',
                    'oper': 'loadData',
                    'id': data.id
                  }
                  thiz.$emit('childOper', message)
                })
              })
              .catch(function(error) {
                smalltalk.alert('删除', error)
                  .then(() => {})
              })
            return
          }
        }
      },
      rndNum(n) {
        var rnd = ''
        for (var i = 0; i < n; i++) {
          rnd += Math.floor(Math.random() * 10)
        }
        return rnd
      },
      rebuildHistoryTree(msg) {
        let message = {
          'from': 'global',
          'oper': 'saveTree',
          'core': msg
        }
        this.$emit('childOper', message)
      }
      /* {string-render{deprecated v0->v1.0.0}}
      renderItem (item) {
        var index
        var htmlStr = '<' + item.kind + ' name="' + item.name + '" id="' + item.id + '"  :chooseId="chooseId" v-on:childClick="onChildClick">'
        for (index in this.fileslist) {
          if (this.fileslist[index].fath === item.id) {
            htmlStr += this.renderItem(this.fileslist[index])
          }
        }
        htmlStr += '</' + item.kind + '>'
        return htmlStr
      } */
    }
  }
</script>

<style>
  .middle-bar-list-content {
    width: 100%;
    height: calc(100% - 65px);
    padding: 8px 8px;
    overflow: scroll;
  }
  
  .middle-bar-list-content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 1px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  
  .middle-bar-list-content::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }
  
  .middle-bar-list-content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }
  
  .middle-bar-list-content::-webkit-scrollbar-thumb:window-inactive {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }
  
  .block {
    width: 100%;
    height: 100%;
  }
</style>