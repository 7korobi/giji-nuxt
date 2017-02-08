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
      [book_id, part_idx] = @id.split('-')
      @_id = @id
      @part_id  = [book_id, part_idx].join('-')

      switch @live
        when "suddendead", "leave"
          @win = ""
        else
          @win = "参加"

