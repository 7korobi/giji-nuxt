{ Model, Query, Rule, Set } = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state: ->
    read_at: Date.now()
    prologue: []
    progress: []

  mutations:
    progress: (state)->
      state.prologue = Query.sow_villages.prologue.list
      state.progress = Query.sow_villages.progress.list

    join: (state, data)->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories
      state.read_at = Date.now()

  actions:
    progress: ({commit})->
      axios.get "http://giji.check.jp/api/story/progress"
      .then ({ status, data })->
        commit "join", data
        commit "progress", data
    oldlog: ({commit})->
      axios.get "http://giji.check.jp/api/story/oldlog"
      .then ({ status, data })->
        commit "join", data
