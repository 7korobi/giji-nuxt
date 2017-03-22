{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
axios = require "axios"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    read_at: Date.now()
    prologue: []
    progress: []

  mutations:
    join: (state, data)->
      progress = _.keyBy data.events, "story_id"
      stories = _.orderBy data.stories, "timer.nextcommitdt", "desc"
      stories = _.groupBy stories, (o)->
        o.folder = Query.folders.hash[o.folder.toUpperCase()]
        if o.progress = progress[o._id]
          "progress"
        else
          "prologue"
      state.prologue = stories.prologue
      state.progress = stories.progress

  actions:
    progress: ({commit})->
      axios.get "http://utage.family.jp:4000/api/story/progress"
      .then ({ status, data })->
        commit "join",  data
