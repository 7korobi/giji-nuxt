require "../models/index"

module.exports =
  default:
    state: ->
      id: null
      profile: {}

    actions:
      nuxtServerInit: ({ commit }, { req })->
        { id, profile } = req.session
        commit 'oauth', { id, profile }

    mutations:
      oauth: (state, data)->
        Object.assign state, data
