<template lang="pug">
.outframe
  .contentframe
    no-ssr
      book-editor(:book="book" :potof="potof" @input="update") 村の設定を更新

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ _id } = require "~/plugins/struct"

module.exports = v =
  mixins: [
    require("~/plugins/get-by-mount") "5s", "book/book", -> @book_id
  ]
  data: ->
    book: undefined
    potof: undefined
  watch:
    read_at: ->
      @book = Query.books.find(@book_id)
      @potof = Query.potofs.find(@book_id + "-NPC")
  methods:
    update: (data)->
      @$store.dispatch "book/update", data

_id v, 1, "book"

</script>
