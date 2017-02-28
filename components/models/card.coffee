{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("card").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"
  @belongs_to "potof"
  @belongs_to "role"

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->
      @id ?= @_id
      @_id = @id
      [@book_id, part_idx, @idx] = @id.split('-')
      @part_id = [@book_id, part_idx].join('-')

new Rule("role").schema ->
  @has_many "ables", by: "ids"
  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->

new Rule("trap").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "potof"

  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->

new Rule("able").schema ->
  @scope (all)->

  class @model extends @model
    @map_reduce: (o, emit)->
    constructor: ->


Collection.role.set require '~components/yaml/set_roles.yml'
Collection.trap.set require '~components/yaml/set_traps.yml'
Collection.able.set require '~components/yaml/set_ables.yml'
