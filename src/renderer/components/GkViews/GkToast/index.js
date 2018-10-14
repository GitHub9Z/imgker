import vue from 'vue'
import toastComponent from './GkToast.vue'

const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showToast (text, duration = 2000) {
  // 实例化一个 GkToast.vue
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        rotateNum: 0,
        text: text,
        alpha: 1,
        right: -250,
        status: 'normal'
      }
    }
  })

  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(toastDom.$el)
}

// 注册为全局组件的函数
function registryToast () {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast
}

export default registryToast
