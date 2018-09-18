<template>
  <!-- gk-button{*} -->
  <div class='button' @click="onClick" :style='{color: active===text?activeColor:normalColor}'  @mouseenter="onMouseOver()" @mouseleave="onMouseOut()">
      {{text}}
      <div class="divider" v-if="active===text" :style='{background: color}'></div>
  </div>
</template>

<script>
  export default {
    props: ['text', 'active', 'color'],
    data () {
      return {
        activeColor: 'azure',
        normalColor: 'rgb(134, 134, 134)'
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
        this.normalColor = 'azure'
      },
      onMouseOut () {
        this.normalColor = 'rgb(134, 134, 134)'
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .button {
    height: 30px;
    margin: 0 25px;
    text-align: center;
    font-size: 13px;
    color: rgb(134, 134, 134);
  }

  .button:hover{
    height: 30px;
    margin: 0 25px;
    text-align: center;
    font-size: 13px;
    color: azure;
  }

  .divider {
    height: 2px;
    width: calc(100% - 4px);
    margin: 5px 0 0 2px;
  }
  
</style>