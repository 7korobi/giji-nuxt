{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("aggregate").schema ->
  @order "story_ids.length", "desc"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      @_id = JSON.stringify @group = @_id
      @group.sow_auth_id ?= null
      @group.mestype     ?= null
      @group.role_id     ?= null
      @group.live        ?= null
