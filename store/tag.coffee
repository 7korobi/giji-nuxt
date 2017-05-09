{ Model, Query, Rule } = require "~plugins/memory-record"
_ = require "lodash"

module.exports =
  namespaced: true
  state:
    tag_id: "giji"

  getters:
    test: -> 1

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
