<template>
  <!-- index{right-bar{console{*}}} -->
  <div class='console-content'>
    <div class="divider"></div>
    <div class="console-bar">
      <gk-button :active="active" @childOper="onChildOper" v-for="item in buttonList" :key='item' :text="item.text" :color="item.color">摘要</gk-button>
    </div>
    <shell class='console-shell' :style="{display: active === '终端'?'block':'none'}"></shell>
  </div>
</template>
<script>
  import Shell from '@/components/IndexPage/RightBar/Console/Shell'
  import GkButton from '@/components/GkViews/GkButton'
  export default {
    components: {
      Shell,
      GkButton
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
</style>