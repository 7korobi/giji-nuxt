{ Collection, Model, Query, Rule } = require "~components/models/memory-record"

new Rule("menu").schema ->
  class @model extends @model
    constructor: ->
      @_id ?= @name

module.exports =
  namespaced: true
  state:
    center: 0
    target: null
  mutations:
    set: (state, list)->
      Collection.menu.set list
      state.list = Query.menus.list

    add: (state, menu)->
      Collection.menu.add menu
      state.list = Query.menus.list

    target: (state, name)->
      if state.target == name
        state.target = null
      else
        state.target = name
    center: (state, y)->
      state.center = y
