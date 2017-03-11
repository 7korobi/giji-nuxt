{ Collection, Model, Query, Rule } = require "./memory-record"

attrs =
  TITLE: { mark: 'T', label: '表題' }
  SSAY:  { mark:  '', label: '会話' }
  TSAY:  { mark: '-', label: '独言' }
  MAKER: { mark: '#', label: '村建' }
  ADMIN: { mark: '%', label: '管理' }
  VSSAY: { mark: '@', label: '見物' }
  WSAY:  { mark: '*', label: '人狼' }
  GSAY:  { mark: '+', label: '墓下' }
  SPSAY: { mark: '=', label: '共鳴' }
  XSAY:  { mark: '!', label: '念波' }
  VGSAY: { mark: '@', label: '見物' }

new Rule("phase").schema ->
  @order "write_at"
  @belongs_to "book"
  @belongs_to "part"

  @scope (all)->
    {}

  class @model extends @model
    constructor: ->
      @id ?= @_id
      @_id = @id
      [@book_id, part_idx, @idx] = @id.split('-')
      @part_id = [@book_id, part_idx].join('-')
      if o = attrs[@handle]
        Object.assign @, o
