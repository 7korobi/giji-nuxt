require "../models/index"
axios = require "axios"
Mem = require "~plugins/memory-record"

###
  store.state は下記の特徴を持つ。
  ページ遷移をまたいでデータを保管する。
  SSRからデータを獲得する。

  store.state は下記の制約を受ける。
  JSON で表現可能な情報に限る。
  要素の追加、削除は特別な命令を使う。
###

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
