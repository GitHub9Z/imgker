<template>
  <!-- index{right-bar{console{*}}} -->
  <div class='console-content'>
    <div class="divider"></div>
    <div class="console-bar">
      <gk-button :active="active" @childOper="onChildOper" v-for="item in buttonList" :key='item' :text="item.text" :color="item.color"></gk-button>
    </div>
    <shell class='console-shell' :style="{display:active === '终端'?'block':'none'}"></shell>
    <outputer class='console-shell' :style="{display:active === '输出'?'block':'none'}"></outputer>
    <git-iframe v-if="$store.state.Counter.userInfo.lib[0].history_tree" :tree="JSON.parse($store.state.Counter.userInfo.lib[0].history_tree)" @childOper="onChildOper" v-show="active === '版本控制台'"></git-iframe>
  </div>
</template>
<script>
  import Shell from '@/components/IndexPage/RightBar/Console/Shell'
  import Outputer from '@/components/IndexPage/RightBar/Console/Output'
  import GitIframe from '@/components/IndexPage/RightBar/GitIframe'
  import GkButton from '@/components/GkViews/GkButton'
  export default {
    components: {
      Outputer,
      Shell,
      GkButton,
      GitIframe
    },
    data () {
      return {
        active: '',
        buttonList: [
          {
            'text': '摘要',
            'color': '#525252'
          },
          {
            'text': '输出',
            'color': '#525252'
          },
          {
            'text': '版本控制台',
            'color': '#525252'
          },
          {
            'text': '终端',
            'color': '#525252'
          }
        ]
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      onChildOper (data) {
        switch (data.from) {
          case 'button':
            switch (data.oper) {
              case 'click':
                this.onButtonClick(data)
                break
            }
            break
          case 'git':
            this.$emit('childOper', data)
            break
        }
      },
      onButtonClick (data) {
        this.active = data.text
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
    font-family: 'Menlo Bold', 'monospace', monospace, 'Droid Sans Fallback', 'Noto Color Emoji';
  }

  .divider{
    height: 1px;
    width: 100%;
    background: #525252;
    padding: 0;
    margin: 0;
  }

  .console-bar{
    height: 50px;
    width: 100%;
    padding: 10px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #222222;
  }

  .console-shell{
    height: 300px;
    width: calc(100% + 17px);
    overflow-y: scroll;
    min-width: 1200px;
    background: #222222;
  }

  .console-shell::-webkit-scrollbar {/*滚动条整体样式*/
    width: 15px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 3px;
  }

  .console-shell::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: #535353;
  }

  .console-shell::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .console-shell::-webkit-scrollbar-thumb:window-inactive {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .console-shell::-webkit-scrollbar-thumb:hover {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: #666666;
  }
</style>