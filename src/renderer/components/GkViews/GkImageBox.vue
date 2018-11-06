<template>
  <!-- gk-image-box{*} -->
  <div class='imagebox-content' @mouseenter="onMouseOver" @mouseleave="onMouseOut" :style="{background: boxColor}">
      <div class='image-area'>
        <img :src="item.adURL">
        <div class="file">更换{{item.adName}}的图片
          <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        boxColor: 'rgb(61, 61, 61)'
      }
    },
    created () {
    },
    computed: {
    },
    methods: {
      onClick () {
        let message = {
          'from': 'button',
          'oper': 'click',
          'text': this.text
        }
        this.$emit('childOper', message)
        let remote = require('electron').remote
        let fs = remote.require('fs')
        let restler = require('restler')
        let dialog = remote.dialog
        let path = dialog.showOpenDialog({
          filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }],
          properties: ['openFile']
        })
        console.log(path)
        fs.stat(path[0], function (err, stats) {
          let pic = restler.file(path[0], null, stats.size, null, 'image/jpg')
          console.log(err)
          console.log('uploadImage: ', pic)
          restler.post('https://xaoji.com/api/uploadImage', {
            multipart: true,
            data: {
              // 根据文件名解析 mimetype
              pic: pic
            }
          }).on('complete', function (msg) {
            console.log(msg)
          })
          /* let param = new FormData()  // 创建form对象
          param.append('file', file, file.name)  // 通过append向form对象添加数据
          param.append('chunk', '0') // 添加form表单中其他数据
          console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          // 添加请求头
          axios.post('https://xaoji.com/api/uploadImage', param, config)
            .then(response => {
              if (response.data.code === 0) {
              }
              console.log(response.data)
            }) */
        })
      },
      update (e) {
        let thiz = this
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData() // 创建form对象
        param.append('pic', file, this.item.adName + '.png') // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('pic')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        // 添加请求头
        this.$axios.post('https://xaoji.com/api/uploadImage', param, config)
          .then(response => {
            if (response.data.code === 0) {
              // self.ImgUrl = response.data.data
            }
            console.log(response.data)
            thiz.item.adURL = 'https://xaoji.com/upload/image/' + this.item.adName + '.png?date=' + JSON.stringify(new Date())
          })
      },
      onMouseOver () {
        this.boxColor = 'rgb(82, 82, 82)'
      },
      onMouseOut () {
        this.boxColor = 'rgb(61, 61, 61)'
      }
    }
  }
</script>
<style scoped>

  * {
    padding: 0;
    margin: 0;
  }

  .image-area {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  img {
    width: 130px;
    height: 130px;
    background: rgb(255, 255, 255);
    float: left;
  }

  .imagebox-content {
    height: 180px;
    width: 150px;
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Menlo Bold', 'monospace', monospace, 'Droid Sans Fallback', 'Noto Color Emoji';
  }

	.file {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
		overflow: hidden;
		color: rgb(128, 128, 128);
	}
	.file input {
		position: absolute;
		font-size: 100px;
		right: 0;
		top: 0;
		opacity: 0;
	}

</style>