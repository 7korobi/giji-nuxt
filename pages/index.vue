<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      c-post(handle="XSAY", :write_at="1169852700003") 祝！人狼議事10周年！
      c-report(handle="footer" deco="center" v-if="user_url") ロビー
      c-post.form(handle="TSAY" v-if="user_url")
        nuxt-link(:to="user_url") あなたの情報
      c-report(handle="footer" deco="center") みんなの情報
      c-post.form(handle="SSAY")
        a(href="https://github.com/7korobi/giji-nuxt/commits/master") 総合トップ
        a(href="https://github.com/7korobi/sow-giji/commits/cabala") ゲーム
        a(href="https://github.com/7korobi/sow-giji/commits/show-fix") ゲーム（新）
        .card 人狼議事を構成するプログラムの、更新履歴はこちら。
      c-post.form(handle="SSAY")
        nuxt-link(to="/rule-guide") 人狼議事のルール
        br
        .card 人狼議事を遊ぶとき、従うべきルールはこちら。
      c-post.form(handle="VSAY")
        nuxt-link(to="/character-tag") キャラクター一覧表
        br
        .card 人狼議事で遊ぶことができるキャラクターはこちら。

      c-post.form(handle="VSAY")
        nuxt-link(to="/summary/faces") キャラクター活躍記録
        br
        .card どこかの村で活躍したことのあるキャラクターはこちら。

      c-report(handle="footer" deco="center") 開始待ちの村／進行中の村
      c-post(handle="EVIL", v-for="o in progress", :head="o.name", :key="o._id")
        a(:href="o.folder.href") {{ o.folder.nation }}{{ o.vid }}
        | は、進行中だ。
        .date
          timeago(:since="o.timer.nextcommitdt")
      c-post(handle="MOB",  v-for="o in prologue", :head="o.name", :key="o._id")
        a(:href="o.folder.href") {{ o.folder.nation }}{{ o.vid }}
        | は、開始が楽しみだ。
        .date
          timeago(:since="o.timer.nextcommitdt")

      c-report(handle="footer" deco="center")
        nuxt-link(to="/demo") 開発者用ページ
</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "1h", "story/progress"
  ]
  computed:
    passport: ->
      @$store.state.passport
    user_url: ->
      return null unless @passport
      { provider, account } = @passport
      provider && account && "user/#{provider}-#{account}"
    prologue: ->
      @read_at
      Query.sow_villages.prologue.list
    progress: ->
      @read_at
      Query.sow_villages.progress.list

</script>
<style lang="stylus" scoped>
.card
  padding: 10px 0 10px 20px
</style>
