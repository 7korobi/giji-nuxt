{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("card").schema ->
  @order "write_at"
  @path "book", "part", "potof"
  @belongs_to "role"

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  class @model extends @model
    @map_reduce: (o, emit)->
    @deploy: ->
      @id ?= @_id
      @_id = @id

new Rule("stat").schema ->
  @path "book", "part", "potof"
  @belongs_to "able"

  class @model extends @model
    @map_reduce: (o, emit)->
    @deploy: ->
      @id ?= @_id
      @_id = @id
      @able_id = @idx

new Rule("role").schema ->
  @habtm "ables"
  class @model extends @model
    @map_reduce: (o, emit)->
    @deploy: ->

new Rule("trap").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "potof"

  class @model extends @model
    @map_reduce: (o, emit)->
    @deploy: ->

new Rule("able").schema ->
  @scope (all)->

  class @model extends @model
    @map_reduce: (o, emit)->
    @deploy: ->


Collection.role.set require '~components/yaml/set_roles.yml'
Collection.trap.set require '~components/yaml/set_traps.yml'
Collection.able.set require '~components/yaml/set_ables.yml'
