require "../models/index"

_ = require "lodash"
axios = require "axios"
{ Model, Set, Query, Rule } = Mem = require "~/plugins/memory-record"

if window?
  window.Mem = Mem

module.exports =
  state: ->
    user: null
    env: {}
    read_at: {}
    timer: {}

  actions:
    nuxtServerInit: ({ commit }, { isDev, req, env })->
      global.env = env
      commit "update", { env }

      if isDev
        user =
          _id: "local-test-user"
          provider: "local-test"
          icon: "http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w52.jpg"
          mail: "7korobi.sys@gmail.com"
          nick: "テスト中"
          write_at: new Date - 0
          token: "DEADBEEF"
          account: "user"

        req.session ?=
          passport: { user }

      user = req.session?.passport?.user
      if user
        user = _.omit user, ["token"]
        commit "update", { user }

  mutations:
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
        console.log key, state[key]
      return
