
<template lang="pug">
.outframe
  .summary
    .inframe
      h6
        | 参照されている
        i.fa.fa-pin

      h6
        | よく見ていた
        i.fa.fa-pin
      h6 一日目の参加者
    .inframe.hover
      potofs()

  .contentframe
    transition-group.inframe(name="list" tag="div")
      report(handle="footer" deco="center" key="finder")
        p
          nuxt-link(to="/") 戻る
        p
          nuxt-link(v-for="o in parts", :to="{query: {part_id: o.id, phase_id: o.phases.list.first.id, section_id: o.sections.list.first.id}}")
            | {{o.label}}
            sup {{ o.chats.list.length }}
        p
          nuxt-link(v-for="o in phases", :to="{query: {part_id: o.part.id, phase_id: o.id, section_id: o.part.sections.list.first.id}}")
            | {{o.label}}
            sup {{ o.chats.list.length }}
        p
          nuxt-link(v-for="o in sections", :to="{query: {part_id: o.part.id, phase_id: o.part.phases.list.first.id, section_id: o.id}}")
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


module.exports =
  default:
    watch: q.watch ->
    data: ->
      q.data @,
        limit: 25

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

      parts: ->
        @book?.parts.list ? []
      phases: ->
        @part?.phases.list ? []
      sections: ->
        @part?.sections.list ? []
      chats: ->
        @chats_all[0...@limit]
      chats_all: ->
        { @chat_id } = @$store.state.book
        @phase?.chats.list ? []
      
      limit_next: ->
        Math.min @chats_all.length, @limit + 25

</script>