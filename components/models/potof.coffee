{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("potof").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"
  @belongs_to "face"
  @has_many "cards"
  @has_many "stats"

  @scope (all)->
    {}

  class @model extends @model
    find: (q, keys, cb = (o)-> o )->
      for key in keys
        o = q.hash["#{@_id}-#{key}"]
        continue unless o
        o = cb o
        continue unless o
        return o
    constructor: ->
      @id ?= @_id
      @_id = @id
      [@book_id, part_idx, @idx] = @id.split('-')
      @part_id  = [@book_id, part_idx].join('-')

      if @face?
        { job, name } = @face

      @head = [
        @job  || job
        @name || name
      ].join(" ")

      # for sow
      key = { potof_id: @id }
      Collection.card.add @live, key if @live
      Collection.card.add @stat, key if @stat
      Collection.card.add @role, key if @role
      Collection.card.add @gift, key if @gift

      @role_labels = []
      @helps = []
      for card in @cards.list when card.role
        switch card.idx
          when "live", "request"
            @[card.idx] = card
          else
            stat = @stats.hash["#{@_id}-#{card.role_id}"]
            head = stat?.label ? ""
            @role_labels.push "#{head}#{card.role.label}"
        for { _id, help } in card.role.ables.list when help
          @helps.push help

      @commit = @stats.hash["#{@_id}-commit"]
      @give   = @stats.hash["#{@_id}-give"]
      @say    = @find @stats, ["SSAY", "GSAY", "VSSAY"]
      @side   = @find @cards, ["bond", "gift", "role"], (o)=> o.role.win

      if @live
        @live.date ?= Infinity
        @live.role._id
        @live.role.label
        switch @live.role_id
          when "suddendead", "leave"
            @win = ""
          else
            if @book?.winner?
              if @book.winner == @side
                @win = "勝利"
              else
                @win = "敗北"
            else
              @win = "参加"

      if @request
        @request.role.label
      if @say
        @say.pt ?= Infinity
        @say.said

