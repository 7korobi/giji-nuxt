{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("book").schema ->
  @order "write_at"

  @scope (all)->
    {}

  class @model extends @model
    @deploy: ->
      @id ?= @_id
      @_id = @id

