<template>
  <!-- gk-edit-text{*} -->
  <div class='edit-content' @click="onClick">
    <input class="edit-input" ref="inputItem" v-model="editText" type="text" @keyup.enter="runText" placeholder="search-filter">
  </div>
</template>

<script>
  export default {
    props: [],
    data () {
      return {
        editText: ''
      }
    },
    created () {
    },
    computed: {
    },
    methods: {
      runText () {
        let message = {
          'from': 'editText',
          'oper': 'enter',
          'text': this.editText
        }
        this.$emit('childOper', message)
      },
      onClick () {
        this.$refs.inputItem.focus()
      }
    }
  }
</script>
<style>

  * {
    padding: 0;
    margin: 0;
  }

  .edit-content {
    height: 100%;
    width: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .edit-input {
    background: transparent;
    width: 100%;
    border: 0;
    font-size: 17px;
    color: rgb(199, 199, 199);
    outline:none;
  }
  
  
</style>