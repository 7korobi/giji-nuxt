{ Model, Query, Rule } = require "~plugins/memory-record"

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
  @path "folder", "book", "part"

  @scope (all)->
    {}

  class @model extends @model
    @deploy: ->
      if o = attrs[@handle]
        Object.assign @, o
