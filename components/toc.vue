<script lang="coffee">
{ Query } = require "~plugins/memory-record"

format =
  head: new Intl.DateTimeFormat 'ja-JP',
    weekday: "short"
    hour:    "2-digit"
  tail: new Intl.DateTimeFormat 'ja-JP',
    hour:    "2-digit"

module.exports =
  props: ["chats", "parts"]
  methods:
    pages: (part_id)->
      last = @chats(part_id).list.length
      [0 ... last]

    page_label: (part_id, page_id)->
      [ first,..., last ] = @chats(part_id).list[page_id]
      begin = format.head.format first.write_at
      write = format.head.format last.write_at
      if begin == write
        begin
      else
        write = format.tail.format @write_at
        begin
        .replace "時", "-" + write
      
    input_part: (as)->
      part = Query.parts.find as
      if part
        @$parent.page_ids = [0]
        @$parent.part_id = part.id

    input_page: (part_id, page_ids)->
      @$parent.page_ids = page_ids
      @$parent.part_id = part_id
  
  computed:
    page_keys: ->
      @$parent.page_ids.map (id)=>
        "#{@$parent.part_id}-#{id}"
    toc: ->
      @$store.state.menu.set.toc
</script>

<template lang="pug">
.inframe(v-if="toc")
  h6 栞
  .swipe.header
    table
      tbody
        tr(v-for="(o, line) in parts", :key="o.id")
          th.r.form
            btn(@input="input_part", :value="$parent.part_id", :as="o.id")
              | {{o.label}}
              sup {{ chats(o.id).list.all }}
          td.l.form
            span(v-for="page in pages(o.id)", :key="page")
              btn.tooltip-top(v-if="1 < line" @input="input_page(o.id, [page])" @toggle="input_page(o.id, [page])", :data-tooltip="page_label(o.id, page)", :value="page_keys", :as="[o.id + '-' + page]", bool="include")
                | {{ page + 1 }}
              btn.tooltip-bottom(v-else @input="input_page(o.id, [page])" @toggle="input_page(o.id, [page])", :data-tooltip="page_label(o.id, page)", :value="page_keys", :as="[o.id + '-' + page]", bool="include")
                | {{ page + 1 }}

</template>

<style lang="stylus" scoped>
.r
  text-align: right
.l
  text-align: left
.c
  text-align: center

</style>
