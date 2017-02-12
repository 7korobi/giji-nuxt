{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("card").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"
  @belongs_to "potof"

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->

