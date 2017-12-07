axios = require "axios"

module.exports =
  namespaced: true
  state: -> {}

  actions:
    update: ({commit, rootState}, user)->
      Object.assign rootState.user, user
      await axios.post "#{env.url.api}/user", { user }
