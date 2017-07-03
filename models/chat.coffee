{ Model, Query, Rule } = require "~plugins/memory-record"

new Rule("chat").schema ->
  @path "folder", "book", "part", "phase"
  @belongs_to "section"
  @belongs_to "potof"

  # props: ["id", "write_at", "handle", "style", "log", "face", "head", "sign"]

  @scope (all)->
    full = all.where("phase.group": ['S','A','I'])

    memo:   all.where("phase.group": ['M'])
    full:   full
    title:  full.where (o)-> o.phase.handle in ['MAKER', 'ADMIN','dark']
    rest:   full.where (o)-> o.phase.handle in ['GSAY']
    normal: full.where (o)-> o.phase.handle in ['SSAY','VSSAY','MAKER','ADMIN','dark']
    extra:  full.where (o)-> ! (o.phase.handle in ['SSAY','VSSAY','MAKER','ADMIN','dark','GSAY','TSAY'])
    solo:   full.where (o)-> o.phase.handle in ['TSAY']

    parts: (hides, mode)-> all.pages.bind(all, hides, mode)
    pages: (hides, mode, part_id)->
      all[mode]
      .where (o)=> part_id == o.part_id && !(o.potof_id in hides)

  anker =
    belongs_to: 'chats'
    sort: ["count", "desc"]
  
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
      if o.phase_id in ["#{o.part_id}-SS", "#{o.part_id}-GS", "#{o.part_id}-VS"]
        emit "potof", o.phase_id, o.potof_id,
          count: 1
          all: o.log.length
          max: o.write_at
          min: o.write_at
      emit "say",
        max: o.write_at
        min: o.write_at
        count: 1
        all: o.log.length

      for mention_id in o.q.mention_ids
        emit "mention", mention_id,
          count: 1
        
        emit "mention_to", mention_id, o.id,
          count: 1

    @order: (o, emit)->
      emit "list",
        sort: ["write_at"]
        page_by: 50
      emit "mention", anker
      for mention_id in o.q.mention_ids
        emit "mention_to", mention_id, anker
