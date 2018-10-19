<template>
  <!-- gk-message{*} -->
  <div class="message-back" @click="cancel">
  <div class="message-content"  @click.stop="onClick('')">
    <div class="message-block"></div>
    <div class="message-content-area" ref="scroll">
      <div class='message-item' v-for="(value, key) in showList" :key='key' @click.stop="onClick(value)" :style="{background: value.title === 'GKER'?'rgb(38, 38, 88)':'', height: value.height + 'px'}">
        <div class="item-title">[{{value.title}}]</div>
        <div class="item-text">{{value.text}}:</div>
        <div class="item-remark">{{value.remark}}</div>
      </div>
    </div>
    <div class="message-bar" @click.stop="onSearchClick">
      <input class="message-input" v-model="messageStr" type="text" :placeholder="object.length === 0 ? '没有新通知' : '请输入搜索内容'">
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['object'],
    data () {
      return {
        messageStr: ''
      }
    },
    created () {
    },
    computed: {
      showList () {
        // :style="{color: value.title === 'GKER'?'rgb(52, 219, 66)':'rgb(224, 224, 224)'}"
        let showList = []
        let filter = this.messageStr
        this.$nextTick(() => {
          let scroll = this.$refs.scroll
          scroll.scrollTop = scroll.scrollHeight
        })
        if (filter === '' || filter === null) {
          showList = this.object
        } else {
          for (let index in this.object) {
            for (let value in this.object[index]) {
              if (((this.object[index])[value] + ' ').indexOf(filter) > -1) {
                showList.push(JSON.parse(JSON.stringify(this.object[index])))
                break
              }
            }
          }
        }
        return showList
      }
    },
    methods: {
      cancel () {
        let message = {
          'from': 'message',
          'oper': 'cancel'
        }
        this.$emit('childOper', message)
      },
      onClick (item) {
        let message = {
          'from': 'message',
          'oper': 'click',
          'item': item
        }
        this.$emit('childOper', message)
      },
      onSearchClick () {
        // 点击搜索栏
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .icon {
    width: 30px;
    height: 30px;
    padding: 8px;
    margin: 0 0 0 268px;
  }

  img {
    width: 14px;
    height: 14px;
  }

  .message-back {
    width: 100%;
    height: 100%;
    position: absolute; left: 0; top: 0px; right: 0; z-index: 110;
    background: transparent;
  }

  .message-content {
    width: 500px;
    max-height: 400px;
    position: absolute; bottom: 35px; right: 10px; z-index: 111;
    margin: auto;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);  
    background: rgb(48, 47, 47);
  }

  .message-content-area::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 3px;
  }

  .message-content-area::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: #535353;
  }

  .message-content-area::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .message-content-area::-webkit-scrollbar-thumb:window-inactive {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .message-content-area {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    padding: 0 10px 10px 10px;
  }

  .message-block {
    width: 100%;
    height: 10px;
  }

  .message-item {
    margin: 10px 0 0 0;
    padding: 3px 12px;
    height: 37px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);
    background: rgb(44, 153, 44);
    color: rgb(199, 199, 199);
  }

  .message-item:hover {
    margin: 10px 0 0 0;
    padding: 3px 12px;
    height: 37px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-shadow: 0px 0px 10px rgb(93, 255, 106);
    background: rgb(44, 153, 44);
    color: rgb(199, 199, 199);
  }

  .item-title {
    line-height: 32px;
    min-width: 175px;
    font-size: 17px;
    font-weight: bold;
    color: rgb(209, 209, 209);
  }

  .item-text {
    line-height: 32px;
    font-size: 17px;
    margin: 0 5px;
    font-weight: bold;
    color: rgb(240, 255, 32);
  }

  .item-remark {
    overflow:scroll;
    line-height: 32px;
    font-size: 17px;
    color: rgb(255, 255, 255);
  }

  .item-remark::-webkit-scrollbar {/*滚动条整体样式*/
    width: 1px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .item-remark::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .item-remark::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .item-remark::-webkit-scrollbar-thumb:window-inactive {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .message-bar {
    padding: 6px;
  }

  .message-input {
    background: rgb(77, 77, 77);
    border: 1px solid rgb(137, 78, 247);
    width: 100%;
    height: 30px;
    border: 0;
    padding: 5px 4px;
    font-size: 15px;
    color: rgb(199, 199, 199);
    outline-color: rgb(118, 118, 255);
  }
  
</style>