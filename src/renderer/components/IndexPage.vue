<template>
  <div class="container">
    <div class="main-container">
        <div class="left-bar">
          <left-bar></left-bar>
        </div>

        <div class="middle-bar">
            <middle-bar-top></middle-bar-top>
            <middle-bar-list @childOper="onChildOper" :fileslist="fileslist" :chooseId="chooseId"></middle-bar-list>
        </div>

        <right-bar class="right-content" @childOper="onChildOper" :fileslist="choosedfileslist" :chooseId="chooseId"></right-bar>
    </div>
    <div class="bottom-container">
    </div>
  </div>
</template>

<script>
  import MiddleBarList from '@/components/IndexPage/MiddleBarList'
  import MiddleBarTop from '@/components/IndexPage/MiddleBarTop'
  import RightBar from '@/components/IndexPage/RightBar'
  import LeftBar from '@/components/IndexPage/LeftBar'
  export default {
    components: {
      MiddleBarList,
      RightBar,
      LeftBar,
      MiddleBarTop
    },
    data () {
      return {
        chooseId: '4',
        choosedfileslist: [
        ],
        fileslist: [
        ]
      }
    },
    created () {
      this.getFilesList()
    },
    methods: {
      getFilesList () {
        let message = {
          'oper': 'loadData'
        }
        this.onChildUpdate(message)
        /* const spawn = require('child_process').spawn
        alert('spawn：' + JSON.stringify(spawn))
        const ls = spawn('ls', ['-lh', '/usr'])

        ls.stdout.on('data', (data) => {
          alert('输出：' + data)
        })

        ls.stderr.on('data', (data) => {
          alert('错误：' + data)
        })

        ls.on('close', (code) => {
          alert('子进程退出码：' + code)
        }) */
      },
      onChildOper (data) {
        switch (data.oper) {
          case 'click':
            this.onChildClick(data)
            break
          case 'loadData':
            this.onChildUpdate(data)
            break
          case 'close':
            this.onChildClose(data)
            break
        }
      },
      onChildUpdate (data) {
        let thiz = this
        this.$axios.get('getFilesList', data)
          .then(function (response) {
            let resdata = response.data
            thiz.fileslist = resdata.data
            if (Object.getOwnPropertyNames(data).length > 1) {
              thiz.chooseId = data.id
              for (let index in thiz.fileslist) {
                if (thiz.fileslist[index].id === data.id && thiz.fileslist[index].kind !== 'folder') {
                  thiz.choosedfileslist.push(thiz.fileslist[index])
                }
              }
            }
          })
          .catch(function (error) {
            let smalltalk = require('smalltalk/legacy')
            smalltalk.alert('加载文件', '请检查网络连接')
              .then(() => {
                console.log(error)
              })
          })
      },
      onChildClick (data) {
        let index
        for (index in this.choosedfileslist) {
          if (this.choosedfileslist[index].id === data.id) {
            this.chooseId = data.id
            return
          }
        }
        if (data.from !== 'tab') {
          this.choosedfileslist.push(data)
          this.chooseId = data.id
        }
      },
      onChildClose (data) {
        let index
        let i = 0
        for (index in this.choosedfileslist) {
          if (this.choosedfileslist[index].id === data.id) {
            if (data.lastChoose !== data.id) {
              /* DO NOTHING */
            } else if (this.choosedfileslist.length === 1) {
              /* DO NOTHING */
            } else if (i === 0) {
              /* ??? index != 0 */
              this.chooseId = this.choosedfileslist[i + 1].id
            } else {
              this.chooseId = this.choosedfileslist[index - 1].id
            }
            this.choosedfileslist.splice(index, 1)
            return
          }
          i++
        }
      }
    }
  }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
    @import '../../../node_modules/smalltalk/css/smalltalk.css';

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
        cursor:default;
    }

    .main-container {
        width: 100vw;
        height: calc(100vh - 25px);
        background: #222222;
        display: flex;
        flex-direction: row;
    }

    .left-bar {
        width: 90px;
        height: 100%;
        background: #363636;
    }

    .middle-bar {
        width: 450px;
        height: 100%;
        overflow: hidden;
        background: #2a2a2a;
    }

    .middle-bar-top {
        width: 100%;
        height: 65px;
        background: #2f2f2f;
    }

    .middle-bar-list {
        width: 100%;
        height: calc(100% - 65px);
    }

    .right-content {
        width: calc(100% - 540px);
        height: 100%;
        overflow-x: hidden;
    }

    .bottom-container{
        width: 100%;
        height: 25px;
        background: rgb(28, 135, 241);
    }
</style>