<template>
  <!-- index{right-bar{back-iframe{*}}} -->
  <div class='back-iframe-content'>
    <div class="bar-content">
      <div class="bar view-bar" @mouseenter="onMouseOver('view')" @mouseleave="onMouseOut('view')" @click="onBarClick('view')" :style="{background: isviewshow?'rgb(2, 109, 2)':viewColor}">可视化数据</div>
    </div>
    <div class="view-content" v-if="isviewshow">
      <gk-image-box class="data-box" :item="{'adURL':'https://xaoji.com/upload/image/ad1.png?date=' + JSON.stringify(new Date()),'adName':'ad1'}"></gk-image-box>
      <gk-image-box class="data-box" :item="{'adURL':'https://xaoji.com/upload/image/ad2.png?date=' + JSON.stringify(new Date()),'adName':'ad2'}"></gk-image-box>
      <gk-image-box class="data-box" :item="{'adURL':'https://xaoji.com/upload/image/ad3.png?date=' + JSON.stringify(new Date()),'adName':'ad3'}"></gk-image-box>
      <gk-image-box class="data-box" :item="{'adURL':'https://xaoji.com/upload/image/ew1.png?date=' + JSON.stringify(new Date()),'adName':'ew1'}"></gk-image-box>
      <gk-image-box class="data-box" :item="{'adURL':'https://xaoji.com/upload/image/ew2.png?date=' + JSON.stringify(new Date()),'adName':'ew2'}"></gk-image-box>
    </div>
    <div class="bar-content">
      <div class="bar api-bar" @mouseenter="onMouseOver('api')" @mouseleave="onMouseOut('api')" @click="onBarClick('api')" :style="{background: isapishow?'rgb(2, 109, 2)':apiColor}">管理员接口</div>
    </div>
    <gk-list class="api-content" :datalist="apilist" v-if="isapishow" :box=false order="none"></gk-list>
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
        <div class="arrow-content">
          <img class="arrow" :src="backArrowUrl" @click="onBackClick">
          <img class="arrow" :src="frontArrowUrl" @click="onFrontClick">
        </div>
      </div>
      <gk-list class="data-base-content" :datalist="showdblist" :box=true :order="menuitems[menulist[0]]"></gk-list>
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
  import GkImageBox from '@/components/GkViews/GkImageBox'
  export default {
    props: ['url'],
    components: {
      GkList,
      GkDropMenu,
      GkEditText,
      GkPrompt,
      GkDataBox,
      GkImageBox
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
        menulist: [],
        menuitems: {},
        page: 1
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
      },
      backArrowUrl () {
        if (this.page === 1) return require('@/assets/icon/arrow_back_false_icon.png')
        else return require('@/assets/icon/arrow_back_true_icon.png')
      },
      frontArrowUrl () {
        if (this.page >= (this.dblist.length / 40)) return require('@/assets/icon/arrow_front_false_icon.png')
        else return require('@/assets/icon/arrow_front_true_icon.png')
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
        this.$store.commit('SET_IS_LOADING', true)
        let thiz = this
        let index = data.index
        let temp = this.menulist[index]
        this.menulist[index] = this.menulist[0]
        this.menulist[0] = temp
        this.page = 1
        this.$log({
          title: 'getDB',
          output: 'GET: ' + this.url + '/api/getDB'
        })
        this.$axios.get(this.url + '/api/getDB', {
          params: data
        })
          .then(function (response) {
            thiz.$store.commit('CLEAR_LIST')
            let resdata = response.data
            thiz.dblist = resdata.data
            thiz.showdblist = JSON.parse(JSON.stringify(resdata.data)).slice((thiz.page - 1) * 40, thiz.page * 40)
            thiz.$log({
              title: 'getDB',
              output: 'RESPONSE: ' + JSON.stringify(response, Object.keys(response), 1000)
            })
            thiz.$store.commit('SET_IS_LOADING', false)
          })
          .catch(function (error) {
            thiz.$store.commit('CLEAR_LIST')
            thiz.dblist = []
            thiz.showdblist = []
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
          this.showdblist = this.dblist.slice((this.page - 1) * 40, this.page * 40)
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
          for (let key in this.menuitems[this.menulist[0]]) {
            item[key] = 'DEFAULT'
          }
          this.promptItem = item
          this.promptModel = 'multiEdit'
        } else if (this.$store.state.Counter.choosedItems.length === 1) {
          let item = this.$store.state.Counter.choosedItems[0]
          let temp = JSON.parse(JSON.stringify(this.menuitems[this.menulist[0]]))
          for (let key in temp) {
            if (item.hasOwnProperty(key)) {
              temp[key] = item[key]
            }
          }
          this.$log({
            title: 'prompt',
            output: 'MODEL: ' + JSON.stringify(temp, Object.keys(temp), 1000)
          })
          this.promptItem = temp
          this.promptModel = 'edit'
        } else return
        this.ispromptshow = true
      },
      onAddClick () {
        this.ispromptshow = true
        /* {unite-order{deprecated v0->v1.0.0}
        let item = {}
        for (let key in this.dblist[0]) {
          item[key] = ''
        }
        */
        this.promptItem = this.menuitems[this.menulist[0]]
        this.promptModel = 'edit'
      },
      onDeleteClick () {
        let thiz = this
        if (thiz.$store.state.Counter.choosedItems.length < 1) return
        thiz.$log({
          title: 'delete',
          output: 'GET: ' + thiz.url + '/api/delete'
        })
        this.$axios.get(this.url + '/api/delete', {
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
            thiz.$log({
              title: 'delete',
              output: 'RESPONSE: ' + JSON.stringify(response, Object.keys(response), 1000)
            })
            thiz.$emit('childOper', message)
            thiz.$toast(' S U C C E S S')
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
      onBackClick () {
        if (this.page > 1) {
          this.page--
          this.showdblist = JSON.parse(JSON.stringify(this.dblist)).slice((this.page - 1) * 40, this.page * 40)
        }
      },
      onFrontClick () {
        if (this.page < (this.dblist.length / 40)) {
          this.page++
          this.showdblist = JSON.parse(JSON.stringify(this.dblist)).slice((this.page - 1) * 40, this.page * 40)
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
        this.$store.commit('SET_IS_LOADING', true)
        let thiz = this
        thiz.$store.commit('CLEAR_LIST')
        let data = ''
        this.$axios.get(this.url + '/api/getApiList', data)
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
        this.$axios.get(this.url + '/api/getDBList', data)
          .then(function (response) {
            let resdata = response.data
            if (thiz.menulist.length !== resdata.data.list.length) thiz.menulist = resdata.data.list
            thiz.menuitems = resdata.data.items
            let data = {
              'dataContent': thiz.menulist[0]
            }
            thiz.$axios.get(thiz.url + '/api/getDB', {
              params: data
            })
              .then(function (response) {
                let resdata = response.data
                thiz.dblist = resdata.data
                thiz.showdblist = JSON.parse(JSON.stringify(resdata.data)).slice((thiz.page - 1) * 40, thiz.page * 40)
                thiz.$store.commit('SET_IS_LOADING', false)
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
        thiz.$log({
          title: 'update',
          output: 'DATA: ' + JSON.stringify(data.item, Object.keys(data.item), 1000)
        })
        this.$axios.get(this.url + '/api/update', {
          params: {
            'db': thiz.menulist[0],
            'model': thiz.promptModel,
            'item': JSON.stringify(data.item),
            'items': JSON.stringify(thiz.$store.state.Counter.choosedItems)
          }
        })
          .then(function (response) {
            thiz.$log({
              title: 'update',
              output: 'RESPONSE: ' + JSON.stringify(response, Object.keys(response), 1000)
            })
            thiz.onFlashClick()
            let message = {
              'oper': 'loadData'
            }
            thiz.$emit('childOper', message)
            thiz.$toast(' S U C C E S S')
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
    width: calc(100% - 600px);
    margin: 0 0 0 3px;
    background: rgb(71, 71, 71);
  }

  .arrow-content {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgb(71, 71, 71);
  }

  .arrow {
    height: 25px;
    width: 25px;
    margin: 0 10px;
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