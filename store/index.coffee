require "../models/index"
axios = require "axios"

module.exports =
  default:
    state: ->
      user: null
      profile: {}

    actions:
      nuxtServerInit: ({ commit }, { req })->
        # { cookie, passport } = req.session
        if id = req.session?.passport?.user
          commit "login", id

          axios.get "http://giji.f5.si/api/user/#{id}"
          .then ({ status, data })->
            console.log "HTTP :: /api/books/#{id}"
            commit "profile", data

    mutations:
      login: (state, id)->
        state.user = id

      profile: (state, data)->
        state.profile = data
