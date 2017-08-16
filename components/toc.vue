<script lang="coffee">
{ Query, read_at } = require "~plugins/memory-record"
{ computed } = require "~plugins/book"

format =
  head: new Intl.DateTimeFormat 'ja-JP',
    weekday: "short"
    hour:    "2-digit"
  tail: new Intl.DateTimeFormat 'ja-JP',
    hour:    "2-digit"

module.exports =
  props: ["chats"]
  data: ->
    { read_at }
  methods:
    all_page_idxs: (part_id)->
      last = @chats(part_id).length
      [0 ... last]

    page_label: (part_id, page_id)->
      [ first,..., last ] = @chats(part_id)[page_id]
      begin = format.head.format first.write_at
      write = format.head.format last.write_at
      if begin == write
        begin
      else
        write = format.tail.format @write_at
        begin
        .replace "時", "-" + write
      
    input_part: (part_id)->
      @book =
        part_id: part_id
        page_idxs: [0]

    input_page: (part_id, page_id)->
      @book =
        part_id: part_id
        page_idxs: [page_id]
    tooltip: (line)->
      if 1 < line
        "tooltip-top"
      else
        "tooltip-bottom"
  computed: {
    computed...
    show: ->
      @$store.state.menu.set.toc
  }
</script>

<template lang="pug">
.inframe(v-if="show")
  h6 栞
  .swipe.header
    table
      tbody
        tr(v-for="(o, line) in book.parts.list", :key="o.id")
          th.r.form
            btn(@input="input_part", :value="part_id", :as="o.id")
              | {{o.label}}
              sup {{ chats(o.id).all }}
          td.l.form
            span(v-for="page in all_page_idxs(o.id)", :key="page")
              btn(bool="include" @input="input_page(o.id, page)" @toggle="input_page(o.id, page)", :data-tooltip="page_label(o.id, page)", :value="page_ids", :as="[o.id + '-' + page]", :class="tooltip(line)")
                | {{ page + 1 }}

</template>

<style lang="stylus" scoped>
.header
  padding-left: 20px
.r
  text-align: right
.l
  text-align: left
.c
  text-align: center

</style>
