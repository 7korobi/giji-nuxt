<template lang="pug">
.outframe
  .contentframe
    no-ssr
      book-editor(:book="book" @input="update") 村の設定を更新

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "5s", "book/book", -> @book_id
    require('~/plugins/book')
      loader: true
  ]
  computed:
    test: -> @$refs.editor
    book: ->
      @read_at
      Query.books.find(@book_id)
  methods:
    update: (book)->
      @$store.dispatch "book/update", book

</script>
