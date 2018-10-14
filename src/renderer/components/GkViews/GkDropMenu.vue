<template>
  <!-- gk-drop-menu{*} -->
  <div class='menu-content'>
    <div class='menu-list'  @mouseleave="onMouseOut('list')">
      <div class='item current-item' @mouseenter="onMouseOver(0)" @mouseleave="onMouseOut(0)" @click="onActiveClick()" :style="{background: activeItem===0?activeColor:normalColor}">{{menulist[0]}}</div>
      <div class="hidden-items" :style="{display: isOpen?'block':'none'}">
        <div class='item another-item' v-if="index !== 0" v-for="(item, index) in menulist" :key="item" @mouseenter="onMouseOver(index)" @mouseleave="onMouseOut(index)" @click="onNormalClick(item,index)" :style="{background: activeItem===index?activeColor:normalColor}">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['menulist'],
    components: {
    },
    data () {
      return {
        activeItem: 10000,
        activeColor: 'rgb(82, 82, 82)',
        normalColor: 'rgb(71, 71, 71)',
        isOpen: false
      }
    },
    created () {
      this.loadData()
    },
    computed: {
    },
    methods: {
      onMouseOver (data) {
        this.activeItem = data
      },
      onMouseOut (data) {
        if (data === 'list') {
          this.isOpen = false
          this.activeItem = 10000
        }
      },
      onActiveClick () {
        this.isOpen = !this.isOpen
      },
      onNormalClick (item, index) {
        let message = {
          'from': 'dropMenu',
          'oper': 'click',
          'dataContent': item,
          'index': index
        }
        this.onMouseOut('list')
        this.$emit('childOper', message)
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .menu-list {
    background: rgb(71, 71, 71);
    text-align: center;
    width: 150px;
  }

  .item {
    padding: 12px 15px;
    height: 40px;
    width: 150px;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: azure;
    background: rgb(71, 71, 71);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu-content li {
    float: left;
  }

  .hidden-items {
    clear: both;
  }

  .hidden-items a {
    color: #fff;
  }

</style>