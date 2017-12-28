{ Model, Query, Rule, Set } = require "~/plugins/memory-record"

new Rule("book").schema ->
  @order "write_at"
  @path "folder"
  @has_many "parts"
  @has_many "phases"
  @has_many "sections"
  @has_many "chats"
  @has_many "potofs"
  @belongs_to "winner"

  Object.assign @model_property,
    head:
      get: ->
        "#{@idx}: #{@label}"
  
  @scope (all)->
    {}


new Rule("winner").schema ->
  @scope (all)->

new Rule("option").schema ->
  @scope (all)->

new Rule("say").schema ->
  @scope (all)->
    active: all.in for: env.game.folder_id
  @deploy ->
    @for ?= []

new Rule("game").schema ->
  @scope (all)->

Set.option.set require '../yaml/set_option.yml'
Set.winner.set require '../yaml/set_winner.yml'
Set.say.set    require '../yaml/set_says.yml'
Set.game.set   require "../yaml/sow_game.yml"
