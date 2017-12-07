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
          provider: "local-test"
          icon: "http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w52.jpg"
          mail: "7korobi.sys@gmail.com"
          nick: "テスト中"
          write_at: new Date - 0
        secret =
          token: "DEADBEEF"
          account: "user"
        req.session.passport.user = { ...secret, ...user }
        commit "update", { user }

      { user } = req.session.passport
      if user
        _id = token = account = undefined
        user = { ...user, ...{ _id, token, account }}
        commit "update", { user }

  mutations:
    update: (state, o)->
      for key, val of state when o[key]
        state[key] = { val..., o[key]... }
        console.log key, state[key]
      return