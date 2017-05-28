
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
            sup(v-if="part") {{ now.title.list.length }}
          btn(v-model="mode", as="memo")
            | メモ
            sup(v-if="part") {{ now.memo.list.length }}
        span
          btn(v-model="mode", as="normal")
            | 通常
            sup(v-if="part") {{ now.normal.list.length }}
        span
          btn(v-model="mode", as="solo")
            | 独り言
            sup(v-if="part") {{ now.solo.list.length }}
          btn(v-model="mode", as="extra")
            | 非日常
            sup(v-if="part") {{ now.extra.list.length }}
          btn(v-model="mode", as="rest")
            | 墓休み
            sup(v-if="part") {{ now.rest.list.length }}
        span
          btn(v-model="mode", as="full")
            | バレ
            sup(v-if="part") {{ now.full.list.length }}

      report(v-if="1 < page_ids.length" handle="footer" key="small")
        btn(v-model="page_ids", :as="[page_here_id]") {{ page_here_id + 1 }} page へ巻き取る
      transition-group.inframe(name="list" tag="div")
        chat(v-for="o in chats_here", :id="o.id", :key="o.id")
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
        @page_ids = [id, @page_ids...]

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
        @page_ids[0]

      page_next_id: ->
        if @page_here_id? && @now[@mode].page(50, @page_here_id + 1).list.length
          @page_here_id + 1

      chat: ->
        { read_at } = @$store.state.sow
        { @chat_id, @part_id } = @$store.state.book
        Query.chats.find @chat_id

      parts: ->
        @book?.parts.list ? []

      chats: ->
        @all[@mode]

      chats_here: ->
        @now[@mode]
        .where (o)=> !(o.potof_id in @hide_potof_ids)
        .page 50, @page_ids...
        .list

      all: ->
        full = Query.chats.where("phase.group": ['S','A','I'])

        memo:   Query.chats.where("phase.group": ['M'])
        full:   full
        title:  full.where (o)-> o.phase.handle in ['MAKER', 'ADMIN','dark']
        rest:   full.where (o)-> o.phase.handle in ['GSAY']
        normal: full.where (o)-> o.phase.handle in ['SSAY','VSSAY','MAKER','ADMIN','dark']
        extra:  full.where (o)-> ! (o.phase.handle in ['SSAY','VSSAY','MAKER','ADMIN','dark','GSAY','TSAY'])
        solo:   full.where (o)-> o.phase.handle in ['TSAY']

      now: ->
        if @part
          title:   @all.title.where({@part_id})
          memo:     @all.memo.where({@part_id})
          full:     @all.full.where({@part_id})
          rest:     @all.rest.where({@part_id})
          normal: @all.normal.where({@part_id})
          extra:   @all.extra.where({@part_id})
          solo:     @all.solo.where({@part_id})
        else
          @all

</script>
