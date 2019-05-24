<template>
  <!-- index{right-bar{*}} -->
  <div class='right-bar-content'>
    <div class='right-tab-bar-content'>
      <div class="arrow-content">
        <img class="arrow" src="@/assets/icon/arrow_back_true_icon.png" @click="onBackClick">
        <img class="arrow" src="@/assets/icon/arrow_front_true_icon.png" @click="onFrontClick">
      </div>
      <div class="mask">
        <tab :item="item" :chooseId="chooseId" v-on:childOper="onChildOper" v-for="item in fileslist" :key='item'></tab>
      </div>
    </div>
    <div class="iframe-content">
      <back-iframe class='back-ifame right-page-content' :url="item.url" @childOper="onChildOper" v-if="item.kind==='back'" v-for="item in fileslist" :key='item.id' :style="{display: item.id === chooseId?'block':'none'}"></back-iframe>
      <command-iframe class='commnand-ifame right-page-content' :file="item" @childOper="onChildOper" v-if="item.kind==='command'" v-for="item in fileslist" :key='item.id' v-show="item.id === chooseId"></command-iframe>
      <home-iframe class='home-ifame right-page-content' v-show="!chooseId"></home-iframe>
      <iframe class='right-page-content' :ref="item.id === chooseId?'active':item.id" v-if="item.kind==='file'" :src="item.url" v-for="item in fileslist" :key='item.id' :style="{display: item.id === chooseId?'block':'none'}" frameborder="no" border="0" marginwidth="0"
        marginheight="0" allowtransparency="yes"></iframe>
    </div>
    <console class="right-bar-console" @childOper="onChildOper"></console>
  </div>
</template>

<script>
  import Tab from '@/components/IndexPage/RightBar/Tab'
  import Console from '@/components/IndexPage/RightBar/Console'
  import BackIframe from '@/components/IndexPage/RightBar/BackIframe'
  import CommandIframe from '@/components/IndexPage/RightBar/CommandIframe'
  import HomeIframe from '@/components/IndexPage/RightBar/HomeIframe'
  export default {
    props: ['fileslist', 'chooseId'],
    components: {
      Tab,
      Console,
      BackIframe,
      CommandIframe,
      HomeIframe
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {
      onChildOper(data) {
        switch (data.oper) {
          case 'click':
            this.onChildClick(data)
            break
          case 'close':
            this.onChildClose(data)
            break
          case 'saveTree':
            this.rebuildHistoryTree(data)
            break
          case 'loadData':
            this.$emit('childOper', data)
            break
        }
      },
      onChildClick(data) {
        this.$emit('childOper', data)
      },
      onChildClose(data) {
        data.lastChoose = this.chooseId
        this.$emit('childOper', data)
        /* {disconnect-to-fath{deprecated v0->v1.0.0}
        let index
        for (index in this.fileslist) {
          if (this.fileslist[index].id === data.id) {
            this.fileslist.splice(index, 1)
            return
          }
        } */
      },
      onBackClick() {
        if (this.$refs.active) {
          alert(JSON.stringify(this.$refs))
        }
        if (this.$refs.active.contentWindow) {
          alert('存在页面window')
        }
        if (this.$refs.active.history) {
          alert('存在history')
        }
        this.$refs.active.contentWindow.history.go(-1)
      },
      onFrontClick() {
        this.$refs.active.contentWindow.history.go(1)
      },
      rebuildHistoryTree(data) {
        this.$emit('childOper', data)
      }
    }
  }
</script>

<style scoped>
  img {
    height: 25px;
    width: 25px;
    margin: 0 10px;
  }
  
  .right-bar-content {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  .right-tab-bar-content {
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #333333;
    overflow: hidden
  }
  
  .iframe-content {
    height: calc(100% - 395px);
    width: calc(100% - 1px);
    overflow: hidden;
  }
  
  .right-page-content {
    height: 100%;
    width: 100%;
  }
  
  .right-bar-console {
    height: 355px;
    width: 100%;
    background: #222222;
    overflow: hidden;
    padding: 0;
  }
  
  .back-ifame {
    width: 100%;
    overflow-y: scroll
  }
  
  .back-ifame::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 15px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  
  .back-ifame::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: #535353;
  }
  
  .back-ifame::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }
  
  .back-ifame::-webkit-scrollbar-thumb:window-inactive {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: transparent;
  }
  
  .back-ifame::-webkit-scrollbar-thumb:hover {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: #666666;
  }
  
  .arrow-content {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .mask {
    height: 60px;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
  }
</style>