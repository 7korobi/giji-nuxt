{ Set, Model, Query, Rule } = Mem = require "~plugins/memory-record"

monthry = new Intl.DateTimeFormat 'ja-JP',
  year:  "numeric"
  month: "2-digit"

yeary = new Intl.DateTimeFormat 'ja-JP',
  year:  "numeric"

new Rule("sow_roletable").schema ->

new Rule("sow_turn").schema ->
  @order "turn", "asc"
  @belongs_to "village", target: "sow_villages", key: "story_id"

new Rule("sow_village").schema ->
  @has_many "turns", target: "sow_turns", key: "story_id"
  @habtm "option_datas", target: "options", key: "options"
  @belongs_to "say",  target: "says",  key: "q.say"
  @belongs_to "mob",  target: "roles", key: "q.mob"
  @belongs_to "game", target: "games", key: "q.game"

  @scope (all)->
    prologue: all.where(mode: "prologue").sort "timer.nextcommitdt", "desc"
    progress: all.where(mode: "progress").sort "timer.nextcommitdt", "desc"

  Object.assign @model_property,
    event_length:
      get: ->
        Query.sow_villages.where({@id}).reduce.event?.summary?.length ? 0

  class @model extends @model
    @deploy: ->
      { interval, hour, minute } = @upd
      hour   = "0#{hour}"   if hour   < 10
      minute = "0#{minute}" if minute < 10
      updated_at = new Date @timer.updateddt

      @q =
        sow_auth_id: @sow_auth_id
        folder_id: @folder.toUpperCase()
        size: @vpl[0]
        say:  @type.say
        mob:  @type.mob
        game: @type.game
        upd_at: "#{hour}:#{minute}"
        upd_range: "#{interval * 24}h"
        yeary: yeary.format updated_at
        monthry: monthry.format updated_at
        rating: @rating

      @q.rating = "default"  if @rating in [null, 0, "0","null","view"]
      @q.rating = "alert"    if @rating in ["R15","r15","r18"]
      @q.rating = "violence" if @rating in ["gro"]


      list = Query.sow_roletables.find(@type.roletable).role_ids_list?[@q.size]
      @card.config = list if list?.length && ! @card.config.length
      @card.option = @options

      @folder = Query.folders.find @q.folder_id
      if @is_epilogue && @is_finish
        @href = "http://s3-ap-northeast-1.amazonaws.com/giji-assets/stories/#{@_id}"
        @mode = "oldlog"
      else
        if @turns.list.first
          @mode = "progress"
        else
          @mode = "prologue"

    @map_reduce: (o, emit)->
      emit "yeary",
        summary: o.q.yeary
        count: 1
      emit "monthry",
        summary: o.q.monthry
        count: 1
      emit "folder_id",
        summary: o.q.folder_id
        count: 1
      emit "upd_range",
        summary: o.q.upd_range
        count: 1
      emit "upd_at",
        summary: o.q.upd_at
        count:1
      emit "sow_auth_id",
        summary: o.q.sow_auth_id
        count: 1
      emit "rating",
        summary: o.q.rating
        count: 1
      emit "size",
        summary: o.q.size
        count: 1
      emit "say",
        belongs_to: "says"
        summary: o.q.say
        count: 1
      emit "game",
        belongs_to: "games"
        summary: o.q.game
        count: 1
      emit "mob",
        belongs_to: "roles"
        summary: o.q.mob
        count: 1
      for opt_id in o.card.option
        emit "option",
          belongs_to: "options"
          summary: opt_id
          count: 1
      for card_id in o.card.event
        emit "event",
          belongs_to: "roles"
          summary: card_id
          count: 1
      for card_id in o.card.discard
        emit "discard",
          belongs_to: "roles"
          summary: card_id
          count: 1
      for card_id in o.card.config
        emit "config",
          belongs_to: "roles"
          summary: card_id
          count: 1

new Rule("folder").schema ->
  @scope (all)->
    enable: all.where (o)-> ! o.disabled
    host: (hostname)->
      all.where { hostname }

  class @model extends @model
    @deploy: ->
      if o = @config?.cfg
        @rule     = o.RULE
        @title    = o.NAME_HOME
        @max_vils = o.MAX_VILLAGES
        if @max_vils
          @href = @config.cfg.URL_SW + "/sow.cgi"
          [protocol,_, hostname,path_dir...] = @href.split("/")
          @hostname = hostname
          path = "/" + path_dir.join("/")

      switch @folder
        when "LOBBY"
          @max_vils = 0

      return if @disabled = ! path
      @route = { path, name: @_id }

Set.folder.set        require "../yaml/sow_folder.yml"
Set.sow_roletable.set require "../yaml/sow_roletables.yml"

welcome = (h)->
  chats  = {}
  phases = {}
  potofs = {}
  for key, face_id of h
    potofs[key] =
      write_at: 1484445101000
      face_id: face_id
      job:  "ようこそ！"
      name: ""
    phases[key] =
      write_at: 1484445101000
      name: "通常発言"
      handle: "SSAY"
    chats[key + "-1"] =
      write_at: 1169852700003
      potof_id: key
      show: "post"
      style: "plain"
      log: """
  祝！人狼議事１０周年！
"""

  Set.phase.merge phases
  Set.potof.merge potofs
  Set.chat.merge  chats

welcome
  "LOBBY-top-0":   "c20"
  "CIEL-top-0":    "c24"
  "BRAID-top-0":   "c24"
  "PERJURY-top-0": "c25"
  "CABALA-top-0":  "c78"
  "top-top-0":     "t31"

Set.chat.merge
  "LOBBY-top-0-2":
    write_at: 1370662886000
    potof_id: "LOBBY-top-0"
    show: "talk"
    style: "plain"
    log: """
みなさまの助けになるよう、ロビーを用意いたしました。
相談や困りごと、ちょっとした疑問などをお持ちでしたら、どうぞ、ごゆっくりなさいませ。
"""

  "CIEL-top-0-2":
    write_at: 1379511895000
    potof_id: "CIEL-top-0"
    show: "talk"
    style: "plain"
    log: """
<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるよ。
早い者勝ちがよいのだけれど、<a href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD">企画村予定表</a>という便利なページも見てみましょうね。
"""

  "BRAID-top-0-2":
    write_at: 1484445101002
    potof_id: "BRAID-top-0"
    show: "talk"
    style: "plain"
    log: """
こちらのページは<b>（陣営勝利を求めない）完全RP村、勝利追求を含むRP村</b>用に調整してあるよ。
早い者勝ちが原則だけれど、<a href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD" ng-href="{{link.plan}}">企画村予定表</a>という便利なページも見てみよう。

以下がおおざっぱな、他州との相違点なんだ。
<ul>
<li><a href="sow.cgi?cmd=rule#mind">参加者の心構え</a>。ガチとは違うのだよ。ガチとは。
</li><li><a href="http://crazy-crazy.sakura.ne.jp/giji/?(List)SayCnt">発言ptの量</a>。
</li><li>村の説明は4000字まで記述できます。
</li><li>他、細かい調整が入っています。<a href="http://crazy-crazy.sakura.ne.jp/giji/">仕様変更</a>を参考にしましょう。
</li></ul>
"""

  "PERJURY-top-0-2":
    write_at: 1393597313000
    potof_id: "PERJURY-top-0"
    show: "talk"
    style: "plain"
    log: """
<b>勝利を求めないRP村や、勝利も追求するRP村</b>用に、このページは調整してあるのだ。
紳士淑女の諸君には、<a href="http://jsfun525.gamedb.info/wiki/?%B4%EB%B2%E8%C2%BC%CD%BD%C4%EA%C9%BD">企画村予定表</a>を参考に、譲り合いの精神で調整してほしい。
"""

  "CABALA-top-0-2":
    write_at: 1420047938191
    potof_id: "CABALA-top-0"
    show: "talk"
    style: "plain"
    log: """
こちらのページは<b>RP村も、勝負も楽しみたい村</b>用に調整してあるよ。
早い者勝ちが原則だけれど、企画村予定表という便利なページも見てみよう。
もし君がRPに没頭したいなら、専用の州でどっぷり楽しもう。きっとそのほうが楽しめる。
"""
