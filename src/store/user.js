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
      localStorage.setItem('user', JSON.stringify(userWithTokenObject))
    },
    logout (state) {
      state.token = ''
      state.user = {}
      localStorage.removeItem('user')
    }
  }
})

;(() => {
  try {
    const lsUser = localStorage.getItem('user')
    if (!lsUser) return
    const user = JSON.parse(lsUser)
    store.commit('setUser', user)
  } catch (e) {
    // do nothing yet
  }
})()

export default store
