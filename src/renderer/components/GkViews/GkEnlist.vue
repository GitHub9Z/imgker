<template>
  <!-- gk-enlist{*} -->
  <div class="enlist-content">
    <div class="enlist-bar">
      <div class="title">
        {{title}}
      </div>
      <div class="icon" @click="cancel">
        <img class="icon-img" src='@/assets/icon/delete_white_icon.png'>
      </div>
    </div>
    <div class="enlist-logo-area">
      <img class="logo-img" src='@/assets/icon/gker_logo.png'> G K E R
    </div>
    <div class="enlist-content-area">
      <div class='enlist-item' v-for="(value, key) in object" :key='key'>
        <div class="enlist-value">{{key}} :</div>
        <input class="enlist-input" v-model="object[key]" :type="key !== '账户名称'?'password':'text'">
      </div>
    </div>
    <div class="enlist-config">
      <gk-check-box class="check-box" :item="[{},isAgree]"></gk-check-box>同意用户协议<div class="status-text" v-if="status !== ''">{{status}}</div>
    </div>
    <div class="enlist-buttons">
      <div class="enlist-button" @click="submit">注册</div>
      <div class="enlist-button" @click="cancel">取消</div>
    </div>
    <div class="divider"></div>
    <div class="enlist-help">
      <div class="enlist-help-text">已经注册过GKER账户？</div>
      <div class="help-button" @click="login">返回登录界面...</div>
    </div>
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
        title: 'Gker 注册',
        object: {
          '账户名称': '',
          '密码': '',
          '确认密码': ''
        },
        isAgree: { isR: false },
        status: ''
      }
    },
    created () {},
    computed: {},
    methods: {
      cancel () {
        this.setStatus('')
        let message = {
          'from': 'enlist',
          'oper': 'cancel'
        }
        this.$emit('childOper', message)
      },
      login () {
        this.setStatus('')
        let message = {
          'from': 'enlist',
          'oper': 'login'
        }
        this.$emit('childOper', message)
      },
      setStatus (data) {
        this.status = data
        this.object['账户名称'] = ''
        this.object['确认密码'] = ''
        this.object['密码'] = ''
        this.isAgree.isR = false
      },
      submit () {
        if (this.object['账户名称'] === '' || this.object['密码'] === '') {
          this.status = '请填写账户信息'
        } else if (this.object['密码'] !== this.object['确认密码']) {
          this.setStatus('密码输入不一致')
          return
        } else if (!this.isAgree.isR) {
          this.setStatus('请阅读用户协议')
          return
        }
        this.$store.commit('SET_IS_LOADING', true)
        let thiz = this
        let item = {
          'name': this.object['账户名称'],
          'code': this.object['密码']
        }
        thiz.$axios.get('update', {
          params: {
            'db': 'GkerUser',
            'model': 'edit',
            'item': JSON.stringify(item),
            'items': JSON.stringify(item)
          }
        })
          .then(function (response) {
            let lib = {
              'name': 'default_lib',
              'owner_id': response.data.data.id
            }
            thiz.$axios.get('update', {
              params: {
                'db': 'GkerLib',
                'model': 'edit',
                'item': JSON.stringify(lib),
                'items': JSON.stringify(lib)
              }
            })
              .then(function (response) {
                thiz.$store.commit('SET_IS_LOADING', false)
                thiz.setStatus('注册成功!')
              })
              .catch(function (error) {
                console.log(error)
              })
          })
          .catch(function (error) {
            console.log(error)
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

  .check-box {
    margin: 0 10px 0 140px;
    padding: 4px;
    height: 26px;
    width: 26px;
  }

  .enlist-config {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    color: rgb(199, 199, 199);
  }

  .status-text {
    width: 230px;
    text-align: right;
    font-size: 13px;
    color: rgb(190, 63, 63);
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

  .enlist-logo-area {
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

  .enlist-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .enlist-config {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    color: rgb(199, 199, 199);
  }

  .enlist-content {
    width: 550px;
    height: 400px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 111;
    margin: auto;
    box-shadow: 0px 0px 10px rgb(8, 8, 8);
    background: rgb(53, 53, 53);
    overflow: hidden;
  }

  .enlist-content-area {
    width: calc(100% + 20px);
    padding: 0 20px;
  }

  .enlist-item {
    margin: 12px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: transparent;
    font-size: 13px;
    color: rgb(199, 199, 199);
  }

  .enlist-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 126px;
    width: 100%;
  }

  .enlist-value {
    width: 120px;
    padding: 0 5px 0 0;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .enlist-input {
    border: 1px solid rgb(160, 160, 160);
    width: 350px;
    height: 24px;
    padding: 4px;
    font-size: 15px;
    background: rgb(53, 53, 53);
    color: rgb(199, 199, 199);
  }

  .enlist-button {
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

  .enlist-button:hover {
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

  .enlist-help {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 57px;
    width: 100%;
  }

  .enlist-help-text {
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