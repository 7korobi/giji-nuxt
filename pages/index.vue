<template lang="pug">
.outframe
  .contentframe
    .inframe
      br
      br
      post(handle="VSAY")
        nuxt-link(to="/character-tag") キャラクター一覧表
        br
        | 人狼議事で遊ぶことができるキャラクターはこちら。
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/timeago") 時計 page
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo-chats") Demo books
      post(:write_at="Date.now()", handle="SSAY")
        nuxt-link.button(to="/demo-chats") Demo chats
      br
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
