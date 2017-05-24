
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
          check(v-model="section_ids", :as="o.id", :key="o.id")
            | {{o.label}}
            sup {{ o.chats.list.length }}
            sub {{ o.log_length }}
    transition-group.inframe(name="list" tag="div")
      chat(v-for="o in chats", :id="o.id", :key="o.id")

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
        @phase_ids = part.phases.pluck('id')
        @section_ids = part.sections.pluck('id')[0..0]

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
        Query.chats.where(phase_id: @phase_ids, section_id: @section_ids).list

</script>