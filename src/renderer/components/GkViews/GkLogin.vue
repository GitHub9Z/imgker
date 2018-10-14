<template>
  <!-- gk-login{*} -->
  <div class="login-content">
    <div class="login-bar">
      <div class="title">
        {{title}}
      </div>
      <div class="icon" @click="cancel">
        <img class="icon-img" src='@/assets/icon/delete_white_icon.png'>
      </div>
    </div>
    <div class="login-logo-area">
      <img class="logo-img" src='@/assets/icon/gker_logo.png'>   G K E R
    </div>
    <div class="login-content-area">
      <div class='login-item' v-for="(value, key) in object" :key='key'>
        <div class="login-value">{{key}} :</div>
        <input class="login-input" v-model="object[key]" :type="key === '密码'?'password':'text'">
      </div>
    </div>
    <div class="login-config">
      <gk-check-box class="check-box" :item="[{},isRemember]"></gk-check-box>记住我的密码<div class="status-text" v-if="status !== ''">{{status}}</div>
    </div>
    <div class="login-buttons">
        <div class="login-button" @click="submit">登录</div>
        <div class="login-button" @click="cancel">取消</div>
    </div>
    <div class="divider"></div>
    <div class="login-help">
      <div class="login-help-text">登录时需要帮助吗？</div>
      <div class="help-button">我无法登陆...</div>
    </div>
    <div class="login-help">
      <div class="login-help-text">还没有GKER账户？</div>
      <div class="help-button" @click="enlist">创建一个新的账户...</div>
    </div>
    {{autoCode}}
  </div>
</template>

<script>
  import GkCheckBox from '@/components/GkViews/GkCheckBox'
  export default {
    components: {
      GkCheckBox
    },
    data () {
      return {
        title: 'Gker 登录',
        object: {
          '账户名称': '',
          '密码': ''
        },
        status: '',
        isRemember: { isR: false }
      }
    },
    created () {
    },
    computed: {
      autoCode () {
        if (localStorage.hasOwnProperty(this.object['账户名称'])) {
          this.object['密码'] = localStorage[this.object['账户名称']]
          this.isRemember.isR = true
        }
      }
    },
    methods: {
      enlist () {
        this.setStatus('')
        let message = {
          'from': 'login',
          'oper': 'enlist'
        }
        this.$emit('childOper', message)
      },
      cancel () {
        this.setStatus('')
        let message = {
          'from': 'login',
          'oper': 'cancel'
        }
        this.$emit('childOper', message)
      },
      setStatus (data) {
        this.status = data
        this.object['账户名称'] = ''
        this.object['密码'] = ''
        this.isRemember.isR = false
      },
      submit () {
        if (this.object['账户名称'] === '' || this.object['密码'] === '') {
          this.status = '请填写账户信息'
        } else {
          var thiz = this
          let data = {
            name: this.object['账户名称'],
            code: this.object['密码']
          }
          this.$axios.get('gkerLogin', { params: data })
            .then(function (response) {
              let resdata = response.data
              if (!resdata.success) {
                thiz.setStatus('账户信息有误')
              } else {
                if (thiz.isRemember.isR) {
                  if (!localStorage.hasOwnProperty(thiz.object['账户名称'])) {
                    localStorage[thiz.object['账户名称']] = thiz.object['密码']
                  }
                } else {
                  if (localStorage.hasOwnProperty(thiz.object['账户名称'])) {
                    delete localStorage[thiz.object['账户名称']]
                  }
                }
                thiz.setStatus('')
                thiz.$log({
                  title: 'login',
                  output: 'USER: ' + JSON.stringify(resdata.data, Object.keys(resdata.data), 1000)
                })
                thiz.$store.commit('LOG_IN', resdata.data)
                let message = {
                  'from': 'login',
                  'oper': 'submit',
                  'item': thiz.object
                }
                thiz.$emit('childOper', message)
                thiz.$toast(' S U C C E S S')
              }
            })
            .catch(function (error) {
              let smalltalk = require('smalltalk/legacy')
              smalltalk.alert('加载文件', '请检查网络连接')
                .then(() => {
                  console.log(error)
                })
            })
        }
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
    margin: 0 0 0 418px;
  }

  .title {
    font-size: 14px;
    padding: 3px 0;
    width: 100px;
    height: 30px;
  }

  .icon-img {
    width: 14px;
    height: 14px;
  }

  .check-box {
    margin: 0 10px 0 140px;
    padding: 4px;
    height: 26px;
    width: 26px;
  }
  .logo-img {
    width: 44px;
    height: 44px;
    margin: 0 10px
  }

  .login-logo-area {
    width: 100%;
    display: flex;
    height: 70px;
    padding: 10px 60px;
    font-size: 22px;
    font-weight: bold;
    color: rgb(194, 194, 194);
    flex-direction: row;
    align-items: flex-end;
  }

  .login-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .login-config {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    color: rgb(199, 199, 199);
  }

  .login-content {
    width:550px;
    height: 400px;
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 111;
    margin: auto;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);  
    background: rgb(53, 53, 53);
    overflow: hidden;
  }

  .login-content-area {
    width: calc(100% + 20px);
    padding: 0 20px;
  }

  .login-item {
    margin: 12px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: transparent;
    font-size: 13px;
    color: rgb(199, 199, 199);
  }
  
  .login-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 126px;
    width: 100%;
  }

  .login-value {
    width: 120px;
    padding: 0 5px 0 0;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-input {
    border: 1px solid rgb(160, 160, 160);
    width: 350px;
    height: 24px;
    padding: 4px;
    font-size: 15px;
    background: rgb(53, 53, 53);
    color: rgb(199, 199, 199);
  }
  
  .login-button {
    width: 168px;
    height: 24px;
    margin: 15px 0 15px 14px;
    padding: 0 5px;
    line-height: 24px;
    text-align: left;
    font-size: 13px;
    border: 1px solid rgb(88, 88, 88);
    background: rgb(94, 94, 94);
    color: rgb(211, 211, 211);
  }

  .login-button:hover {
    width: 168px;
    height: 24px;
    margin: 15px 0 15px 14px;
    padding: 0 5px;
    line-height: 24px;
    text-align: left;
    font-size: 13px;
    border: 1px solid rgb(88, 88, 88);
    background: rgb(131, 131, 131);
    color: rgb(211, 211, 211);
  }
  
  .login-help {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 57px;
    width: 100%;
  }

  .login-help-text {
    width: 186px;
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    text-align: right;
    font-size: 13px;
    color: rgb(211, 211, 211);
  }

  .help-button {
    width: 300px;
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    text-align: left;
    font-size: 13px;
    border: 1px solid rgb(88, 88, 88);
    background: rgb(94, 94, 94);
    color: rgb(211, 211, 211);
  }

  .help-button:hover {
    width: 300px;
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    text-align: left;
    font-size: 13px;
    border: 1px solid rgb(88, 88, 88);
    background: rgb(131, 131, 131);
    color: rgb(211, 211, 211);
  }

  .divider {
    height: 1px;
    width: calc(100% - 30px);
    margin: 15px;
    background: rgb(94, 94, 94);
  }

  .status-text {
    width: 230px;
    text-align: right;
    font-size: 13px;
    color: rgb(190, 63, 63);
  }
</style>