{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("potof").schema ->
  @order "write_at"
  @path "book", "part"
  @belongs_to "face"
  @has_many "cards"
  @has_many "stats"
  @has_many "roles", by: "ids"
  @has_many "ables", by: "ids"

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
    @deploy: ->
      @id ?= @_id
      @_id = @id

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

      role_id_set = {}
      able_id_set = {}
      for card in @cards.list when card.role
        role_id_set[card.role_id] = true
        switch card.idx
          when "request"
            @[card.idx] = card
            role_id_set[card.role_id] = false
          when "live"
            @[card.idx] = card

        for { _id } in card.role.ables.list
          able_id_set[_id] = true
      @role_ids = Object.keys role_id_set
      @able_ids = Object.keys able_id_set
      @role_labels = @roles.list.map (o)=>
        stat = @stats.hash["#{@_id}-#{o._id}"]
        head = stat?.label ? ""
        "#{head}#{o.label}"

      @commit = @stats.hash["#{@_id}-commit"]
      @give   = @stats.hash["#{@_id}-give"]
      @say    = @find @stats, ["SSAY", "GSAY", "VSSAY"]
      @side   = @find @cards, ["bond", "gift", "role"], (o)=> o.role.win

      if @live
        @live.date ?= Infinity
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

      if @say
        @say.pt ?= Infinity

