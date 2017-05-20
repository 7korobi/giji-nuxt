{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("section").schema ->
  @order "write_at"
  @path "folder", "book", "part"
  @has_many "chats"

  @scope (all)->
    {}

  class @model extends @model
    @deploy: ->
      @label ?= @idx
