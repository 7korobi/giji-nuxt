{ Model, Query, Rule } = require "./memory-record"


titles =
  SS: ["SSAY", "通常の発言"]
  SA: ["SSAY", "通常ACT"]
  VS: ["VSAY", "見物人発言"]
  VA: ["VSAY", "見物人のACT"]
  TS: ["TSAY", "独り言/内緒話"]
  TA: ["TSAY", "栞"]
  GS: ["GSAY", "墓下の発言"]
  GA: ["GSAY", "墓下のACT"]
  PS: ["SPSAY", "共鳴の会話"]
  PA: ["SPSAY", "共鳴のACT"]
  WS: ["WSAY", "人狼のささやき"]
  WA: ["WSAY", "人狼のACT"]
  XS: ["XSAY", "念話（念波の民）"]
  XA: ["XSAY", "念act（念波の民）"]
  BS: ["BSAY", "念話（蝙蝠人間）"]
  BA: ["BSAY", "念act（蝙蝠人間）"]


Rule.filter "aggregate", (_id)->
  @list "sow_auths", "#{_id}.sow_auths", ->
    @order "story_ids.length", "desc"
    @key_by "_id.face_id"
    @belongs_to "face", key: '_id.face_id', target: "#{_id}.faces"

  @list "mestypes", "#{_id}.mestypes", ->
    @key_by "_id.mestype"
    class @set extends @set
      @summary: "all", ({all})->
        handle: "dark"
        title: "－合計－"
        all:   all.all
        count: all.count
        max:   all.max
        per: state[_id].face.story_ids.length

    class @model extends @model
      @map_reduce: (o, emit)-> emit "all", o
      @deploy: ->
        [@handle, @title] = titles[@id]
        @per = @story_ids.length

  @list "roles", "#{_id}.roles", ->
    @order "story_ids.length", "desc"
    @belongs_to "role", key: '_id.role_id', miss: 'mob'
    class @model extends @model
      @map_reduce: (o, emit)->
        emit "all",
          count: story_ids.length
      @deploy: ->
        @role_id = @_id.role_id

  @list "lives", "#{_id}.lives", ->
    @order "story_ids.length", "desc"
    @belongs_to "role", key: '_id.live', miss: 'mob'
    class @model extends @model
      @map_reduce: (o, emit)->
        return if o._id.live == "leave"
        emit "all",
          count: story_ids.length
      @deploy: ->
        @role_id = @_id.live

  @list "faces", "#{_id}.faces", ->
    @key_by "_id.face_id"
    @belongs_to "sow_auth", key: '_id.face_id', target: "sow_auths"
    class @model extends @model
      @map_reduce: (o, emit)->
        emit "all",
          count: story_ids.length
      @deploy: ->
        @role_id = @_id.role_id

  @list "faces.0.story_ids", "#{_id}.folders", ->
    @group
      as: ->
        [folder, vid] = @split "-"
        [folder.toUpperCase(), vid - 0]
      by: "0"
      order: "1"
    @key_by (o)-> o
    @order (o)-> - o.length
    class @model extends @model
      @deploy: ->
        key = Query.folders.hash[@[0]].nation

  @as "faces.0", "#{_id}.face"


