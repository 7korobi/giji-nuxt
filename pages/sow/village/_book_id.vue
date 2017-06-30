
<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons
        check.item(as="pin" v-model="menus")
          i.fa.fa-pin
        check.item(as="toc" v-model="menus")
          i.fa.fa-film
        check.item(as="potof" v-model="menus")
          i.fa.fa-sitemap
        check.item(as="current" v-model="menus")
          i.fa.fa-user
  .summary
    toc(:chats="chats", :parts="parts")
    mentions
    potofs(v-model="hide_potof_ids")
  .center-left
  .center-right

  .contentframe
    .inframe
      report(handle="footer" key="finder")
        span
          btn(v-model="mode", as="title")
            | タイトル
            sup(v-if="part") {{ now.title.list.all }}
          btn(v-model="mode", as="memo")
            | メモ
            sup(v-if="part") {{ now.memo.list.all }}
        span
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
          btn(v-model="mode", as="full")
            | バレ
            sup(v-if="part") {{ now.full.list.all }}

      report(v-if="1 < page_ids.length" handle="footer" key="small")
        btn(v-model="page_ids", :as="[page_here_id]") {{ page_here_id + 1 }} page へ巻き取る
      transition-group.inframe(name="list" tag="div")
        div(v-for="(chats, idx) in chats_pages", :key="idx")
          chat(v-for="o in chats", :id="o.id", :key="o.id")
      report(handle="footer" key="limitup")
        scroll-mine(v-if="page_next_id" @input="page_add", :as="page_next_id") 次へ
        btn(v-else v-model="part_id", :as="part_next_id") 次の日へ

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"

q = new BrowserValue
q.params
  book_id: ""

module.exports =
  default:
    watch: q.watch (_, key, val)->

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
      page_add: (id)->
        @page_ids = [id, @page_ids...].sort()

    computed:
      book: ->
        @$store.commit "menu/mode", @menus
        { read_at } = @$store.state.sow
        Query.books.find @book_id
      part: ->
        { read_at } = @$store.state.sow
        Query.parts.find @part_id

      part_next_id: ->
        if @chat && @book
          ids = @book.parts.pluck('id')
          idx = ids.indexOf @part_id
          ids[idx + 1]

      page_here_id: ->
        [..., last] = @page_ids
        last

      page_next_id: ->
        if @page_here_id? && @page_here_id + 1 < @chats_here.length
          @page_here_id + 1

      chat: ->
        { read_at } = @$store.state.sow
        { @chat_id, @part_id } = @$store.state.book
        Query.chats.find @chat_id

      parts: ->
        @book?.parts.list ? []

      chats: ->
        Query.chats.parts @hide_potof_ids, @mode

      chats_here: ->
        @now[@mode].list

      chats_pages: ->
        @page_ids.map (page)=> @chats_here[page]

      all: ->
        Query.chats

      now: ->
        if @part
          title:  @all.pages @hide_potof_ids, 'title',  @part_id
          memo:   @all.pages @hide_potof_ids, 'memo',   @part_id
          full:   @all.pages @hide_potof_ids, 'full',   @part_id
          rest:   @all.pages @hide_potof_ids, 'rest',   @part_id
          normal: @all.pages @hide_potof_ids, 'normal', @part_id
          extra:  @all.pages @hide_potof_ids, 'extra',  @part_id
          solo:   @all.pages @hide_potof_ids, 'solo',   @part_id
        else
          @all

</script>
