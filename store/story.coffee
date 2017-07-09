{ Model, Query, Rule, Set } = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state: ->
    read_at:   0
    index_at:  0
    prologue: []
    progress: []

  mutations:
    progress: (state, data)->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories
      state.prologue = Query.sow_villages.prologue.list
      state.progress = Query.sow_villages.progress.list
      state.index_at = Date.now()

    oldlog: (state, data)->
      Set.sow_village.merge data.stories
      state.read_at = Date.now()

  actions:
    progress: ({state, commit})->
      return if  Date.now() - 10 * 60 * 1000 < state.index_at 
      axios.get "http://giji.check.jp/api/story/progress"
      .then ({ status, data })->
        commit "progress", data

    oldlog: ({ state, commit})->
      return if  Date.now() - 10 * 60 * 1000 < state.read_at 
      axios.get "http://giji.check.jp/api/story/oldlog"
      .then ({ status, data })->
        commit "oldlog", data
