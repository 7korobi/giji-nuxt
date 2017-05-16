{ Model, Set, Query, Rule } = Mem = require "~plugins/memory-record"

if window?
  window.Mem = Mem

new Rule("menu").schema ->
  class @model extends @model
    @deploy: ->
      @_id ?= @name

module.exports =
  namespaced: true
  state:
    top:    0
    center: 0
    bottom: 0

    left:   0
    right:  0

    horizon: 0
    height:  0
    width:   0

    target: null
  mutations:
    set: (state, list)->
      Set.menu.set list
      state.list = Query.menus.list

    add: (state, menu)->
      Set.menu.add menu
      state.list = Query.menus.list

    target: (state, name)->
      if state.target == name
        state.target = null
      else
        state.target = name

    pulse: (state, ext)->
      for o in state.list when o.name == "spinner"
        o.ext = ext

    center: (state, { top, left, height, width })->
      state.height  = height
      state.horizon = height / 2
      state.width   = width

      state.top    = top
      state.center = top + height / 2
      state.bottom = top + height

      state.left  = left
      state.right = left + width

