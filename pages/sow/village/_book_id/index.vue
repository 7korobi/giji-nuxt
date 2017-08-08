
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
    mentions(@anker="anker")
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
              sup(v-if="part") {{ now.memo(part_id).all }}
          span
            btn(v-model="mode", as="memos")
              i.fa.fa-expand
          span
            btn(v-model="mode", as="title")
              | タイトル
              sup(v-if="part") {{ now.title(part_id).all }}
          span
            btn(v-model="mode", as="full")
              | バレ
              sup(v-if="part") {{ now.full(part_id).all }}
            btn(v-model="mode", as="normal")
              | 通常
              sup(v-if="part") {{ now.normal(part_id).all }}
          span
            btn(v-model="mode", as="solo")
              | 独り言
              sup(v-if="part") {{ now.solo(part_id).all }}
            btn(v-model="mode", as="extra")
              | 非日常
              sup(v-if="part") {{ now.extra(part_id).all }}
            btn(v-model="mode", as="rest")
              | 墓休み
              sup(v-if="part") {{ now.rest(part_id).all }}
          span
        .center
          a(v-if="part_prev_id" @click="part_prev") 前の日へ
          a(v-if="part_next_id" @click="part_next") 次の日へ

      transition-group.inframe(name="list" tag="div" v-for="(chats, idx) in chats_pages", :key="idx")
        chat(v-for="o in chats" @anker.capture="anker", :id="o.id", :key="o.id")
      report(handle="footer" key="limitup")
        scroll-mine(v-if="page_next_id" @input="page_add", :as="page_next_id") 次頁
        .center(v-else)
          a(v-if="part_prev_id" @click="part_prev") 前の日へ
          a(v-if="part_next_id" @click="part_next") 次の日へ

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query, read_at } = require "~plugins/memory-record"
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
        read_at: read_at

    mounted: ->
      @$store.dispatch "sow/story", @book_id
      .then =>
        part = @book.parts.list.first
        @part_id  = part.id
        @page_ids = [0]

    methods:
      anker: (ids)->
        @$router.push
          path: "/ankers"
          query: { ids }

      page_add: (id)->
        @page_ids = [id, @page_ids...].sort (a,b)-> a - b

      part_prev: ->
        window.scrollTo 0,0
        @part_id = @part_prev_id ? @part_id
        @page_ids = [0]

      part_next: ->
        window.scrollTo 0,0
        @part_id = @part_next_id ? @part_id
        @page_ids = [0]

    computed:
      book: ->
        @$store.commit "menu/mode", @menus
        @read_at["sow_story.#{@book_id}"]
        Query.books.find @book_id
      part: ->
        @read_at["sow_story.#{@book_id}"]
        Query.parts.find @part_id

      part_prev_id: ->
        if @part && @book
          ids = @book.parts.pluck('id')
          idx = ids.indexOf @part_id
          ids[idx - 1]

      part_next_id: ->
        if @part && @book
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
        @read_at["sow_story.#{@book_id}"]
        o = @$store.state.book
        @chat_id = o.chat_id
        @part_id = o.part_id
        Query.chats.find @chat_id

      parts: ->
        @book?.parts.list ? []


      now: ->
        Query.chats.now(@hide_potof_ids)

      chats: ->
        @now[@mode]

      chats_here: ->
        @chats(@part_id)

      chats_pages: ->
        @page_ids.map (page)=> @chats_here[page]

</script>
