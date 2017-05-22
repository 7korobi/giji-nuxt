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
    @deploy: ->
      @q =
        mention_ids: []
      @log = @log.replace ///<mw\ +(..)(\d+),(\d+),([^>]+)>///g, (str, phase_idx, $1, part_idx, code)=>
        idx = Number($1)
        @q.mention_ids.push mention_id = [@book_id, part_idx, phase_idx, idx].join("-")
        """<abbr chat_id="#{mention_id}">&gt;&gt;#{code}</abbr>"""

    @map_reduce: (o, emit)->
      emit "say",
        count: 1
        all: o.log.length

      for mention_id in o.q.mention_ids
        emit "mention",
          belongs_to: "chats"
          summary: mention_id
          count: 1
        
        emit "mention_to", mention_id,
          belongs_to: "chats"
          summary: o.id
          count: 1
