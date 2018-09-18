<template>
  <!-- gk-check-box{*} -->
  <div class='box-content' @click="onClick">
    <div class="box-back">
      <div class='box-block' v-if="isChoosed"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        isChecked: false
      }
    },
    created () {
    },
    updated () {
    },
    computed: {
      isChoosed () {
        if (this.item.length === 1) {
          let item = this.item[0]
          let choosedItems = this.$store.state.Counter.choosedItems
          let isExist = false
          for (let index in choosedItems) {
            if (item._id === choosedItems[index]._id) {
              isExist = true
              break
            }
          }
          return isExist
        } else {
          return this.isChecked
        }
      }
    },
    methods: {
      onClick () {
        this.isChecked = !this.isChecked
        this.$store.commit('CLICK_LIST_ITEM', this.item)
      }
    }
  }
</script>
<style>

  * {
    padding: 0;
    margin: 0;
  }

  .box-content {
    height: 100%;
    width: 100%;
    border: medium solid rgb(71, 71, 71);
    padding: 4px;
  }

  .box-back {
    height: 100%;
    width: 100%;
  }

  .box-block {
    height: 100%;
    width: 100%;
    background: rgb(12, 153, 12);
  }
  
  
</style>