{ Set, Model, Query, Rule } = require "./memory-record"

new Rule("card").schema ->
  @order "write_at"
  @path "book", "part", "potof"
  @belongs_to "role"

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

new Rule("stat").schema ->
  @path "book", "part", "potof"
  @belongs_to "able"

  class @model extends @model
    @deploy: ->
      @able_id = @idx

new Rule("role").schema ->
  @habtm "ables"

new Rule("trap").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "potof"

new Rule("able").schema ->
  @scope (all)->


Set.role.set require '~components/yaml/set_roles.yml'
Set.trap.set require '~components/yaml/set_traps.yml'
Set.able.set require '~components/yaml/set_ables.yml'
