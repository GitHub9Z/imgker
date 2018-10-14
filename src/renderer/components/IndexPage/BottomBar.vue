<template>
  <!-- index{bottom-bar{*}} -->
  <div class='bottom-bar-content'> 
    <div class='bottom-bar-lib' @click="handlerClick('lib')" @mouseenter="onMouseOver('libColor')" @mouseleave="onMouseOut('libColor')" :style="{background: libColor}">
      <img class='bottom-icon' src='@/assets/icon/gker_white_icon.png' v-if="lib !== ''">
      {{lib}}
    </div>
    <div class='bottom-bar-user' @click="handlerClick('user')" @mouseenter="onMouseOver('userColor')" @mouseleave="onMouseOut('userColor')" :style="{background: userColor}">
      {{user}}
    </div>
    <gk-search @childOper="onChildOper" :style="{display: isSearchshow?'block':'none'}" :object="searchList"></gk-search>
  </div>
</template>
<script>
  import GkSearch from '@/components/GkViews/GkSearch'
  export default {
    components: {
      GkSearch
    },
    data () {
      return {
        libColor: 'rgb(28, 135, 241)',
        userColor: 'rgb(28, 135, 241)',
        isSearchshow: false,
        showFrom: ''
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
      searchList () {
        let arr = [
          {
            'title': 'GKER',
            'text': ' BUILD NEW LIBRARY',
            'remark': ''
          }
        ]
        switch (this.showFrom) {
          case 'lib':
            for (let index in this.$store.state.Counter.userInfo.lib) {
              let temp = {
                'title': 'library',
                'text': this.$store.state.Counter.userInfo.lib[index].name,
                'remark': 'ownership of ' + this.$store.state.Counter.userInfo.lib[index].owner_id,
                'id': this.$store.state.Counter.userInfo.lib[index].id
              }
              console.log(this.$store.state.Counter.userInfo.lib[index].name)
              arr.push(temp)
            }
            break
          case 'user':
            arr = [
              {
                'title': 'Persinal file',
                'text': '个人档案',
                'remark': 'ALT + P'
              },
              {
                'title': 'Switch Account',
                'text': '切换账户',
                'remark': 'ALT + S'
              }
            ]
            break
        }
        return arr
      },
      user () {
        if (!this.$store.state.Counter.userInfo.name) return ''
        else return this.$store.state.Counter.userInfo.name
      },
      lib () {
        if (!this.$store.state.Counter.userInfo.lib) return ''
        else return this.$store.state.Counter.userInfo.lib[0].name
      }
    },
    methods: {
      onChildOper (data) {
        switch (data.from) {
          case 'search':
            switch (data.oper) {
              case 'cancel':
                this.isSearchshow = false
                break
              case 'click':
                switch (this.showFrom) {
                  case 'lib':
                    this.isSearchshow = false
                    let thiz = this
                    if (data.item.text === ' BUILD NEW LIBRARY') {
                      this.$smalltalk.prompt('新建资源库', '请输入库名称', '新建资源库')
                        .then(function (name) {
                          if (name !== null && name !== '') {
                            let item = {
                              'name': name,
                              'owner_id': thiz.$store.state.Counter.userInfo.id
                            }
                            thiz.$axios.get('update', {
                              params: {
                                'db': 'GkerLib',
                                'model': 'edit',
                                'item': JSON.stringify(item),
                                'items': JSON.stringify(item)
                              }
                            })
                              .then(function (response) {
                                thiz.$log({
                                  title: 'update',
                                  output: 'RESPONSE: ' + JSON.stringify(response, Object.keys(response), 1000)
                                })
                                thiz.$store.commit('FLASH_USER', thiz)
                                thiz.$toast(' S U C C E S S')
                              })
                              .catch(function (error) {
                                thiz.$smalltalk.alert('更新', error)
                                  .then(() => {
                                  })
                              })
                          }
                        }, function () {
                          console.log('close')
                        })
                    } else {
                      this.$store.commit('CHANGE_LIB', data.item)
                      let message = {
                        'from': 'bottom',
                        'oper': 'loadData'
                      }
                      this.$emit('childOper', message)
                    }
                    break
                  case 'user':
                    this.isSearchshow = false
                    let msg = {
                      'from': 'bottom',
                      'oper': 'exit'
                    }
                    this.$emit('childOper', msg)
                    break
                }
                break
            }
            break
        }
      },
      handlerClick (msg) {
        switch (msg) {
          case 'lib':
            this.showFrom = 'lib'
            this.isSearchshow = true
            break
          case 'user':
            this.showFrom = 'user'
            this.isSearchshow = true
            break
        }
      },
      onMouseOver (item) {
        eval('this.' + item + " = 'rgb(105, 180, 255)'")
      },
      onMouseOut (item) {
        eval('this.' + item + " = 'rgb(28, 135, 241)'")
      }
    }
  }
</script>
<style>
  .bottom-bar-content {
    width: 100%;
    height: 25px;
    background: rgb(28, 135, 241);
  }

  .bottom-icon {
    height: 20px;
    width: 20px;
    margin: 0 3px 0 0;
  }

  .bottom-bar-lib {
    height: 25px;
    padding: 0 18px 0 15px;
    line-height: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: azure;
    font-size: 14px;
    float: left;
  }

  .bottom-bar-user {
    height: 25px;
    padding: 0 15px;
    line-height: 25px;
    color: azure;
    font-size: 14px;
    float: right;
  }
</style>