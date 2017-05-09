{ Model, Query, Rule, Set } = require "~components/models/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    prologue: []
    progress: []
    oldlog: {}

  mutations:
    progress: (state)->
      state.prologue = Query.sow_villages.prologue.list
      state.progress = Query.sow_villages.progress.list

    oldlog: (state, folder)->
      state.oldlog[folder] = Query.sow_villages.oldlog(folder).list

    join: (state, data)->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories
      state.read_at = Date.now()

  actions:
    progress: ({commit})->
      axios.get "http://utage.family.jp:4000/api/story/progress"
      .then ({ status, data })->
        commit "join", data
        commit "progress", data
    oldlog: ({commit}, folder)->
      axios.get "http://utage.family.jp:4000/api/story/oldlog/#{folder}"
      .then ({ status, data })->
        commit "join", data
        commit "oldlog", folder
