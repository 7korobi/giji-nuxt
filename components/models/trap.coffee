{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("trap").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "potof"

  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->

Collection.able.set require '~components/yaml/set_traps.yml'
