
<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        check.item(as="current" v-model="menus")
          i.fa.fa-map-pin
        check.item(as="toc" v-model="menus")
          i.fa.fa-film
        check.item(as="potof" v-model="menus")
          i.fa.fa-users
  .summary
    mentions
    toc(:chats="chats", :parts="parts")
    potofs(v-model="hide_potof_ids")
  .center-left
  .center-right

  .contentframe
    .inframe
      report.form( handle="footer" key="finder")
        .center
          span
            btn(v-model="mode", as="memo")
              | メモ
              sup(v-if="part") {{ now.memo.list.all }}
          span
            btn(v-model="mode", as="title")
              | タイトル
              sup(v-if="part") {{ now.title.list.all }}
          span
            btn(v-model="mode", as="full")
              | バレ
              sup(v-if="part") {{ now.full.list.all }}
            btn(v-model="mode", as="normal")
              | 通常
              sup(v-if="part") {{ now.normal.list.all }}
          span
            btn(v-model="mode", as="solo")
              | 独り言
              sup(v-if="part") {{ now.solo.list.all }}
            btn(v-model="mode", as="extra")
              | 非日常
              sup(v-if="part") {{ now.extra.list.all }}
            btn(v-model="mode", as="rest")
              | 墓休み
              sup(v-if="part") {{ now.rest.list.all }}
          span
        .center
          nuxt-link(to="..") ログ

      transition-group.inframe(name="list" tag="div")
        div(v-for="(chats, idx) in chats_pages", :key="idx")
          chat(v-for="o in chats", :id="o.id", :key="o.id")
      report(handle="footer" key="limitup")
        nuxt-link(to="..") ログ

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"

q = new BrowserValue
q.params
  book_id: ""
watch = q.watch (_, key, val)->
watch.mode = ->
  window.scrollTo 0,0
  @page_ids = [0]

module.exports =
  default:
    watch: watch

    data: ->
      q.data @,
        hide_potof_ids: []
        phase_ids: []
        page_ids: []
        menus: []
        chat_id: ""
        part_id: ""
        mode: "full"

    mounted: ->
      @$store.dispatch "sow/story", @book_id
      .then =>
        part = @book.parts.list.first
        @part_id  = part.id
        @page_ids = [0]

    methods:
      xxx: ->

    computed:
      book: ->
        @$store.commit "menu/mode", @menus
        { read_at } = @$store.state.sow
        Query.books.find @book_id

      parts: ->
        @book?.parts.list ? []

</script>
