{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("able").schema ->
  @scope (all)->

  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->

Collection.able.set require '~components/yaml/set_ables.yml'
