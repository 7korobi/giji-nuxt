{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("chat").schema ->
  @path "folder", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  # props: ["id", "write_at", "handle", "style", "log", "face", "head", "sign"]

  @scope (all)->
    for_part:  (part_id)->  all.where {  part_id }
    for_phase: (phase_id)-> all.where { phase_id }

  class @model extends @model
    @deploy: ->
      @q =
        mention_ids: []
      @log = @log.replace ///<mw\ +(..)(\d+),(\d+),([^>]+)>///g, (str, phase_idx, $1, part_idx, code)=>
        [phase_handle_head, phase_group] = phase_idx
        if phase_idx == 'MM'
          phase_idx = phase.idx[0] + phase_group
        idx = Number($1)
        @q.mention_ids.push mention_id = [@book_id, part_idx, phase_idx, idx].join("-")
        """<abbr chat_id="#{mention_id}">&gt;&gt;#{code}</abbr>"""

    @map_reduce: (o, emit)->
      emit "say",
        max: o.write_at
        min: o.write_at
        count: 1
        all: o.log.length

      for mention_id in o.q.mention_ids
        emit "mention", mention_id,
          count: 1
        
        emit "mention_to", mention_id, o.id
          count: 1

    @order: (o, emit)->
      emit "list",
        sort: ["write_at"]
      emit "mention",
        sort: ["count", "desc"]
      for mention_id in o.q.mention_ids
        emit "mention_to", mention_id,
          sort: ["count", "desc"]
