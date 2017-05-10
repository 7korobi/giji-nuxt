{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("book").schema ->
  @order "write_at"
  @has_many "parts"
  @has_many "sections"
  @has_many "potofs"
  @has_many "chats"

  @scope (all)->
    {}
