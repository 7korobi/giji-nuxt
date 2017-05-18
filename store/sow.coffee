{ Model, Query, Rule, Set } = require "~plugins/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()

  mutations:
    join: (state, data)->
      Set.sow_village.merge data.stories
      Set.sow_turn.merge    data.events
      Set.potof.merge       data.potofs
      Set.chat.merge        data.messages
      state.read_at = Date.now()

  actions:
    story: ({commit}, story_id)->
      axios.get "http://utage.family.jp:4000/api/story/oldlog/#{story_id}"
      .then ({ status, data })->
        commit "join", data
