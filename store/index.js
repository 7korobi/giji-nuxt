import Vuex from 'vuex'

const store = new Vuex.Store({
  actions: {
    nuxtServerInit ({ commit }, { req }) {
    },
    login ({ commit }, { user, pass }) {
    }
  },
  modules: {
    menu: require("./menu.coffee"),
    book: require("./book.coffee")
  }
});
export default store
