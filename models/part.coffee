{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("part").schema ->
  @order "write_at"
  @path "shelf", "book"
  @has_many "phases"
  @has_many "cards"
  @has_many "stats"

  @scope (all)->
    {}
