{ Collection, Model, Query, Rule } = require "./memory-record"

new Rule("potof").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"
  @belongs_to "face"

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

      switch @live
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
