
<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons
        check.item(as="pin" v-model="menus")
          i.fa.fa-pin
        check.item(as="link" v-model="menus")
          i.fa.fa-film
        check.item(as="potof" v-model="menus")
          i.fa.fa-sitemap
        check.item(as="current" v-model="menus")
          i.fa.fa-user
  .summary
    links
    mentions
    potofs
  .center-left
  .center-right

  .contentframe
    .inframe
      report(handle="footer" deco="center" key="finder")
        p
          btn(v-for="o in parts" v-model="part_id", :as="o.id", :key="o.id")
            | {{o.label}}
            sup {{ o.chats.list.length }}
        phases(v-if="part_id" v-model="phase_ids", :part_id="part_id")
        p(v-for="o in sections")
          btn(v-model="section_id", :as="o.id", :key="o.id")
            | {{o.label}}
            sup {{ o.chats.list.length }}
    transition-group.inframe(name="list" tag="div")
      chat(v-for="o in chats", :id="o.id", :key="o.id")
    .inframe
      report(handle="btns" key="limitup")
        scroll-mine(key="add" v-model="limit", :as="limit_next") {{ limit_next }}件

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
        phase_ids: []
        menus: []
        chat_id: ""
        part_id: ""
        section_id: ""
        limit: 25

    mounted: ->
      @$store.dispatch "sow/story", @book_id
      .then =>
        part = @book.parts.list.first
        @part_id  = part.id
        @phase_ids = part.phases.pluck('id')
        @section_id = @book.sections.list.first.id

    computed:
      book: ->
        @$store.commit "menu/mode", @menus
        { read_at } = @$store.state.sow
        Query.books.find @book_id
      part: ->
        { read_at } = @$store.state.sow
        o = Query.parts.find @part_id
        if o
          @limit = 25
          @phase_ids = o.phases.pluck('id')
          @section_id = o.sections.list.first.id
        o

      section: ->
        { read_at } = @$store.state.sow
        o = Query.sections.find @section_id
        if o
          @limit = 25
        o

      chat: ->
        { read_at } = @$store.state.sow
        Query.chats.find @chat_id

      parts: ->
        @book?.parts.list ? []
      phases: ->
        @part?.phases.list ? []
      sections: ->
        @part?.sections.list ? []
      chats: ->
        @chats_all[0...@limit]
      chats_all: ->
        Query.chats.where(phase_id: @phase_ids).list
      
      limit_next: ->
        { @chat_id } = @$store.state.book
        Math.min @chats_all.length, @limit + 25

</script>