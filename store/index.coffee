require "../models/index"

module.exports =
  default:
    state: ->
      id: null
      profile: {}
    actions:
      nuxtServerInit: ({ commit }, { req })->
        { profile, id } = req.session.id
        commit 'oauth', { id, profile }

    mutations:
      oauth: (state, id)->
        state.id = id
