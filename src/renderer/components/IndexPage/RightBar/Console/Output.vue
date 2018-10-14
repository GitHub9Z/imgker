<template>
  <!-- index{right-bar{output{*}}} -->
  <div class='output-content' ref="scroll"> 
    <output-item :item="item" v-for="item in outputlist" :key='item'></output-item>
  </div>
</template>
<script>
  import OutputItem from '@/components/IndexPage/RightBar/Console/Output/OutputItem'
  export default {
    components: {
      OutputItem
    },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
      outputlist () {
        let thiz = this
        this.$nextTick(() => {
          let scroll = thiz.$refs.scroll
          scroll.scrollTop = scroll.scrollHeight
        })
        for (let index in this.$store.state.Counter.outputlist) {
          if (!(this.$store.state.Counter.outputlist[index].hasOwnProperty('color'))) {
            for (let iindex in this.$store.state.Counter.outputlist) {
              if (index === iindex) break
              if (this.$store.state.Counter.outputlist[iindex].title === this.$store.state.Counter.outputlist[index].title) {
                this.$store.state.Counter.outputlist[index].color = this.$store.state.Counter.outputlist[iindex].color
                break
              }
            }
            if (!(this.$store.state.Counter.outputlist[index].hasOwnProperty('color'))) this.$store.state.Counter.outputlist[index].color = this.getRandomColor()
          }
        }
        return this.$store.state.Counter.outputlist
      }
    },
    methods: {
      getRandomColor () {
        let color = '#' + '0123456789abcdef'.split('').map(function (v, i, a) { return i > 5 ? null : a[Math.floor(Math.random() * 16)] }).join('')
        return color
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .output-content{
    padding: 5px 5px 0 20px;
    overflow-y: auto;
  }
</style>