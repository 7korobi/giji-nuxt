
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
  .currentframe
    hr

  .contentframe
    transition-group.inframe(name="list" tag="div")
      report(handle="footer" deco="center" key="finder")
        p
          nuxt-link(v-for="o in parts", :key="o.id", :to="{query: {part_id: o.id, phase_id: o.phases.list.first.id, section_id: o.sections.list.first.id}}")
            | {{o.label}}
            sup {{ o.chats.list.length }}
        p
          nuxt-link(v-for="o in phases", :key="o.id", :to="{query: {part_id: o.part.id, phase_id: o.id, section_id: o.part.sections.list.first.id}}")
            | {{o.label}}
            sup {{ o.chats.list.length }}
        p
          nuxt-link(v-for="o in sections", :key="o.id", :to="{query: {part_id: o.part.id, phase_id: o.part.phases.list.first.id, section_id: o.id}}")
            | {{o.label}}
            sup {{ o.chats.list.length }}
      chat(v-for="o in chats", :id="o.id", :key="o.id")
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
q.query
  chat_id: ""
  part_id: ""
  phase_id: ""
  section_id: ""
  limit: 25
q.session
  menus: []

module.exports =
  default:
    watch: q.watch (_, key, val)->
      switch key
        when "menus"
          @$store.commit "menu/mode", @menus
    data: ->
      q.data @, {}

    mounted: ->
      @$store.dispatch "sow/story", @book_id
      .then =>
        @part_id  = @book.parts.list.first.id
        @phase_id = @book.phases.list.first.id
        @section_id = @book.sections.list.first.id

    computed:
      book: ->
        { read_at } = @$store.state.sow
        Query.books.find @book_id
      part: ->
        { read_at } = @$store.state.sow
        Query.parts.find @part_id
      phase: ->
        { read_at } = @$store.state.sow
        Query.phases.find @phase_id
      section: ->
        { read_at } = @$store.state.sow
        Query.sections.find @section_id
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
        @phase?.chats.list ? []
      
      limit_next: ->
        { @chat_id } = @$store.state.book
        Math.min @chats_all.length, @limit + 25

</script>