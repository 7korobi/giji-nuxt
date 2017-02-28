{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("potof").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"
  @belongs_to "face"
  @has_many "cards"

  @scope (all)->
    {}

  class @model extends @model
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

      key = { potof_id: @id }
      Collection.card.add @live, key if @live
      Collection.card.add @stat, key if @stat
      Collection.card.add @role, key if @role
      Collection.card.add @gift, key if @gift
      @helps = []
      @cards = [
        @live
        @stat
        @role
        @gift
      ]
      for card in @cards
        for { help } in card.role.ables
          @helps.push help if help

      switch @live?._id
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
