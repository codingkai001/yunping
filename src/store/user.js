import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    user: {}
  },
  mutations: {
    setUser (state, userWithTokenObject) {
      state.token = userWithTokenObject.token
      state.user = userWithTokenObject.user
    }
  }
})

export default store
