<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      talk(v-if="profile" handle="VSAY" deco="center", :head="profile.nick", :sign="profile.provider", :write_at="profile.write_at", :img_src="profile.icon")
        a(v-if="profile.mail", :href="'mailto:' + profile.mail") mail
        a(:href="profile.token") token
      report.form(handle="MAKER" deco="giji")
        input(placeholder="わかりやすく名前をつけよう！")
        select
        hr
        text-editor(v-model="maker[0]", :maxSize="500", :maxRow="30")

      post.form(handle="public" deco="giji")
        h4 村のルール
        hr
        text-editor(v-model="maker[1]", :maxSize="500", :maxRow="30")

      post.form(handle="public" deco="giji")
        h4 国のルール
        hr
        ul
          li(v-for="rule in n_rules") {{ rule.head }}

      post.form(handle="public" deco="giji")
        h4 設定-基本
        table
          tbody
            tr
              th.r
                label(for="players") 参加者
              td
                input#players(type="number" min="4" max="50" v-model="size.player")
                | 名
            tr
              th.r
                label(for="mobs") 見物人
              td
                input#mobs(type="number" min="0" max="20" v-model="size.mob")
                | 名
            tr
              th.r
                label(for="update_at") 更新時刻
              td
                input#update_at(type="time")
            tr
              th.r
                label 更新間隔
              td
                span
                  btn(v-model="interval", :as="1") 一日
                  btn(v-model="interval", :as="2") 二日
                  btn(v-model="interval", :as="3") 三日
            tr
              th.r
                label 夜
              td
                span
                  btn(v-model="night",  :as="0") なし
                  btn(v-model="night",  :as="5")  5分
                  btn(v-model="night", :as="20") 20分
                  btn(v-model="night", :as="60") 60分

      post.form(handle="SSAY" deco="giji")
        h4 設定-会話
        table
          tbody
            tr
              th.r
                label(for="password") 合言葉
              td
                span(title="指定すると、秘密のパスワードを入力した人だけが参加できます。")
                  input#password(size="20" placeholder="誰でも参加できる")
            tr
              th.r
                label 発言制限
              td
                select()
            tr
              th.r
                label プレイヤー
              td
                check(v-model="option" as="sign_show") ID公開
            tr
              th.r
                label 仲間との会話
              td
                span
                  check.AIM(v-model="option" as="talk_aim" title="個人的な耳打ちができる。") 内緒話
                  check.WSAY(v-model="option" as="talk_secret_grave" title="狼・妖精と死者との間で会話ができる。") 幽界トーク
                span
                  check.VSAY(v-model="option" as="talk_mob_grave" title="見物人と死者との間で会話ができる。") 裏方見物人
                  check.VSAY(v-model="option" as="talk_mob_alive" title="見物人と生存者、死者との間で会話ができる。") 舞台見物人
            tr
              th.r
                label キャラクター
              td
                | {{ faces.list.length }}名を選択中
            tr
              td(colspan="2")
                span
                  check(set v-model="tags", :as="tags_all") {{ tag("all").label }}
                  check(set v-model="tags", :as="tags_giji") {{ tag("giji").label }}
                  check(set v-model="tags", :as="[]") なし
                span
                  check(v-model="tags" as="shoji") {{ tag("shoji").label }}
                  check(v-model="tags" as="travel") {{ tag("travel").label }}
                  check(v-model="tags" as="stratos") {{ tag("stratos").label }}
                  check(v-model="tags" as="myth") {{ tag("myth").label }}
                  check(v-model="tags" as="asia") {{ tag("asia").label }}
                  check(v-model="tags" as="marchen") {{ tag("marchen").label }}
                span
                  check(v-model="tags" as="kid") {{ tag("kid").label }}
                  check(v-model="tags" as="young") {{ tag("young").label }}
                  check(v-model="tags" as="middle") {{ tag("middle").label }}
                  check(v-model="tags" as="elder") {{ tag("elder").label }}
                span
                  check(v-model="tags" as="river") {{ tag("river").label }}
                  check(v-model="tags" as="road") {{ tag("road").label }}
                  check(v-model="tags" as="immoral") {{ tag("immoral").label }}
                span
                  check(v-model="tags" as="guild") {{ tag("guild").label }}
                  check(v-model="tags" as="elegant") {{ tag("elegant").label }}
                  check(v-model="tags" as="ecclesia") {{ tag("ecclesia").label }}
                span
                  check(v-model="tags" as="medical") {{ tag("medical").label }}
                  check(v-model="tags" as="market") {{ tag("market").label }}
                span
                  check(v-model="tags" as="apartment") {{ tag("apartment").label }}
                  check(v-model="tags" as="servant") {{ tag("servant").label }}
                  check(v-model="tags" as="farm") {{ tag("farm").label }}
                  check(v-model="tags" as="government") {{ tag("government").label }}
                span
                  check(v-model="tags" as="god") {{ tag("god").label }}
            tr
              th.r
                label 最初の犠牲者
              td
                select(v-model="npc.face_id")
                  option(v-for="face in faces.list", :value="face.id") {{ face.name }}
                select(v-model="npc.chr_job_id")
                  option(v-for="npc_job in npc_jobs.list", :value="npc_job.id") {{ npc_job.job }}

      talk.form(handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id")
        text-editor(placeholder="冒頭の発言" v-model="npc.say[0]")

      talk.form(handle="SSAY" deco="giji", :head="npc_name", :face_id="npc.face_id")
        text-editor(placeholder="１日目の発言" v-model="npc.say[1]")


      post.form(handle="private" deco="giji")
        h4 設定-ゲーム
        table
          tbody
            tr
              th.r
                label 投票
              td
                btn(v-model="vote", as="sign") 記名
                btn(v-model="vote", as="hide") 匿名
                check(v-model="option" as="vote_entrust") 委任
            tr
              th.r
                label 投票権
              td
                check(v-model="vote_by" as="live") 生存者
                check(v-model="vote_by" as="mob") 見物陪審員
                check(v-model="vote_by" as="grave") 墓下陪審員
            tr
              th.r
                label 役職
              td
                check(v-model="option" as="role_select") 希望を募る

      report.form(handle="MAKER" deco="giji")
        h4 カード配分

      report.form(handle="MAKER" deco="giji")
        a.btn(@click="create") 新しい村を作成

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ nation, village } = require "../../yaml/rule.yml"
NPC = require "../../yaml/npc.yml"

module.exports =
  data: ->
    v_rules = "（村のルールは、自由に編集できるよ！）\n"
    v_rules += ( "#{idx + 1}. #{head}" for {head}, idx in village.list )
    .join "\n"

    npc:
      face_id: null
      chr_job_id: null
      say: ["", ""]
    size:
      player: 4
      mob:    0
    maker: ["", v_rules, ""]
    interval: 1
    night:    5
    vote: "sign"
    vote_by: ["live"]
    option: ["vote_by_live"]
    tags: ["god"]
  
  methods:
    tag: (id)->
      Query.tags.find(id)
    create: ->
      console.log @
  computed:
    faces: -> Query.faces.tag @tags
    npc_jobs: -> Query.faces.find(@npc.face_id)?.chr_jobs ? []
    npc_name: ->
      return unless npc_job = Query.chr_jobs.find(@npc.chr_job_id)
      "#{npc_job.job} #{npc_job.face.name}"
       
    profile: -> @$store.state.profile
    user:    -> @$store.state.user
    n_rules: -> nation.list
    tags_all: -> Query.tags.ids
    tags_giji: -> Query.tags.nodes("giji", 1).ids

</script>

<style lang="stylus" scoped>
th.t
  vertical-align: top
label
  white-space: nowrap
</style>
