<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  default:
    props: ["value", "part_id"]
    methods:
      tap: (value)->
        @$emit 'input', value

      phase_at: (xk, yk)->
        Query.phases.where(part_id: @part_id, handle: xk, group: yk).list.first
    computed:
      groups: ->
        list = Query.chats.where(part_id: @part_id).reduce?.phase_group.summary ? []
        for o in list
          o.phases ?= Query.phases.where(part_id: @part_id, group: o.id)
        list
      handles: ->
        list = Query.chats.where(part_id: @part_id).reduce?.phase_handle.summary ? []
        for o in list
          o.phases ?= Query.phases.where(part_id: @part_id, handle: o.id)
        list

      phases: ->
        Query.phases.where(part_id: @part_id)
</script>

<template lang="pug">
table
  thead
    tr
      th
        btn(@input="tap", :value="value", :as="phases.pluck('id')") 全て
      th(v-for="xo in handles")
        btn(@input="tap", :value="value", :as="xo.phases.pluck('id')")
          | {{ xo.id }}
          sup {{ xo.length }}
  tbody
    tr(v-for="yo in groups", :key="yo.id")
      th
        btn(@input="tap", :value="value", :as="yo.phases.pluck('id')")
          | {{ yo.id }}
          sup {{ yo.length }}

      td(v-for="xo in handles")
        check(v-if="phase_at(xo.id, yo.id)" @input="tap", :value="value", :as="phase_at(xo.id, yo.id).id")
          abbr {{ phase_at(xo.id, yo.id).chats.list.length }}

</template>
