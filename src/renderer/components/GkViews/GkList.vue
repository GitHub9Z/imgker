<template>
  <!-- gk-list{*} -->
  <div>
    <gk-list-item :item="loadData" index='head' :items="datalist" :box="box"></gk-list-item>
    <gk-list-item :item="item" :order="loadData" :index="index" v-for="(item, index) in datalist" :key='item' :box="box"></gk-list-item>
  </div>
</template>

<script>
  import GkListItem from '@/components/GkViews/GkListItem'
  export default {
    props: ['datalist', 'box', 'order'],
    components: {
      GkListItem
    },
    data () {
      return {
      }
    },
    created () {
    },
    computed: {
      loadData () {
        if (this.datalist.length === 0 || this.datalist === null) {
          let item = {
            '无匹配数据': '无匹配数据'
          }
          return item
        } else {
          if (this.order === 'none') {
            return this.datalist[0]
          } else {
            return this.order
          }
        }
      }
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
  
</style>