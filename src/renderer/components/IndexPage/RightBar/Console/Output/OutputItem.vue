<template>
  <!-- index{right-bar{output{output-item{*}}}} -->
  <div class='output-item-content'>
    <div class="head-text">></div><div class="title-text" :style="{color: item.color}">{{item.title}}:</div><div class="output-text" v-html="item.output"></div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    components: {
    },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  
  .output-item-content{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 2px 2px;
  }

  .head-text{
    color: rgb(102, 180, 102);
    margin: 0 10px 0 0;
    font-size: 18px;
    font-weight: bold;
  }

  .title-text{
    font-size: 18px;
    font-weight: bold;
  }

  .output-text{
    color: azure;
    font-size: 18px;
    margin: 0px 10px;
    font-weight: bold;
  }
</style>