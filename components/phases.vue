<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  default:
    props: ["value", "part_id", "groups"]
    methods:
      tap: (value)->
        @$emit 'input', value

      phase_at: (xk, yk)->
        Query.phases.where(part_id: @part_id, handle: xk, group: yk).list
    computed:
      group_calcs: ->
        list = Query.chats.where(part_id: @part_id, phase_group: @groups).reduce?.phase_group.summary ? []
        for o in list
          o.phases ?= Query.phases.where(part_id: @part_id, group: o.id)
        list
      handle_calcs: ->
        list = Query.chats.where(part_id: @part_id).reduce?.phase_handle.summary ? []
        for o in list
          o.phases ?= Query.phases.where(part_id: @part_id, handle: o.id)
        list

      phases: ->
        Query.phases.where(part_id: @part_id)
      memo: ->
        Query.phases.where(part_id: @part_id, group: ['M'])
      full: ->
        Query.phases.where(part_id: @part_id, group: ['S','A','I'])
      title: ->
        @full.where (o)-> o.handle in ['MAKER', 'ADMIN','dark']
      normal: ->
        @full.where (o)-> o.handle in ['SSAY','VSAY','MAKER','ADMIN','dark']
      extra: ->
        @full.where (o)-> ! (o.handle in ['SSAY','VSAY','MAKER','ADMIN','dark'])

      phases_length: ->
        ids = @phases.pluck('id')
        Query.chats.where( (o)-> o.phase_id in ids ).list.length
      title_length: ->
        ids = @title.pluck('id')
        Query.chats.where( (o)-> o.phase_id in ids ).list.length
      memo_length: ->
        ids = @memo.pluck('id')
        Query.chats.where( (o)-> o.phase_id in ids ).list.length
      full_length: ->
        ids = @full.pluck('id')
        Query.chats.where( (o)-> o.phase_id in ids ).list.length
      normal_length: ->
        ids = @normal.pluck('id')
        Query.chats.where( (o)-> o.phase_id in ids ).list.length
      extra_length: ->
        ids = @extra.pluck('id')
        Query.chats.where( (o)-> o.phase_id in ids ).list.length

</script>

<template lang="pug">
div
  div
    btn(@input="tap", :value="value", :as="title.pluck('id')")
      | タイトル
      sup {{ title_length }}
    btn(@input="tap", :value="value", :as="normal.pluck('id')")
      | 通常
      sup {{ normal_length }}
    btn(@input="tap", :value="value", :as="extra.pluck('id')")
      | 非日常
      sup {{ normal_length }}
    btn(@input="tap", :value="value", :as="full.pluck('id')")
      | ネタバレ
      sup {{ phases_length }}
    btn(@input="tap", :value="value", :as="memo.pluck('id')")
      | メモ
      sup {{ memo_length }}
  table
    thead
      tr
        th
        th(v-for="xo in handle_calcs")
          btn(@input="tap", :value="value", :as="xo.phases.pluck('id')")
            | {{ xo.id }}
            sup {{ xo.length }}
    tbody
      tr(v-for="yo in group_calcs", :key="yo.id")
        th
          btn(@input="tap", :value="value", :as="yo.phases.pluck('id')")
            | {{ yo.id }}
            sup {{ yo.length }}

        td(v-for="xo in handle_calcs")
          check(v-for="o in phase_at(xo.id, yo.id)" @input="tap", :value="value", :as="o.id")
            | {{ o.chats.list.length }}

</template>
