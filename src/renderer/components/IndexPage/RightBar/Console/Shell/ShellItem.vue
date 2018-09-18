<template>
  <!-- index{right-bar{shell{shell-item{*}}}} -->
  <div class='shell-item-content'> 
    <div class="command-line">
        <div class="user-text">{{item.user}}</div><div class="url-text">:{{item.url}} $</div><div class="command-text">{{item.command}}</div>
    </div>
    <div class="result-line">
        {{item.result}}
    </div>
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
    color: rgb(81, 81, 255);
    font-size: 18px;
    font-weight: bold;
  }

  .command-text{
    color: azure;
    font-size: 18px;
    margin: 0px 10px;
    font-weight: bold;
  }

  .result-line{
    color: azure;
    font-size: 18px;
    margin: 0px 2px;
    font-weight: bold;
  }
</style>