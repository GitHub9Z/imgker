const state = {
    dragItem: {}
  }
  
  const mutations = {
    COMMIT_DRAG_ITEM (state, item) {
        state.dragItem = item
    }
  }
  
  const actions = {
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  