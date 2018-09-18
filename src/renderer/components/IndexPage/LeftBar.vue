<template>
  <!-- index{left-bar{*}} -->
  <div class='left-bar-content'> 
    <div class='left-bar-main'> 
      <div v-for="item in itemList" :key="item">
        <img class='left-bar-item' :src="item.url" @mouseenter="onMouseOver(item)" @mouseleave="onMouseOut(item)">
      </div>
    </div>
    <div class='left-bar-bottom'>
      <img class='left-bar-bottom-item' :src="bottomItem.url" @click="handlerClick" @contextmenu.stop="handlerClick" @mouseenter="onMouseOver(bottomItem)" @mouseleave="onMouseOut(bottomItem)">
    </div>
  </div>
</template>
<script>
  export default {
    props: ['chooseId'],
    components: {
    },
    data () {
      return {
        itemList: [
          {
            'id': '1',
            'name': 'home',
            'url': require('@/assets/icon/tool_up_icon.png'),
            'imgUrl': require('@/assets/icon/tool_up_icon.png'),
            'activeImgUrl': require('@/assets/icon/tool_down_icon.png')
          },
          {
            'id': '2',
            'name': 'git',
            'url': require('@/assets/icon/git_up_icon.png'),
            'imgUrl': require('@/assets/icon/git_up_icon.png'),
            'activeImgUrl': require('@/assets/icon/git_down_icon.png')
          },
          {
            'id': '3',
            'name': 'config',
            'url': require('@/assets/icon/config_up_icon.png'),
            'imgUrl': require('@/assets/icon/config_up_icon.png'),
            'activeImgUrl': require('@/assets/icon/config_down_icon.png')
          }
        ],
        bottomItem: {
          'id': '4',
          'name': 'set',
          'url': require('@/assets/icon/set_up_icon.png'),
          'imgUrl': require('@/assets/icon/set_up_icon.png'),
          'activeImgUrl': require('@/assets/icon/set_down_icon.png')
        }
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      handlerClick () {
        let thiz = this
        const MenuItem = this.$electron.remote.MenuItem
        const Menu = this.$electron.remote.Menu
        /* {Dialog&Smalltalk{advocated in electron}} */
        const menu1 = new Menu()
        let searchMenu = new MenuItem({
          label: '搜索',
          accelerator: 'CmdOrCtrl+S',
          click () {
          }
        })

        let setMenu = new MenuItem({
          label: '设置',
          accelerator: 'CmdOrCtrl+C',
          click () {
          }
        })

        let devMenu = new MenuItem({
          label: '开发者模式',
          accelerator: 'CmdOrCtrl+D',
          click () {
            let window = thiz.$electron.remote.getCurrentWindow()
            window.webContents.openDevTools()
          }
        })
        menu1.append(searchMenu)
        menu1.append(setMenu)
        menu1.append(devMenu)
        menu1.popup(this.$electron.remote.getCurrentWindow())
      },
      onMouseOver (item) {
        item.url = item.activeImgUrl
      },
      onMouseOut (item) {
        item.url = item.imgUrl
      }
    }
  }
</script>
<style>
  .left-bar-content{
    height: 100%;
    width: 100%;
  }

  .left-bar-main{
    height: calc(100% - 55px);
    width: 100%;
    text-align: center;
  }

  .left-bar-bottom{
    height: 55px;
    width: 100%;
    text-align: center;
  }

  .left-bar-bottom-item{
      height: 25px;
      width: 25px;
      margin: 12px 0;
  }

  .left-bar-item{
      height: 30px;
      width: 30px;
      margin: 12px 0;
  }

</style>