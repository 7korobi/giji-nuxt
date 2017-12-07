axios = require "axios"

module.exports =
  namespaced: true
  state: -> {}

  mutations:
    hide_potof_ids: (state, ids)->
      state.hide_potof_ids = ids

  actions:
    update: ({commit, rootState}, user)->
      Object.assign rootState.user, user
      await axios.post "#{env.url.api}/user", { user }
