<template>
  <!-- index{bottom-bar{*}} -->
  <div class='bottom-bar-content'> 
    <div class='bottom-bar-lib' @click="handlerClick('lib')" @mouseenter="onMouseOver('libColor')" @mouseleave="onMouseOut('libColor')" :style="{background: libColor}" v-if="lib !== ''">
      <img class='bottom-icon' src='@/assets/icon/gker_white_icon.png'>
      {{lib}}
    </div>
    <div class='bottom-bar-alert' @click="handlerClick('alert')" @mouseenter="onMouseOver('alertColor')" @mouseleave="onMouseOut('alertColor')" :style="{background: alertColor}" v-if="user !== ''">
      <img class='bottom-icon' src='@/assets/icon/alert_white_icon.png'>
    </div>
    <div class='bottom-bar-user' @click="handlerClick('user')" @mouseenter="onMouseOver('userColor')" @mouseleave="onMouseOut('userColor')" :style="{background: userColor}" v-if="user !== ''">
      {{user}}
    </div>
    {{showListIfLogin}}
    <gk-search @childOper="onChildOper" :style="{display: isSearchshow?'block':'none'}" :object="searchList"></gk-search>
    <gk-message @childOper="onChildOper" :style="{display: isMessageshow?'block':'none'}" :object="messageList"></gk-message>
  </div>
</template>
<script>
  import GkSearch from '@/components/GkViews/GkSearch'
  import GkMessage from '@/components/GkViews/GkMessage'
  export default {
    components: {
      GkSearch,
      GkMessage
    },
    data () {
      return {
        libColor: 'rgb(28, 135, 241)',
        userColor: 'rgb(28, 135, 241)',
        alertColor: 'rgb(28, 135, 241)',
        isSearchshow: false,
        isMessageshow: false,
        messageList: [],
        showFrom: '',
        webSocket: 'close'
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
      showListIfLogin () {
        if (this.$store.state.Counter.userInfo.lib) this.listenMsg()
        else console.log('unlogin')
        // if (!this.$store.state.Counter.userInfo.lib) console.log('unlogin')
        // else this.listenMsg()
      },
      searchList () {
        let arr = [
          {
            'title': 'GKER',
            'text': ' BUILD NEW LIBRARY',
            'remark': ''
          }
        ]
        switch (this.showFrom) {
          case 'lib':
            for (let index in this.$store.state.Counter.userInfo.lib) {
              let temp = {
                'title': 'library',
                'text': this.$store.state.Counter.userInfo.lib[index].name,
                'remark': 'ownership of ' + this.$store.state.Counter.userInfo.lib[index].owner_id,
                'id': this.$store.state.Counter.userInfo.lib[index].id
              }
              console.log(this.$store.state.Counter.userInfo.lib[index].name)
              arr.push(temp)
            }
            break
          case 'user':
            arr = [
              {
                'title': 'Persinal file',
                'text': '个人档案',
                'remark': 'ALT + P'
              },
              {
                'title': 'Switch Account',
                'text': '切换账户',
                'remark': 'ALT + S'
              }
            ]
            break
        }
        return arr
      },
      user () {
        if (!this.$store.state.Counter.userInfo.name) return ''
        else return this.$store.state.Counter.userInfo.name
      },
      lib () {
        if (!this.$store.state.Counter.userInfo.lib) return ''
        else return this.$store.state.Counter.userInfo.lib[0].name
      }
    },
    methods: {
      onChildOper (data) {
        switch (data.from) {
          case 'message':
            switch (data.oper) {
              case 'cancel':
                this.isMessageshow = false
                break
            }
            break
          case 'search':
            switch (data.oper) {
              case 'cancel':
                this.isSearchshow = false
                break
              case 'click':
                switch (this.showFrom) {
                  case 'lib':
                    this.isSearchshow = false
                    let thiz = this
                    if (data.item.text === ' BUILD NEW LIBRARY') {
                      this.$smalltalk.prompt('新建资源库', '请输入库名称', '新建资源库')
                        .then(function (name) {
                          if (name !== null && name !== '') {
                            let item = {
                              'name': name,
                              'owner_id': thiz.$store.state.Counter.userInfo.id
                            }
                            thiz.$axios.get('update', {
                              params: {
                                'db': 'GkerLib',
                                'model': 'edit',
                                'item': JSON.stringify(item),
                                'items': JSON.stringify(item)
                              }
                            })
                              .then(function (response) {
                                thiz.$log({
                                  title: 'update',
                                  output: 'RESPONSE: ' + JSON.stringify(response, Object.keys(response), 1000)
                                })
                                thiz.$store.commit('FLASH_USER', thiz)
                                thiz.$toast(' S U C C E S S')
                              })
                              .catch(function (error) {
                                thiz.$smalltalk.alert('更新', error)
                                  .then(() => {
                                  })
                              })
                          }
                        }, function () {
                          console.log('close')
                        })
                    } else {
                      this.$store.commit('CHANGE_LIB', data.item)
                      let message = {
                        'from': 'bottom',
                        'oper': 'loadData'
                      }
                      this.$emit('childOper', message)
                    }
                    break
                  case 'user':
                    this.isSearchshow = false
                    let msg = {
                      'from': 'bottom',
                      'oper': 'exit'
                    }
                    this.$emit('childOper', msg)
                    break
                }
                break
            }
            break
        }
      },
      handlerClick (msg) {
        switch (msg) {
          case 'lib':
            this.showFrom = 'lib'
            this.isSearchshow = true
            break
          case 'user':
            this.showFrom = 'user'
            this.isSearchshow = true
            break
          case 'alert':
            this.listenMsg()
            this.isMessageshow = true
            break
        }
      },
      onMouseOver (item) {
        eval('this.' + item + " = 'rgb(105, 180, 255)'")
      },
      onMouseOut (item) {
        eval('this.' + item + " = 'rgb(28, 135, 241)'")
      },
      createWebSocket (urlValue) {
        if (window.WebSocket) return new WebSocket(urlValue)
        return false
      },
      listenMsg () {
        let thiz = this
        if (this.webSocket === 'close') {
          this.webSocket = this.createWebSocket('ws://47.94.197.84:3001')
          this.webSocket.onopen = function (evt) {
            console.log('进入聊天室')
            let message = {
              from: thiz.$store.state.Counter.userInfo.name,
              to: 'listen',
              content: 'null'
            }
            console.log(message)
            thiz.webSocket.send(JSON.stringify(message))
          }
          this.webSocket.onmessage = function (evt) {
            // 这是服务端返回的数据
            let msg = JSON.parse(evt.data)
            let temp = {
              'title': thiz.$moment().format('YYYY-MM-DD HH:MM:SS'),
              'text': msg.from,
              'remark': msg.content,
              'height': 17
            }
            let id = setInterval(() => {
              if (temp.height > 36) {
                // thiz.messageList.push({s: 's'})
                // thiz.messageList.pop()
                // thiz.messageList = JSON.parse(JSON.stringify(thiz.messageList))
                window.clearInterval(id)
              } else {
                temp.height += 1
                thiz.messageList.pop()
                thiz.messageList.push(temp)
              }
            }, 10)
            thiz.messageList.push(temp)
            thiz.$toast(' M E S S A G E')
          }
          // 关闭连接
          this.webSocket.onclose = function (evt) {
            thiz.webSocket = 'close'
            console.log('Connection closed.')
          }
        }
      }
    }
  }
</script>
<style>
  .bottom-bar-content {
    width: 100%;
    height: 25px;
    background: rgb(28, 135, 241);
  }

  .bottom-icon {
    height: 20px;
    width: 20px;
    margin: 0 3px 0 0;
  }

  .bottom-bar-lib {
    height: 25px;
    padding: 0 18px 0 15px;
    line-height: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: azure;
    font-size: 14px;
    float: left;
  }

  .bottom-bar-user {
    height: 25px;
    padding: 0 15px;
    line-height: 25px;
    color: azure;
    font-size: 14px;
    float: right;
  }

  .bottom-bar-alert {
    height: 25px;
    padding: 2px 2px 0 5px;
    line-height: 25px;
    color: azure;
    float: right;
  }
</style>