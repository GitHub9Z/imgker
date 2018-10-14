<template>
  <!-- gk-search{*} -->
  <div class="search-back" @click="cancel">
  <div class="search-content">
    <div class="search-bar" @click.stop="onSearchClick">
      <input class="search-input" v-model="searchStr" type="text" placeholder="请输入搜索内容">
    </div>
    <div class="search-content-area">
      <div class='search-item' v-for="(value, key) in showList" :key='key' @click.stop="onClick(value)" :style="{background: value.title === 'GKER'?'rgb(38, 38, 88)':''}">
        <div class="item-title">[{{value.title}}]</div>
        <div class="item-text">{{value.text}}</div>
        <div class="item-remark">{{value.remark}}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['object'],
    data () {
      return {
        searchStr: ''
      }
    },
    created () {
    },
    computed: {
      showList () {
        // :style="{color: value.title === 'GKER'?'rgb(52, 219, 66)':'rgb(224, 224, 224)'}"
        let showList = []
        let filter = this.searchStr
        if (filter === '' || filter === null) {
          showList = this.object
        } else {
          for (let index in this.object) {
            for (let value in this.object[index]) {
              if (((this.object[index])[value] + ' ').indexOf(filter) > -1) {
                showList.push(JSON.parse(JSON.stringify(this.object[index])))
                break
              }
            }
          }
        }
        return showList
      }
    },
    methods: {
      cancel () {
        let message = {
          'from': 'search',
          'oper': 'cancel'
        }
        this.$emit('childOper', message)
      },
      onClick (item) {
        let message = {
          'from': 'search',
          'oper': 'click',
          'item': item
        }
        this.$emit('childOper', message)
      },
      onSearchClick () {
        // 点击搜索栏
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .icon {
    width: 30px;
    height: 30px;
    padding: 8px;
    margin: 0 0 0 268px;
  }

  img {
    width: 14px;
    height: 14px;
  }

  .search-back {
    width: 100%;
    height: 100%;
    position: absolute; left: 0; top: 0px; right: 0; z-index: 110;
    background: transparent;
  }

  .search-content {
    width: 700px;
    max-height: 400px;
    position: absolute; left: 0; top: 0px; right: 0; z-index: 111;
    margin: auto;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);  
    background: rgb(48, 47, 47);
  }

  .search-content-area::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 3px;
  }

  .search-content-area::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: #535353;
  }

  .search-content-area::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .search-content-area::-webkit-scrollbar-thumb:window-inactive {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }

  .search-content-area {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
  }

  .search-item {
    padding: 0 12px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: transparent;
    color: rgb(199, 199, 199);
  }

  .search-item:hover {
    padding: 0 12px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: rgb(65, 65, 65);
    color: rgb(199, 199, 199);
  }

  .item-title {
    line-height: 32px;
    font-size: 17px;
    font-weight: bold;
    color: rgb(170, 170, 170);
  }

  .item-text {
    line-height: 32px;
    font-size: 17px;
    margin: 0 5px;
    color: rgb(224, 224, 224);
  }

  .item-remark {
    line-height: 32px;
    font-size: 17px;
    color: rgb(149, 149, 149);
  }

  .search-bar {
    padding: 6px;
  }

  .search-input {
    background: rgb(77, 77, 77);
    border: 1px solid rgb(137, 78, 247);
    width: 100%;
    height: 30px;
    border: 0;
    padding: 5px 4px;
    font-size: 15px;
    color: rgb(199, 199, 199);
    outline-color: rgb(118, 118, 255);
  }
  
</style>