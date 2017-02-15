{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("part").schema ->
  @order "write_at"
  @belongs_to "book"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      @id ?= @_id
      @_id = @id
      [@book_id, @idx] = @id.split('-')
