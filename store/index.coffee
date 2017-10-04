require "../models/index"
axios = require "axios"
{ Model, Set, Query, Rule } = Mem = require "~/plugins/memory-record"

if window?
  window.Mem = Mem

###
  store.state は下記の特徴を持つ。
  ページ遷移をまたいでデータを保管する。
  SSRからデータを獲得する。

  store.state は下記の制約を受ける。
  JSON で表現可能な情報に限る。
  要素の追加、削除は特別な命令を使う。
###

module.exports =
  plugins: [
    require("~/plugins/get-by-mount").plugin
      commit: "update"
  ]
  state: ->
    user: null
    profile: null
    env: {}
    read_at: {}
    timer: {}

  actions:
    nuxtServerInit: ({ commit }, { isDev, req, env })->
      global.env = env
      commit "update", { env }
      # { cookie, passport } = req.session

      if isDev
        id = "local-test-user"
        commit "update",
          profile:
            id: id
            nick: "テスト中"
            mail: "7korobi.sys@gmail.com"
            icon: "http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w52.jpg"
            token: "DEADBEEF"
            account: "user"
            provider: "local-test"
            write_at: new Date - 0
          user: { id: id, sign: "俺俺" }

      if id = req.session?.passport?.user
        commit "login", id
        axios.get "http:#{env.API_URL}/user/#{id}"
        .then ({ status, data })->
          commit "update",
            profile: data

  mutations:
    login: (state, id)->
      state.user = { id }

    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
      return