<template>
  <!-- gk-toast{*} -->
  <div class="toast-logo-area" :style="{opacity: alpha, right: right + 'px'}" @mouseover="active" @mouseout="normal">
    <img class="logo-img" src='@/assets/icon/success_white_icon.png' :style="{transform: 'rotate(' + rotateNum + 'deg)'}">{{text}}
  </div>
</template>

<script>
  export default {
    components: {
    },
    /* data () {
      return {
        rotateNum: 0,
        text: '   L O A D I N G . . .',
        alpha: 1,
        right: -250,
        status: 'normal'
      }
    }, */
    created () {
      this.rotate()
    },
    computed: {
    },
    methods: {
      active () {
        if (this.status === 'died') return
        this.alpha = 1
        this.status = 'active'
      },
      normal () {
        if (this.status === 'died') return
        this.status = 'normal'
      },
      rotate () {
        let rightid
        let alphaid
        rightid = setInterval(() => { if (this.right < 10) this.right += 2 }, 2)
        alphaid = setTimeout(() => {
          setInterval(() => {
            if (this.alpha < 0.1) {
              this.status = 'died'
              window.clearInterval(rightid)
              window.clearInterval(alphaid)
            }
            if (this.alpha > 0 && this.status === 'normal') this.alpha -= 0.1
          }, 100)
        }, 3500)
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

  .toast-logo-area {
    display: flex;
    height: 70px;
    width: 250px;
    position: absolute; right: 10px; bottom: 35px; z-index: 321;
    margin: auto;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);  
    background: rgb(28, 135, 241);
    overflow: hidden;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    color: rgb(194, 194, 194);
    flex-direction: row;
    align-items: center;
  }

</style>