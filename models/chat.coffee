{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("chat").schema ->
  @order "write_at"
  @path "folder", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  # props: ["id", "write_at", "handle", "style", "log", "face", "head", "sign"]

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  class @model extends @model
    @map_reduce: (o, emit)->
      o.log = o.log.replace ///<mw\ +(..)(\d+),(\d+),([^>]+)>///g, (str, phase_idx, $1, part_idx, code)->
        idx = Number($1)
        target_id = [o.book_id, part_idx, phase_idx, idx].join("-")
        emit "mention", target_id,
          belongs_to: "chats"
          summary: o.id
          count: 1          
        """<abbr chat_id="#{target_id}">&gt;&gt;#{code}</abbr>"""
