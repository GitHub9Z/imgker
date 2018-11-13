<template>
  <!-- index{top-bar{*}} -->
  <div class='top-bar-content'>
    <div class='icon-content' @click="handlerClick('close')" @mouseenter="onMouseOver('closeColor')" @mouseleave="onMouseOut('closeColor')" :style="{background: closeColor}">
      <img class='top-icon' src='@/assets/icon/close_white_icon.png'>
    </div>
    <div class='icon-content' @click="handlerClick('max')" @mouseenter="onMouseOver('maxColor')" @mouseleave="onMouseOut('maxColor')" :style="{background: maxColor}">
      <img class='top-icon' src='@/assets/icon/max_white_icon.png'>
    </div>
    <div class='icon-content' @click="handlerClick('min')" @mouseenter="onMouseOver('minColor')" @mouseleave="onMouseOut('minColor')" :style="{background: minColor}">
      <img class='top-icon' src='@/assets/icon/min_white_icon.png'>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        closeColor: 'rgb(73, 73, 73)',
        maxColor: 'rgb(73, 73, 73)',
        minColor: 'rgb(73, 73, 73)'
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      handlerClick (msg) {
        const ipc = require('electron').ipcRenderer
        ipc.send('getMsg', msg)
      },
      onMouseOver (item) {
        if (item === 'closeColor') eval('this.' + item + " = 'rgb(201, 72, 72)'")
        else eval('this.' + item + " = 'rgb(100, 100, 100)'")
      },
      onMouseOut (item) {
        eval('this.' + item + " = 'rgb(73, 73, 73)'")
      }
    }
  }
</script>
<style>
  .top-bar-content {
    width: 100%;
    height: 35px;
    -webkit-app-region: drag;
    background: rgb(73, 73, 73);
  }

  .top-icon {
    height: 17px;
    width: 17px;
    margin: 9px 16px;
  }

  .icon-content {
    height: 35px;
    float: right;
    -webkit-app-region: no-drag;
  }

</style>