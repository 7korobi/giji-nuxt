
{ Set, Model, Query, Rule } = require "~plugins/memory-record"

new Rule("potof").schema ->
  @order "write_at"
  @path "folder", "book", "part"
  @belongs_to "face"
  @belongs_to "winner"
  @has_many "cards"
  @has_many "stats"
  @habtm "roles"
  @habtm "ables"

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
      if @face?
        { job, name } = @face

      @head = [
        @job  || job
        @name || name
      ].join(" ")

      role_id_set = {}
      able_id_set = {}
      for card in @cards.list when card.role
        role_id_set[card.role_id] = true
        switch card.idx
          when "request"
            role_id_set[card.role_id] = false

        for { _id } in card.role.ables.list
          able_id_set[_id] = true
      @role_ids = Object.keys role_id_set
      @able_ids = Object.keys able_id_set

      @role_labels = @roles.list.map (o)=>
        stat = @stats.hash["#{@_id}-#{o._id}"]
        head = stat?.label ? ""
        "#{head}#{o.label}"

      @live    = @cards.hash["#{@_id}-live"]
      @request = @cards.hash["#{@_id}-request"]
      @commit  = @stats.hash["#{@_id}-commit"]
      @give    = @stats.hash["#{@_id}-give"]

      @say = @find @stats, ["SSAY", "GSAY", "VSSAY"]
      @winner_id = @find @cards, ["bond", "gift", "role", "live"], (o)=> o.role.win

      if @live
        @live.date ?= Infinity
        switch @live.role_id
          when "suddendead", "leave"
            @win = ""
          else
            if @book?.winner_id
              if @book.winner_id == @winner_id
                @win = "勝利"
              else
                @win = "敗北"
            else
              @win = "参加"

      if @say
        @say.pt ?= Infinity
