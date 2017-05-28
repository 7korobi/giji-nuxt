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
      last = Math.floor @chats.where({part_id}).list.length / 50
      [0 .. last]

    page_label: (part_id, page_id)->
      { reduce } = @chats.where({part_id}).page(50, page_id)
      return "" unless reduce?.say

      { max, min } = reduce.say
      begin = format.head.format min
      write = format.head.format max
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
          th.r
            btn(@input="input_part", :value="$parent.part_id", :as="o.id")
              | {{o.label}}
              sup {{ chats.where({part_id: o.id}).list.length }}
          td.l
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
