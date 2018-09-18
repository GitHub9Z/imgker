<template>
  <!-- gk-list-item{*} -->
  <div class="item-content">
    <div class='item' @mouseenter="onMouseOver()" @mouseleave="onMouseOut()" :style="{background: currColor,width: box?'calc(100% - 29px)':'100%'}" v-if="index==='head'">
      <div class="mask">
        <div class="item-rank" v-for="(value, key, index) in item" :key='index' :style="{'font-weight': 'bold'}">{{key}}</div>
      </div>
      {{load}}
    </div>
    <div class='item' @mouseenter="onMouseOver()" @mouseleave="onMouseOut()" :style="{background: currColor,width: box?'calc(100% - 29px)':'100%'}"  v-if="index!=='head'" @click="onClick">
      <div class="mask">
        <div class="item-rank" v-for="(value, key) in order" :key='value'>{{item[key]}}</div>
      </div>
      {{load}}
    </div>
    <gk-check-box class="item-box" v-if="index !== 'head'&&box" :item="[item]"></gk-check-box>
    <gk-check-box class="item-box" v-if="index === 'head'&&box" :item="items"></gk-check-box>
  </div>
</template>

<script>
  import GkCheckBox from '@/components/GkViews/GkCheckBox'
  export default {
    props: ['item', 'index', 'items', 'box', 'order'],
    components: {
      GkCheckBox
    },
    data () {
      return {
        defaltColor: '',
        activeColor: 'rgb(82, 82, 82)',
        currColor: ''
      }
    },
    created () {
      this.load()
    },
    computed: {
      load () {
        if (this.index === 'head') {
          this.defaltColor = 'rgb(82, 82, 82)'
          alert(JSON.stringify(this.item))
        } else {
          this.defaltColor = this.index % 2 === 0 ? 'rgb(53, 53, 53)' : 'rgb(61, 61, 61)'
        }
        this.currColor = this.defaltColor
      }
    },
    methods: {
      onMouseOver () {
        this.currColor = this.activeColor
      },
      onMouseOut () {
        this.currColor = this.defaltColor
      },
      onClick () {
        if (this.box) this.$store.commit('CLICK_LIST_ITEM', [this.item])
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .item-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .item {
    height: 100%;
    width: calc(100% - 29px);
    padding: 5px 20px;
    margin: 3px 0 0 0;
  }

  .mask {
    height: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    left:0px;
    top:0px;
  }

  .item-rank {
    margin: 0 20px;
    width: 100px;
    overflow-x: auto;
    line-height:16px;
    font-size: 16px;
    color: rgb(200, 200, 200);
  }

  .item-box {
    height: 26px;
    width: 26px;
    margin: 3px 0 0 3px;
  }
  
</style>