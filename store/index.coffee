require "../models/index"
axios = require "axios"
Mem = require "~plugins/memory-record"

module.exports =
  default:
    state: ->
      read_at = Mem.read_at
      user: null
      profile: {}
      env: {}

    actions:
      nuxtServerInit: ({ commit }, { req, env })->
        global.env = env
        commit "public_env", env
        # { cookie, passport } = req.session

        if id = req.session?.passport?.user
          commit "login", id

          axios.get "#{env.API_URL}/user/#{id}"
          .then ({ status, data })->
            console.log "HTTP :: /api/books/#{id}"
            commit "profile", data

    mutations:
      public_env: (state, public_env)->
        state.env = public_env

      login: (state, id)->
        state.user = id

      profile: (state, data)->
        state.profile = data
