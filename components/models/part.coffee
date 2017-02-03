{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("part").schema ->
  @order "write_at"
  @belongs_to "book"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      [book_id, @idx] = @id.split('-')
      @_id = @id
      console.warn @
