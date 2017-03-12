{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("aggregate").schema ->
  @order "story_ids.length", "desc"
  @belongs_to "face",  dependent: true

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      for key in ["face_id", "sow_auth_id", "mestype", "role_id", "live"]
        @[key] = @_id[key] ? null
      @_id = JSON.stringify @_id
