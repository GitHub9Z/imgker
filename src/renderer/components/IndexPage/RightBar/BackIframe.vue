<template>
  <!-- index{right-bar{back-iframe{*}}} -->
  <div class='back-iframe-content'>
    <div class="bar-content">
      <div class="bar view-bar" @mouseenter="onMouseOver('view')" @mouseleave="onMouseOut('view')" @click="onBarClick('view')" :style="{background: isviewshow?'rgb(2, 109, 2)':viewColor}">可视化数据</div>
    </div>
    <div class="view-content" v-if="isviewshow">
      <gk-data-box class="data-box" :item="{'title':'浏览量','data':'27126'}"></gk-data-box>
      <gk-data-box class="data-box" :item="{'title':'访问量','data':'3213'}"></gk-data-box>
      <gk-data-box class="data-box" :item="{'title':'营业额','data':'34211'}"></gk-data-box>
      <gk-data-box class="data-box" :item="{'title':'成交量','data':'243'}"></gk-data-box>
    </div>
    <div class="bar-content">
      <div class="bar api-bar" @mouseenter="onMouseOver('api')" @mouseleave="onMouseOut('api')" @click="onBarClick('api')" :style="{background: isapishow?'rgb(2, 109, 2)':apiColor}">管理员接口</div>
    </div>
    <gk-list class="api-content" :datalist="apilist" v-if="isapishow" :box=false></gk-list>
    <div class="bar-content">
      <div class="bar data-base-bar" @mouseenter="onMouseOver('db')" @mouseleave="onMouseOut('db')" @click="onBarClick('db')" :style="{background: isdbshow?'rgb(2, 109, 2)':dbColor}">数据库管理</div>
    </div>
    <div class="db-content" :style="{display: isdbshow?'block':'none'}">
      <div class="db-console">
        <div class="icon-first">
          <img src='@/assets/icon/db_white_icon.png'>
        </div>
        <gk-drop-menu :menulist="menulist" @childOper="onChildOper"></gk-drop-menu>
        <div class="icon">
          <img src='@/assets/icon/search_white_icon.png'>
        </div>
        <gk-edit-text class="search-bar" @childOper="onChildOper"></gk-edit-text>
        <div class="icon"  @click="onFlashClick">
          <img src='@/assets/icon/flash_white_icon.png'>
        </div>
        <div class="icon" @click="onAddClick">
          <img src='@/assets/icon/add_white_icon.png'>
        </div>
        <div class="icon" @click="onDeleteClick">
          <img v-if="isChoosed" src='@/assets/icon/delete_down_icon.png'>
          <img v-if="!isChoosed" src='@/assets/icon/delete_up_icon.png'>
        </div>
        <div class="icon" @click="onEditClick">
          <img v-if="isChoosed" src='@/assets/icon/edit_down_icon.png'>
          <img v-if="!isChoosed" src='@/assets/icon/edit_up_icon.png'>
        </div>
        <div class="block"></div>
      </div>
      <gk-list class="data-base-content" :datalist="showdblist" :box=true></gk-list>
    </div>
    <gk-prompt :object="promptItem" @childOper="onChildOper" :style="{display: ispromptshow?'block':'none'}"></gk-prompt>
  </div>
</template>

<script>
  import GkList from '@/components/GkViews/GkList'
  import GkEditText from '@/components/GkViews/GkEditText'
  import GkDropMenu from '@/components/GkViews/GkDropMenu'
  import GkPrompt from '@/components/GkViews/GkPrompt'
  import GkDataBox from '@/components/GkViews/GkDataBox'
  export default {
    props: [],
    components: {
      GkList,
      GkDropMenu,
      GkEditText,
      GkPrompt,
      GkDataBox
    },
    data () {
      return {
        isviewshow: false,
        isdbshow: false,
        isapishow: false,
        ispromptshow: false,
        promptModel: '',
        promptItem: {},
        viewColor: '',
        apiColor: '',
        dbColor: '',
        apilist: [],
        dblist: [],
        showdblist: [],
        menulist: []
      }
    },
    created () {
      this.loadData()
    },
    computed: {
      isChoosed () {
        if (this.$store.state.Counter.choosedItems.length === 0 || this.$store.state.Counter.choosedItems === []) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      onChildOper (data) {
        switch (data.from) {
          case 'dropMenu':
            switch (data.oper) {
              case 'click':
                this.onMenuClick(data)
                break
            }
            break
          case 'editText':
            switch (data.oper) {
              case 'enter':
                this.onSearchEnter(data)
                break
            }
            break
          case 'prompt':
            switch (data.oper) {
              case 'cancel':
                this.ispromptshow = false
                break
              case 'submit':
                this.onPromptSubmit(data)
                break
            }
            break
        }
      },
      onMenuClick (data) {
        let thiz = this
        let index = data.index
        let temp = this.menulist[index]
        this.menulist[index] = this.menulist[0]
        this.menulist[0] = temp
        this.$axios.get('getDB', {
          params: data
        })
          .then(function (response) {
            thiz.$store.commit('CLEAR_LIST')
            let resdata = response.data
            thiz.dblist = resdata.data
            thiz.showdblist = JSON.parse(JSON.stringify(resdata.data))
          })
          .catch(function (error) {
            thiz.$smalltalk.alert('加载文件', '请检查网络连接')
              .then(() => {
                console.log(error)
              })
          })
      },
      onSearchEnter (data) {
        this.$store.commit('CLEAR_LIST')
        let filter = data.text
        if (filter === '' || filter === null) {
          this.showdblist = this.dblist
        } else {
          this.showdblist = []
          for (let index in this.dblist) {
            for (let value in this.dblist[index]) {
              if (((this.dblist[index])[value] + ' ').indexOf(filter) > -1) {
                this.showdblist.push(JSON.parse(JSON.stringify(this.dblist[index])))
                break
              }
            }
          }
        }
      },
      onFlashClick () {
        this.loadData()
      },
      onEditClick () {
        if (this.$store.state.Counter.choosedItems.length > 1) {
          let item = {}
          for (let key in this.dblist[0]) {
            item[key] = 'DEFAULT'
          }
          this.promptItem = item
          this.promptModel = 'multiEdit'
        } else if (this.$store.state.Counter.choosedItems.length === 1) {
          this.promptItem = JSON.parse(JSON.stringify(this.$store.state.Counter.choosedItems[0]))
          this.promptModel = 'edit'
        } else return
        this.ispromptshow = true
      },
      onAddClick () {
        this.ispromptshow = true
        let item = {}
        for (let key in this.dblist[0]) {
          item[key] = ''
        }
        this.promptItem = item
        this.promptModel = 'edit'
      },
      onDeleteClick () {
        let thiz = this
        if (thiz.$store.state.Counter.choosedItems.length < 1) return
        this.$axios.get('delete', {
          params: {
            'db': thiz.menulist[0],
            'items': JSON.stringify(thiz.$store.state.Counter.choosedItems)
          }
        })
          .then(function (response) {
            thiz.onFlashClick()
            let message = {
              'oper': 'loadData'
            }
            thiz.$emit('childOper', message)
            thiz.$smalltalk.alert('删除', '删除成功')
              .then(() => {
              })
          })
          .catch(function (error) {
            thiz.$smalltalk.alert('删除', error)
              .then(() => {
              })
          })
      },
      onBarClick (data) {
        switch (data) {
          case 'view':
            this.isviewshow = !this.isviewshow
            break
          case 'api':
            this.isapishow = !this.isapishow
            break
          case 'db':
            this.isdbshow = !this.isdbshow
            break
        }
      },
      onMouseOver (data) {
        switch (data) {
          case 'view':
            this.viewColor = 'rgb(82, 82, 82)'
            break
          case 'api':
            this.apiColor = 'rgb(82, 82, 82)'
            break
          case 'db':
            this.dbColor = 'rgb(82, 82, 82)'
            break
        }
      },
      onMouseOut (data) {
        switch (data) {
          case 'view':
            this.viewColor = 'rgb(71, 71, 71)'
            break
          case 'api':
            this.apiColor = 'rgb(71, 71, 71)'
            break
          case 'db':
            this.dbColor = 'rgb(71, 71, 71)'
            break
        }
      },
      loadData () {
        let thiz = this
        let data = ''
        this.$axios.get('getApiList', data)
          .then(function (response) {
            let resdata = response.data
            thiz.apilist = resdata.data
          })
          .catch(function (error) {
            thiz.$smalltalk.alert('加载文件', '请检查网络连接')
              .then(() => {
                console.log(error)
              })
          })
        this.$axios.get('getDBList', data)
          .then(function (response) {
            let resdata = response.data
            thiz.menulist = resdata.data
            let data = {
              'dataContent': thiz.menulist[0]
            }
            thiz.$axios.get('getDB', {
              params: data
            })
              .then(function (response) {
                let resdata = response.data
                thiz.dblist = resdata.data
                thiz.showdblist = JSON.parse(JSON.stringify(resdata.data))
              })
              .catch(function (error) {
                thiz.$smalltalk.alert('加载文件', '请检查网络连接')
                  .then(() => {
                    console.log(error)
                  })
              })
          })
          .catch(function (error) {
            thiz.$smalltalk.alert('加载文件', '请检查网络连接')
              .then(() => {
                console.log(error)
              })
          })
      },
      onPromptSubmit (data) {
        this.ispromptshow = false
        let thiz = this
        this.$axios.get('update', {
          params: {
            'db': thiz.menulist[0],
            'model': thiz.promptModel,
            'item': JSON.stringify(data.item),
            'items': JSON.stringify(thiz.$store.state.Counter.choosedItems)
          }
        })
          .then(function (response) {
            thiz.$store.commit('CLEAR_LIST')
            thiz.onFlashClick()
            let message = {
              'oper': 'loadData'
            }
            thiz.$emit('childOper', message)
            thiz.$smalltalk.alert('更新', '更新成功')
              .then(() => {
              })
          })
          .catch(function (error) {
            thiz.$smalltalk.alert('更新', error)
              .then(() => {
              })
          })
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }
  
  .bar {
    width: 100%;
    height: 40px;
    padding: 5px 15px;
    margin: 3px 0 3px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: azure;
    background: rgb(71, 71, 71);
  }

  .back-iframe-content {
    padding: 25px 10px 25px 25px;
  }
  
  .bar-content {
    width: 100%;
    height: 46px;
    display: flex;
    flex-direction: row;
  }

  .view-content {
    width: calc(100% + 8px);
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
  }

  .data-box {
    height: 200px;
    width: calc(25% - 6px);
    margin: 3px 8px 3px 0;
  }

  .db-content {
    width: 100%;
    margin: 3px 0 3px 0;
  }

  .api-content {
    width: 100%;
    margin: 0 0 3px 0;
  }

  .db-console {
    width: 100%;
    height: 40px;
    z-index:100;
    position:relative;
    display: flex;
    flex-direction: row;
  }

  .search-bar {
    height: 40px;
    width: 200px;
    background: rgb(71, 71, 71);
  }

  .block {
    height: 40px;
    width: 100%;
    margin: 0 0 0 3px;
    background: rgb(71, 71, 71);
  }

  .icon-first {
    width: 45px;
    height: 40px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(62, 62, 62);
  }

  .icon {
    width: 45px;
    height: 40px;
    padding: 8px;
    margin: 0 0 0 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(62, 62, 62);
  }

  img {
    width: 24px;
    height: 24px;
  }
</style>