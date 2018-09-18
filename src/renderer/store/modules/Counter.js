const state = {
  main: 0,
  choosedItems: []
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
