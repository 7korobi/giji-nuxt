require "../models/index"

module.exports =
  default:
    state: ->
      {}
    actions:
      nuxtServerInit: ({ commit }, { req })->
      login: ({ commit }, { user, pass })->

