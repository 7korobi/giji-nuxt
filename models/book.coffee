{ Model, Query, Rule, Set } = require "~plugins/memory-record"

new Rule("book").schema ->
  @order "write_at"
  @has_many "parts"
  @has_many "sections"
  @has_many "potofs"
  @has_many "chats"

  @scope (all)->
    {}


new Rule("winner").schema ->
  @scope (all)->

new Rule("option").schema ->
  @scope (all)->

new Rule("say").schema ->
  @scope (all)->

Set.option.set require '../yaml/set_option.yml'
Set.winner.set require '../yaml/set_winner.yml'
Set.say.set    require '../yaml/set_says.yml'
