import Vuex from 'vuex'
import "~components/models/index"

const store = new Vuex.Store({
  actions: {
    nuxtServerInit ({ commit }, { req }) {
    },
    login ({ commit }, { user, pass }) {
    }
  },
  modules: {
    menu: require("./menu.coffee"),
    book: require("./book.coffee"),
    aggregate: require("./aggregate.coffee")
  }
});
export default store
