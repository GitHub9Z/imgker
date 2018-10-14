const state = {
  main: 0,
  choosedItems: [],
  outputlist: [],
  userInfo: {},
  dragItem: {},
  isloading: false
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  CLICK_LIST_ITEM (state, items) {
    for (let index in items) {
      let isExist = false
      for (let iindex in state.choosedItems) {
        if (items[index]._id === state.choosedItems[iindex]._id) {
          isExist = true
          state.choosedItems.splice(iindex, 1)
          break
        }
      }
      if (!isExist) state.choosedItems.push(items[index])
    }
  },
  CLEAR_LIST (state) {
    state.choosedItems = []
  },
  OUT_PUT_STRING (state, log) {
    state.outputlist.push(log)
  },
  LOG_IN (state, info) {
    state.userInfo = info
  },
  CHANGE_LIB (state, item) {
    for (let index in state.userInfo.lib) {
      if (state.userInfo.lib[index].id === item.id) {
        let temp = JSON.parse(JSON.stringify(state.userInfo.lib[0]))
        state.userInfo.lib[0] = JSON.parse(JSON.stringify(state.userInfo.lib[index]))
        state.userInfo.lib[index] = temp
        state.userInfo = JSON.parse(JSON.stringify(state.userInfo))
        return
      }
    }
  },
  DRAG_ITEM (state, item) {
    state.dragItem = item
  },
  SET_IS_LOADING (state, isLoading) {
    state.isloading = isLoading
  },
  FLASH_USER (state, thiz) {
    let data = {
      name: state.userInfo.name,
      code: state.userInfo.code
    }
    thiz.$axios.get('gkerLogin', { params: data })
      .then(function (response) {
        let resdata = response.data
        if (!resdata.success) {
        } else {
          thiz.$store.commit('LOG_IN', resdata.data)
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

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
