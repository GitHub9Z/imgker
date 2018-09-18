<template>
  <!-- gk-data-box{*} -->
  <div class='databox-content' @mouseenter="onMouseOver()" @mouseleave="onMouseOut()" :style="{background: boxColor}">
      <div class="title">{{item.title}}</div>
      <div class="divider"></div>
      <div class="data">{{item.data}}</div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'color'],
    data () {
      return {
        boxColor: 'rgb(61, 61, 61)'
      }
    },
    created () {
    },
    computed: {
    },
    methods: {
      onClick () {
        let message = {
          'from': 'button',
          'oper': 'click',
          'text': this.text
        }
        this.$emit('childOper', message)
      },
      onMouseOver () {
        this.boxColor = 'rgb(82, 82, 82)'
      },
      onMouseOut () {
        this.boxColor = 'rgb(61, 61, 61)'
      }
    }
  }
</script>
<style>

  * {
    padding: 0;
    margin: 0;
  }

  .databox-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Menlo Bold', 'monospace', monospace, 'Droid Sans Fallback', 'Noto Color Emoji';
  }

  .title {
    height: 50%;
    width: 100%;
    margin: 25px 0;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: rgb(170, 170, 170);
  }

  .divider{
    height: 8px;
    width: 60%;
    background: rgb(170, 170, 170);
  }

  .data {
    height: 50%;
    width: 100%;
    margin: 25px 0;
    text-align: center;
    font-size: 45px;
    font-weight: bold;
    color: rgb(170, 170, 170);
  }
  
</style>