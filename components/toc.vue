<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  methods:
    input_part: (as)->
      part = Query.parts.find as
      if part
        ids = part.sections.pluck('id')
        @$parent.section_ids = [ids[0]]
        @$parent.part_id = part.id

    input_section: (as)->
      section = Query.sections.find as[0]
      if section
        @$parent.section_ids = as
        @$parent.part_id = section.part_id
  computed:
    toc: ->
      @$store.state.menu.set.toc
      true
</script>

<template lang="pug">
.inframe(v-if="toc")
  h6 栞
  .swipe.header
    table
      tbody
        tr(v-for="o in $parent.parts", :key="o.id")
          th.r
            btn(@input="input_part", :value="$parent.part_id", :as="o.id")
              | {{o.label}}
              sup {{ o.chats.list.length }}
          td.l
            span(v-for="(oo, idx) in o.sections.list", :key="oo.id")
              btn(@input="input_section" @toggle="input_section", :title="oo.label", :value="$parent.section_ids", :as="[oo.id]", bool="include")
                | {{ idx + 1 }}

</template>

<style lang="stylus" scoped>
.r
  text-align: right
.l
  text-align: left
.c
  text-align: center

</style>
