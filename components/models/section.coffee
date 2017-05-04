{ Model, Query, Rule } = require "./memory-record"

new Rule("section").schema ->
  @order "write_at"
  @path "book", "part"

  @scope (all)->
    {}

  class @model extends @model
    @deploy: ->
      @label ?= @idx
