<template>
  <!-- gk-prompt{*} -->
  <div class="prompt-content">
    <div class="prompt-bar">
      <div class="icon" @click="cancel">
        <img src='@/assets/icon/delete_white_icon.png'>
      </div>
    </div>
    <div class="prompt-content-area">
      <div class='prompt-item' v-if="key !== '_id'&&key !== '__v'" v-for="(value, key) in object" :key='key'>
        <div class="prompt-value">{{key}} :</div>
        <input class="prompt-input" v-model="object[key]" type="text">
      </div>
    </div>
    <div class="prompt-buttons">
        <div class="prompt-button" @click="submit">确认</div>
        <div class="prompt-button" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['object'],
    data () {
      return {
      }
    },
    created () {
    },
    computed: {
    },
    methods: {
      cancel () {
        let message = {
          'from': 'prompt',
          'oper': 'cancel'
        }
        this.$emit('childOper', message)
      },
      submit () {
        let message = {
          'from': 'prompt',
          'oper': 'submit',
          'item': this.object
        }
        this.$emit('childOper', message)
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

  .prompt-content {
    width: 300px;
    height: 400px;
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; z-index: 1;
    margin: auto;
    border: 1px solid rgb(100, 100, 100);
    background: rgb(53, 53, 53);
    overflow: hidden;
  }

  .prompt-content-area {
    width: calc(100% + 20px);
    padding: 0 20px;
    height: 310px;
    overflow-y: scroll;
  }

  .prompt-item {
    margin: 8px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: transparent;
    font-size: 17px;
    color: rgb(199, 199, 199);
  }
  
  .prompt-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .prompt-value {
    width: 220px;
    padding: 0 5px 0 0;
    font-weight: bold;
    text-align: right;
  }

  .prompt-input {
    background: rgb(37, 37, 37);
    border: 1px solid rgb(87, 87, 87);
    width: 140px;
    border: 0;
    padding: 4px;
    font-size: 15px;
    color: rgb(199, 199, 199);
    outline:none;
  }
  
  .prompt-button {
    width: 120px;
    height: 30px;
    margin: 15px 0 15px 20px;
    padding: 3px 0;
    text-align: center;
    font-size: 15px;
    border: 1px solid rgb(88, 88, 88);
    background: rgb(34, 34, 34);
    font-weight: bold;
    color: rgb(199, 199, 199);
  }
  
</style>