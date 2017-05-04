{ Model, Query, Rule } = require "./memory-record"

new Rule("part").schema ->
  @order "write_at"
  @path "book"
  @has_many "phases"
  @has_many "cards"
  @has_many "stats"

  @scope (all)->
    {}
