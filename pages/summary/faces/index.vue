
<template lang="pug">
.outframe
  .summary
    .inframe
      br
  chrs
</template>

<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "~components/models/memory-record"

module.exports =
  default:
    data: ->
      part_id: ""
      self_id: ""
    mounted: ->
      @$store.dispatch "aggregate/faces"

    computed:
      chats: ->
        @$store.state.book.read_at
        @$store.state.book.chats

</script>