<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        a.item.active(@click="back")
          i.fa.fa-map-pin
  .summary
    mentions(@anker="anker")
  .center-left
  .center-right
  .contentframe
    .inframe
      transition-group.inframe(name="list" tag="div")
        div(v-for="(chats, idx) in chat_pages.list", :key="idx")
          chat(v-for="o in chats" @anker.capture="anker", :id="o.id", :key="o.id")
</template>
<script lang="coffee">
{ Query, read_at } = require "~plugins/memory-record"

module.exports =
  default:
    data: ->
      menus: []

    methods:
      back: ->
        { ids } = @$route.query
        chat = Query.chats.find(ids[0])
        console.log chat.book_id, chat.part_id, chat.id
      
      anker: (ids)->
        set = {}
        for id in ids
          set[id] = true
        for id in @$route.query.ids
          set[id] = true
        ids = Object.keys set
        @$router.push
          path: "/ankers"
          query: { ids }

    computed:
      chat_pages: ->
        { ids } = @$route.query
        Query.chats.ankers(ids)

</script>
