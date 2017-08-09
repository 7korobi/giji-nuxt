{ Model, Query, Rule, Set, Finder } = Mem = require "~plugins/memory-record"
axios = require "axios"

module.exports =
  namespaced: true
  state: -> {}

  mutations:
    progress: (state, data)->
      Set.sow_turn.merge    data.events
      Set.sow_village.merge data.stories

    oldlog: (state, data)->
      Set.sow_village.merge data.stories
      for { _id, story_ids } in data.faces
        for story_id in story_ids when vil = Query.sow_villages.find story_id
          vil.aggregate.face_ids.push _id.face_id
      Finder.sow_village.clear_cache()

  actions:
    progress: ({state, commit, rootState })->
      Mem.read_at_gate "story_progress", ->
        axios.get "#{env.API_URL}/story/progress"
        .then ({ status, data })->
          commit "progress", data

    oldlog: ({ state, commit, rootState })->
      Mem.read_at_gate "story_oldlog", ->
        axios.get "#{env.SOW_URL}/index.json.gz"
        .then ({ status, data })->
          commit "oldlog", data
