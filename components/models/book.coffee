{ Collection, Model, Query, Rule } = require "./memory-record"

require "./chr"
require "./potof"
require "./card"

require "./part"
require "./phase"
require "./chat"



new Rule("book").schema ->
  @order "write_at"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      @id ?= @_id
      @_id = @id
