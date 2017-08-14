<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        a.item.active(@click="back")
          i.fa.fa-map-pin
  .summary(name="list" tag="div" key="summary")
    mentions(key="1" @anker="anker")
  .center-left
  .center-right
  .contentframe
    .inframe
      transition-group.inframe(name="list" tag="div")
        div(v-for="(chats, idx) in chat_pages", :key="idx")
          chat(v-for="o in chats" @anker="anker" @focus="focus", :id="o.id", :key="o.id")
</template>
<script lang="coffee">
{ Query, read_at } = require "~plugins/memory-record"
{ computed, mounted } = require "~plugins/book"

module.exports =
  default:
    data: ->
      @chat_id
      { read_at }

    mounted: ->
      @menus = [@menus..., "current"]
      @$store.dispatch "sow/story", @book_id
      .then =>
        mounted.call @

    methods:
      back: ->
        [ idx, mode, pages ] = @$route.query.back.split(",")
        @$router.replace
          path: "../#{@book_id + idx}/#{mode}"
          query: { pages }

      focus: (idx)->
        { name, params, query } = @$route
        params = { params..., idx }
        @$router.replace { name, params, query }
      
      anker: (book_id, a)->
        a = Array.from new Set [a..., @$route.query.a...]
        { name, params, query } = @$route
        query = { query..., a }
        @$router.replace { name, params, query }

    computed: {
      computed...
      chat_pages: ->
        @read_at["book.#{@book_id}"]
        a = Array.from new Set [@$route.query.a...]
        Query.chats.ankers(@book_id, a).list
    }

</script>
