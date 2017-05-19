
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
    .inframe
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
      chat(v-for="o in chats", :id="o._id", :key="o._id")

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

module.exports =
  default:
    watch: q.watch ->
    data: ->
      q.data @

    mounted: ->
      @$store.dispatch "sow/story", @book_id
      .then =>
        { id } = Query.parts.where({ @book_id }).list.last
        @part_id = id

    computed:
      chats: ->
        { @chat_id } = @$store.state.book
        { read_at } = @$store.state.sow
        Query.sow_villages.where({ @book_id }).list
        Query.sow_turns.where({ @book_id }).list
        Query.potofs.where({ @book_id }).list
        Query.chats.where({ @book_id }).list

</script>