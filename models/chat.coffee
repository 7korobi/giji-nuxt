{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("chat").schema ->
  @order "write_at"
  @path "shelf", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  # props: ["id", "write_at", "handle", "style", "log", "face", "head", "sign"]

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  class @model extends @model
    @map_reduce: (o, emit)->
      emit "section", o.section_id,
        min: o.open_at
        max: o.write_at
