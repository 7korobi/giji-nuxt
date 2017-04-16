{ Collection, Model, Query, Rule } = require "./memory-record"

for { _id } in Query.faces.list
  new Rule("aggregate-#{_id}").schema ->
    @order "story_ids.length", "desc"

    @scope (all)->
      {}
    class @model extends @model
      @map_reduce: (item, emit)->
        cmd =
          count: @story_ids.length
        if @_id.sow_auth
          emit "sow_auth", @_id.sow_auth, cmd
        if @_id.mestype
          emit "mestype", @_id.mestype, cmd
        if @_id.role
          emit "role", @_id.role, cmd
        if @_id.live
          emit "live", @_id.live, cmd

