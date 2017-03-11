
<template lang="pug">
div(v-if="self")
  report(deco="center", :handle="phase.handle")
    span
      btn(v-for="o in parts" v-model="part", :as="o") {{ o.label }}
    span
      btn(v-for="o in phases" v-if="can_phase(o)" v-model="phase", :as="o") {{ o.label }}
    span
      btn(v-for="o in phases" v-model="phase", :as="o") {{ o.label }}

  talk(:sign="self.sign", :face_id="self.face_id" head="発言投稿", :deco="deco", :handle="phase.handle" )
    text-editor(v-model="text", :max-row="10", :max-size="2000")
  post(:sign="self.sign", :face_id="self.face_id" head="ト書き投稿", :deco="deco", :handle="phase.handle" )
    text-editor(v-model="text", :max-size="120")
  report(:sign="self.sign", :face_id="self.face_id" head="レポート投稿", :deco="deco", :handle="phase.handle" )
    text-editor(v-model="text", :max-row="5", :max-size="2000")
</template>

<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "./models/memory-record"
require './models/chat'

module.exports =
  default:
    props: ["self_id"]
    data: ->
      text: ""
      show: "talk"
      deco: "head"
      part:  {}
      phase: { handle: "SSAY" }

    methods:
      can_phase: (phase)->
        Query.stats.find "#{@self_id}-#{phase.handle}"

    computed:
      self: ->
        @$store.state.book.read_at
        Query.potofs.hash[@self_id]
      parts: ->
        @$store.state.book.parts
      phases: ->
        @$store.state.book.phases

</script>