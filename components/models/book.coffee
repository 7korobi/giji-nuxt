{ Collection, Model, Query, Rule } = require "memory-record"

new Rule("book").schema ->
  @order "write_at"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      @_id = @id
      console.warn @
