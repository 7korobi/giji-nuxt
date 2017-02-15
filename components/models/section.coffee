{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("section").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      @id ?= @_id
      @_id = @id
      [@book_id, part_idx, @idx] = @id.split('-')
      @part_id = [@book_id, part_idx].join('-')
      @label ?= @idx
