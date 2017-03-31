{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("part").schema ->
  @order "write_at"
  @path "book"

  @scope (all)->
    {}

  class @model extends @model
    @deploy: ->
      @id ?= @_id
      @_id = @id
