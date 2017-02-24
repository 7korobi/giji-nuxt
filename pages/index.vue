<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      post(handle="XSAY", :write_at="1169852700003") 祝！人狼議事10周年！
      report(handle="footer" deco="center") みんなの情報
      post(handle="SSAY")
        a(href="https://github.com/7korobi/giji-nuxt/commits/master") 総合トップ
        a(href="https://github.com/7korobi/sow-giji/commits/cabala") ゲーム
        a(href="https://github.com/7korobi/sow-giji/commits/show-fix") ゲーム（新）
        .card 人狼議事を構成するプログラムの、更新履歴はこちら。
      post(handle="SSAY")
        nuxt-link(to="/rule-guide") 人狼議事のルール
        br
        .card 人狼議事を遊ぶとき、従うべきルールはこちら。
      post(handle="VSAY")
        nuxt-link(to="/character-tag") キャラクター一覧表
        br
        .card 人狼議事で遊ぶことができるキャラクターはこちら。

      report(handle="footer" deco="center") 開発者ツール
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo/timeago") 時計 page
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo/books") Demo books
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo/chats") Demo chats
      br
</template>
<script lang="coffee">
module.exports =
  localStorage:
    aaa:
      default: "bbb"
  data: ->
    a: 1
  mounted: ->
    console.log @$storage.aaa = Date.now()
</script>
<style lang="stylus" scoped>
.card
  padding: 10px 0 10px 20px
</style>