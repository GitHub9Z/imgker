<template>
  <!-- index{right-tab-bar{tab{*}}} -->
  <div class='tab' @click="onClick" :style='{background: TabColor}' @mouseenter="onMouseOver()" @mouseleave="onMouseOut()">
      <img class='url-icon' :src="logoURL">{{item.name}}<img class='tab-oper' @click="onTabClosed()" :src="operURL">
      {{flashActiveStatus}}
  </div>
</template>

<script>
  export default {
    props: ['item', 'chooseId'],
    data () {
      return {
        TabColor: 'none',
        logoURL: require('@/assets/icon/url_blue_icon.png'),
        operURL: require('@/assets/icon/circle_green_icon.png')
      }
    },
    created () {
      let iconConfig = {
        file: require('@/assets/icon/url_blue_icon.png'),
        back: require('@/assets/icon/back_green_icon.png'),
        command: require('@/assets/icon/code_yellow_icon.png')
      }
      this.logoURL = iconConfig[this.item.kind]
    },
    computed: {
      flashActiveStatus () {
        if (this.item.id === this.chooseId) {
          this.TabColor = '#2f2f2f'
        } else {
          this.TabColor = '#383838'
        }
      }
    },
    methods: {
      onClick () {
        let message = {
          'from': 'tab',
          'oper': 'click',
          'id': this.item.id
        }
        this.$emit('childOper', message)
      },
      onMouseOver () {
        this.TabColor = '#464646'
        this.operURL = require('@/assets/icon/delete_white_icon.png')
      },
      onMouseOut () {
        if (this.item.id === this.chooseId) {
          this.TabColor = '#2f2f2f'
        } else {
          this.TabColor = '#383838'
        }
        this.operURL = require('@/assets/icon/circle_green_icon.png')
      },
      onTabClosed () {
        let message = {
          'from': 'tab',
          'oper': 'close',
          'id': this.item.id
        }
        this.$emit('childOper', message)
      }
    }
  }
</script>
<style>

  * {
    padding: 0;
    margin: 0;
  }

  .tab {
    height: 40px;
    padding: 0 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    color: rgb(211, 211, 211);
    white-space: nowrap;
  }

  .url-icon {
    height: 14px;
    width: 14px;
    margin: 0 4px 0 15px;
    padding: 0;
  }

  .tab-oper {
    height: 10px;
    width: 10px;
    margin: 0 15px 0 25px;
    padding: 0;
  }
  
</style>

