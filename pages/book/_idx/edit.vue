<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        nuxt-link.item.active(to="full")
          i.fa.fa-map-pin
  .contentframe
    no-ssr
      book-editor(:book="book" :potof="potof" @input="update") 村の設定を更新

</template>
<script lang="coffee">
{ State, Query } = require "~/plugins/memory-record"
{ _id } = require "~/plugins/struct"

module.exports = v =
  mixins: [
    require("~/plugins/get-by-mount") "5s", "book/book", -> @book_id
  ]
  data: ->
    book: undefined
    potof: undefined
  watch:
    "step.books": ->
      @book = Query.books.find(@book_id)
      @potof = Query.potofs.find(@book_id + "-NPC")
  methods:
    update: (data)->
      console.log await @$store.dispatch "book/update", data

_id v, 1, "book"

</script>
