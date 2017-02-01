{ Collection, Model, Query, Rule } = require "memory-record"

require '~components/models/phase'
require '~components/models/potof'
require '~components/models/chat'


new Rule("folder").schema ->
  @scope (all)->
    enable: all.where (o)-> ! o.disabled
    host: (hostname)->
      all.where { hostname }

  class @model extends @model
    constructor: ->
      if o = @config?.cfg
        @rule     = o.RULE
        @title    = o.NAME_HOME
        @max_vils = o.MAX_VILLAGES
        if @max_vils
          @href = @config.cfg.URL_SW + "/sow.cgi"
          [protocol, _, @hostname,path_dir...] = @href.split("/")
          path = "/" + path_dir.join("/")

      switch @folder
        when "LOBBY"
          @max_vils = 0

      return if @disabled = ! path
      @route = { path, name: @_id }

Collection.folder.set  require "~components/yaml/sow_folder.yml"


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

  Collection.phase.set phases
  Collection.potof.set potofs
  Collection.chat.set  chats

welcome
  "LOBBY-top-0":   "c20"
  "CIEL-top-0":    "c24"
  "BRAID-top-0":   "c24"
  "PERJURY-top-0": "c25"
  "CABALA-top-0":  "c78"
  "top-top-0":     "t31"

Collection.chat.merge
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
