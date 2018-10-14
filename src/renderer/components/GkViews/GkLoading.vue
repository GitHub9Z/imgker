<template>
  <!-- gk-loading{*} -->
  <div class="loading-content">
    <div class="loading-logo-area">
      <img class="logo-img" src='@/assets/icon/gker_logo.png' :style="{transform: 'rotate(' + rotateNum + 'deg)'}">{{text}}
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        rotateNum: 0,
        text: '   L O A D I N G . . .'
      }
    },
    created () {
      this.rotate()
    },
    computed: {
    },
    methods: {
      rotate () {
        setInterval(() => { this.rotateNum++ }, 40)
        setInterval(() => {
          if (this.text === '   L O A D I N G . . .') this.text = '   L O A D I N G .'
          else this.text += ' .'
        }, 800)
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .logo-img {
    width: 38px;
    height: 38px;
    margin: 0 20px 0 25px
  }

  .loading-logo-area {
    display: flex;
    height: 70px;
    width: 250px;
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 121;
    margin: auto;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);  
    background: rgb(53, 53, 53);
    overflow: hidden;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    color: rgb(194, 194, 194);
    flex-direction: row;
    align-items: center;
  }

  .loading-content {
    width: 100%;
    height: 100%;
    background: rgba(53, 53, 53, 0.6);
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 120;
  }
</style>