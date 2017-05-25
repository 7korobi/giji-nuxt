
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
    toc
    mentions
    potofs
  .center-left
  .center-right

  .contentframe
    .inframe
      report(handle="footer" key="finder")
        phases(v-if="part_id" v-model="phase_ids", :part_id="part_id", :groups="['M']")
        phases(v-if="part_id" v-model="phase_ids", :part_id="part_id", :groups="['S','A','I']")
    report(v-if="1 < section_ids.length" handle="footer" key="small")
      btn(v-model="section_ids", :as="[section_here_id]") {{ section_here.label }} へ巻き取る
    transition-group.inframe(name="list" tag="div")
      chat(v-for="o in chats", :id="o.id", :key="o.id")
    report(handle="footer" key="limitup")
      scroll-mine(v-if="section_next_id" @input="section_add", :as="section_next_id") 次へ
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
        section_ids: []
        phase_ids: []
        menus: []
        chat_id: ""
        part_id: ""

    mounted: ->
      @$store.dispatch "sow/story", @book_id
      .then =>
        part = @book.parts.list.first
        @part_id  = part.id

    methods:
      section_add: (id)->
        @section_ids = [id, @section_ids...]

    computed:
      book: ->
        @$store.commit "menu/mode", @menus
        { read_at } = @$store.state.sow
        Query.books.find @book_id
      part: ->
        { read_at } = @$store.state.sow
        Query.parts.find @part_id

      section_here: ->
        Query.sections.find @section_here_id
      section_here_id: ->
        @section_ids[0]

      part_next_id: ->
        if @chat && @book
          ids = @book.parts.pluck('id')
          idx = ids.indexOf @part_id
          ids[idx + 1]

      section_next_id: ->
        if @chat && @part
          ids = @part.sections.pluck('id')
          idx = ids.indexOf @chat.section_id
          ids[idx + 1]

      chat: ->
        { read_at } = @$store.state.sow
        { @chat_id, @part_id } = @$store.state.book
        Query.chats.find @chat_id

      parts: ->
        @book?.parts.list ? []
      chats: ->
        Query.chats.where(phase_id: @phase_ids, section_id: @section_ids).list ? []
</script>