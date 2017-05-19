{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("section").schema ->
  @order "write_at"
  @path "folder", "book", "part"

  @scope (all)->
    {}

  class @model extends @model
    @deploy: ->
      @label ?= @idx
