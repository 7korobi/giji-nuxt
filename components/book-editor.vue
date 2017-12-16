<template lang="pug">
.inframe
  br
  c-post.form(handle="header" deco="giji")
    h4 設定-基本
    hr
    table
      tbody
        tr
          th.r
            label(for="label") 名称
          td(colspan="3")
            input#label(style="width: 97%" v-model="label" placeholder="わかりやすく名前をつけよう！" size="30")
        tr
          th.r
            label(for="players") 参加者
          td(title="参加する人数を指定します。")
            input#players(type="number" min="4" max="50" v-model="chat.player")
            | 名
          th.r
            label(for="update_at") 更新時刻
          td(title="更新が発生する時刻を指定します。")
            input#update_at(style="font-size: 1.8rem" type="time")
        tr
          th.r
            label(for="mobs") 見物人
          td(title="見物する人数を指定します。")
            input#mobs(type="number" min="0" max="20" v-model="chat.mob")
            | 名
          th.r
            label(for="password") 合言葉
          td(title="指定すると、秘密のパスワードを入力した人だけが参加できます。")
            input#password(style="width: 92%" size="20" placeholder="誰でも参加できる")

  c-post.form(handle="public" deco="giji")
    h4 設定-会話
    hr
    table
      tbody
        tr
          th.r
            label 発言制限
          td
            select(v-model="chat.limit")
              option(v-for="say in says", :value="say._id") {{ say.CAPTION }}
          th.r
            label 更新間隔
          td
            span
              btn(v-model="chat.interval", :as="1") 一日
              btn(v-model="chat.interval", :as="2") 二日
              btn(v-model="chat.interval", :as="3") 三日
        tr
          th.r
            label プレイヤー
          td
            check(v-model="option" as="sign_show") ID公開
          th.r
            label 夜
          td
            span
              btn(v-model="chat.night",  :as="0") なし
              btn(v-model="chat.night",  :as="5")  5分
              btn(v-model="chat.night", :as="20") 20分
              btn(v-model="chat.night", :as="60") 60分
        tr
          th.r
            label 仲間との会話
          td(colspan="3")
            span
              check.AIM(v-model="option" as="talk_aim" title="個人的な耳打ちができる。") 内緒話
              check.WSAY(v-model="option" as="talk_secret_grave" title="狼・妖精と死者との間で会話ができる。") 幽界トーク
            span
              check.VSAY(v-model="option" as="talk_mob_grave" title="見物人と死者との間で会話ができる。") 裏方見物人
              check.VSAY(v-model="option" as="talk_mob_alive" title="見物人と生存者、死者との間で会話ができる。") 舞台見物人

  c-post.form(handle="private" deco="giji")
    h4 設定-ゲーム
    hr
    table
      tbody
        tr
          th.r
            label 投票
          td(title="開票の方法を選択します。")
            btn(v-model="game.vote", as="sign") 記名
            btn(v-model="game.vote", as="hide") 匿名
            check(v-model="option" as="vote_entrust") 委任
        tr
          th.r
            label 投票権
          td(title="投票の権利を有する人を選択します。")
            check(v-model="game.vote_by" as="live") 生存者
            check(v-model="game.vote_by" as="mob") 見物人(陪審員)
            check(v-model="game.vote_by" as="grave") 墓下(陪審員)
        tr
          th.r
            label 役職
          td
            check(v-model="option" as="role_select" title="役職希望を募ります。") 希望を募る

  c-talk.form(handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id")
    table
      tbody
        tr
          th.r
            label 最初の犠牲者
          td
            select(v-model="npc.face_id")
              optgroup(v-for="tag in tags" :label="tag.label")
                option(v-for="face in tag.faces.list", :value="face.id") {{ face.name }}{{ face.npc ? " ★" : "" }}
            select(v-model="npc.job")
              option(v-for="job in npc_job_list", :value="job") {{ job }}
    p ★のついた人物は、固有の台詞をもっています。

  c-talk.form(v-if="npc_say" handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id", :log="npc_say[0]")
  c-talk.form(v-if="npc_say" handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id", :log="npc_say[1]")

  c-report.form(handle="SSAY" deco="giji")
    h4 設定-登場人物
    hr
    p.
      #[.btn {{ faces.list.length }}名]から選択できます。
    hr
    span
      check(set v-model="tag_ids", :as="tags_all") {{ tag("all").label }}
      check(set v-model="tag_ids", :as="tags_giji") {{ tag("giji").label }}
      check(set v-model="tag_ids", :as="[]") なし
    span
      check(v-model="tag_ids" as="shoji") {{ tag("shoji").label }}
      check(v-model="tag_ids" as="travel") {{ tag("travel").label }}
      check(v-model="tag_ids" as="stratos") {{ tag("stratos").label }}
      check(v-model="tag_ids" as="myth") {{ tag("myth").label }}
      check(v-model="tag_ids" as="asia") {{ tag("asia").label }}
      check(v-model="tag_ids" as="marchen") {{ tag("marchen").label }}
    span
      check(v-model="tag_ids" as="kid") {{ tag("kid").label }}
      check(v-model="tag_ids" as="young") {{ tag("young").label }}
      check(v-model="tag_ids" as="middle") {{ tag("middle").label }}
      check(v-model="tag_ids" as="elder") {{ tag("elder").label }}
    span
      check(v-model="tag_ids" as="river") {{ tag("river").label }}
      check(v-model="tag_ids" as="road") {{ tag("road").label }}
      check(v-model="tag_ids" as="immoral") {{ tag("immoral").label }}
    span
      check(v-model="tag_ids" as="guild") {{ tag("guild").label }}
      check(v-model="tag_ids" as="elegant") {{ tag("elegant").label }}
      check(v-model="tag_ids" as="ecclesia") {{ tag("ecclesia").label }}
    span
      check(v-model="tag_ids" as="medical") {{ tag("medical").label }}
      check(v-model="tag_ids" as="market") {{ tag("market").label }}
    span
      check(v-model="tag_ids" as="apartment") {{ tag("apartment").label }}
      check(v-model="tag_ids" as="servant") {{ tag("servant").label }}
      check(v-model="tag_ids" as="farm") {{ tag("farm").label }}
      check(v-model="tag_ids" as="government") {{ tag("government").label }}
    span
      check(v-model="tag_ids" as="god") {{ tag("god").label }}

  c-report.form(handle="MAKER" deco="giji")
    h4 カード配分
    hr
    .swipe(v-for="side in sides", :class="side")
      p(style="white-space: nowrap")
        span.btn(v-for="role in roles_by[side].list") {{ role.label }}

  c-report.form(handle="MAKER" deco="giji")
    a.btn(@click="commit")
      slot

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ nation, village } = require "../yaml/rule.yml"
_ = require "lodash"

module.exports =
  data: ->
    label: ""
    npc:
      face_id: null
      job: null
    chat:
      limit: "infinity"
      interval: 1
      night:    5
      player: 4
      mob:    0
    game:
      vote: "sign"
      vote_by: ["live"]
    tag_ids: ["god"]
    option: ["vote_by_live"]
  
  methods:
    commit: ->
      @_events.input[0] { @npc, @maker, @chat, @game, @tag_ids, @option, @label }
    tag: (id)->
      Query.tags.find(id)

  computed:
    faces: -> Query.faces.tag @tag_ids
    npc_face: -> Query.faces.find @npc.face_id
    npc_say: ->
      @npc_face?.npc?.say
    npc_job_list: -> @npc_face?.jobs ? []
    npc_name: ->
      return unless @npc.job in @npc_job_list
      "#{@npc.job} #{@npc_face.name}"
       
    user: -> @$store.state.user
    n_rules: -> nation.list
    says: -> Query.says.active.list
    tags: -> Query.tags.finds @tag_ids
    tags_all: -> Query.tags.leaf.ids
    tags_giji: -> Query.tags.nodes("giji", 1).ids

    sides: ->
      [
        "HUMAN"
        "EVIL"
        "WOLF"
        "PIXI"
        "OTHER"
        "EVENT"
        "BIND"
        "LIVE"
        "SPECIAL"
        "TURN"
      ]
    
    roles_by: -> Mem.Query.roles.reduce.group

</script>

<style lang="stylus" scoped>
th.t
  vertical-align: top
label
  white-space: nowrap
</style>
