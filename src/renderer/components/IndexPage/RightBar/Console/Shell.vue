<template>
  <!-- index{right-bar{shell{*}}} -->
  <div class='shell-content' ref="scroll" @click="focusOnInput"> 
    <shell-item :item="item" v-for="item in bashlist" :key='item'></shell-item>
    <div class="command-line">
        <div class="user-text">{{activeItem.user}}</div><div class="url-text">:{{activeItem.url}} $</div><input class="command-input" ref="inputItem" v-model="activeItem.command" type="text" @keyup.enter="runCommand">
    </div>
  </div>
</template>
<script>
  import ShellItem from '@/components/IndexPage/RightBar/Console/Shell/ShellItem'
  export default {
    components: {
      ShellItem
    },
    data () {
      return {
        activeItem: {
          'user': 'none',
          'url': 'none',
          'command': 'none',
          'result': 'none',
          'time': 'none'
        },
        exec: '',
        bashlist: [
        ],
        webSocket: 'null'
      }
    },
    created () {
      this.exec = require('child_process').exec
      this.flashActiveItem()
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      createWebSocket (urlValue) {
        if (window.WebSocket) return new WebSocket(urlValue)
        return false
      },
      sendMsg (toWho, msg) {
        let thiz = this
        if (this.webSocket === 'null') {
          this.webSocket = this.createWebSocket('ws://47.94.197.84:3001')
          this.webSocket.onopen = function (evt) {
            console.log('进入聊天室')
            thiz.sendMsg(toWho, msg)
          }
          this.webSocket.onmessage = function (evt) {
            // 这是服务端返回的数据
            let msg = JSON.parse(evt.data)
            thiz.$log({
              title: 'chat',
              output: msg.from + ': ' + msg.content
            })
            thiz.$toast(' M E S S A G E')
          }
          // 关闭连接
          this.webSocket.onclose = function (evt) {
            console.log('Connection closed.')
          }
        } else {
          let message = {
            from: this.$store.state.Counter.userInfo.name,
            to: toWho,
            content: msg
          }
          console.log(message)
          this.webSocket.send(JSON.stringify(message))
        }
      },
      focusOnInput () {
        this.$refs.inputItem.focus()
      },
      flashActiveItem () {
        let thiz = this
        this.exec('who', function (error, stdout, stderr) {
          if (error) {
            console.log(error)
            return
          }
          let ls = (stdout + 'more').trim().split(' ')
          thiz.activeItem.user = ls[0]
        })
        this.exec('pwd', function (error, stdout, stderr) {
          if (error) {
            console.log(error)
            return
          }
          thiz.activeItem.url = stdout.replace(/\s+/g, '')
        })
        this.activeItem.command = ''
      },
      runCommand () {
        let thiz = this
        if (thiz.activeItem.command.charAt(0) === '@' || thiz.activeItem.command.charAt(0) === '＠') {
          let arr = thiz.activeItem.command.split(/@|:|：|＠/)
          console.log(arr)
          if (arr.length === 3) {
            console.log('send')
            this.sendMsg(arr[1], arr[2])
            this.activeItem.result = '发送消息成功'
            this.bashlist.push(JSON.parse(JSON.stringify(thiz.activeItem)))
            this.activeItem.command = ''
            thiz.$nextTick(() => {
              let scroll = thiz.$refs.scroll
              scroll.scrollTop = scroll.scrollHeight
            })
          } else console.log('form error')
          return
        }
        this.exec(thiz.activeItem.command + ';pwd', {cwd: thiz.activeItem.url}, function (error, stdout, stderr) {
          if (error) {
            stdout = error
          }
          let newStr = stdout.replace(/\s+/g, '*')
          let ls = newStr.trim().split('*')
          let temp = ls[ls.length - 2]
          ls.splice(ls.length - 2, 1)
          thiz.activeItem.result = ls.join(' ')
          thiz.bashlist.push(JSON.parse(JSON.stringify(thiz.activeItem)))
          thiz.activeItem.command = ''
          thiz.activeItem.url = temp
          thiz.$nextTick(() => {
            let scroll = thiz.$refs.scroll
            scroll.scrollTop = scroll.scrollHeight
          })
        })
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .shell-content{
    padding: 5px 5px 0 20px;
    overflow-y: auto;
  }

  .command-line{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 2px;
  }

  .user-text{
    color: rgb(102, 180, 102);
    font-size: 18px;
    font-weight: bold;
  }

  .url-text{
    color: rgb(28, 135, 241);
    font-size: 18px;
    font-weight: bold;
  }

  .command-input{
    background: transparent;
    width: 200px;
    margin: 5px;
    border: 0;
    font-size: 18px;
    font-weight: bold;
    color: azure;
    outline:none;
  }
</style>