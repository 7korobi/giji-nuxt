import Vuex from 'vuex'
import "../models/index"

const store = new Vuex.Store({
  actions: {
    nuxtServerInit ({ commit }, { req }) {
    },
    login ({ commit }, { user, pass }) {
    }
  },
  modules: {
    sow: require("./sow.coffee"),
    menu: require("./menu.coffee"),
    book: require("./book.coffee"),
    story: require("./story.coffee"),
    aggregate: require("./aggregate.coffee")
  }
});
export default store
