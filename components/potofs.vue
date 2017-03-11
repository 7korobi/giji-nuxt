<template lang="pug">
div
  .swipe
    table
      tfoot
        tr.btns
          th(colspan="2")
            sup (スクロールします)
          th
            btn(v-model="sort" as="live.date", @toggle="reverse") 日程
          th
            btn(v-model="sort" as="live.role_id", @toggle="reverse") 状態
          th
            btn(v-model="sort" as="say.said", @toggle="reverse") 発言
          th
            btn(v-model="sort" as="say.pt", @toggle="reverse") 残り
          th
            btn(v-model="sort" as="give.give", @toggle="reverse") 促
          th
            i.fa.fa-user
          th
            btn(v-model="sort" as="request.role_id", @toggle="reverse") 希望
          th
            btn(v-model="sort" as="win", @toggle="reverse") 勝敗
          th
            btn(v-model="sort" as="side", @toggle="reverse") 陣営
          th
            btn(v-model="sort" as="role_labels", @toggle="reverse") 役割
          th
            btn(v-model="sort" as="text", @toggle="reverse") 補足
          th

      transition-group.tlist(name="list" tag="tbody")
        tr(v-for="o in potofs", :key="o._id" v-if="! o.hide")
          th.r(:class="o.live.role_id") {{ o.job }}
          th.l(:class="o.live.role_id") {{ o.face.name }}
          td.r(:class="o.live.role_id") {{ count("日", o.live.date) }}
          td.c(:class="o.live.role_id") {{ o.live.role.label }}
          td.r(:class="o.live.role_id") {{ count("回", o.say.said) }}
          td.r(:class="o.live.role_id") {{ count("回", o.say.pt) || "∞" }}
          td.r(:class="o.live.role_id") {{ count("回", o.give.give) }}
          td.c(:class="o.live.role_id")
            kbd {{ o.sign }}
          td.c(:class="o.live.role_id")
            kbd {{ o.request.role.label }}
          td.c(:class="o.side") {{ o.win }}
          td.c(:class="o.side") {{ o.side }}
          td.c(:class="o.side") {{ o.role_labels.join("、") }}
          td.l(:class="o.side") {{ o.text }}
          td.last
  transition-group.swipe.list(name="list" tag="div")
    table.btns(key="btns")
      tbody
        tr
          td
            btn(v-model="hide_ids", :as="live_on")  参加者
          td
            btn(v-model="hide_ids", :as="live_off") リタイア
        tr
          td
            btn(v-model="hide_ids", :as="full_on")  全表示
          td
            btn(v-model="hide_ids", :as="full_off") クリア

    portrate(v-for="o in potofs", :key="o.face_id", :face_id="o.face_id", :hide="o.hide", @click="toggle(o)")
      .bar(:class="bgc(o)")
</template>


<script lang="coffee">
require "./models/part"
require "./models/phase"
require "./models/potof"
require "./models/chat"
{ Query } = require "./models/memory-record"

module.exports =
  data: ->
    sort: "live"
    order: "asc"
    full_mode: true
    live_mode: true
    hide_ids: []
  watch:
    hide_ids: ->
      for o in @potofs
        o.hide = false
      for id in @hide_ids
        Query.potofs.hash[id].hide = true
  computed:
    full_on:  ->  @potof_ids -> false
    full_off: ->  @potof_ids -> true
    live_on:  ->  @potof_ids (o)-> ! o.commit
    live_off: ->  @potof_ids (o)-> o.commit

    potofs: ->
      Query.potofs.where(part_id: "demo-0").sort(@sort, @order).list
    bgc: ->
      switch @sort
        when "text", "role_labels", "side", "win"
          (o)-> o.side
        else
          (o)-> o.live.role_id

  methods:
    potof_ids: (f)->
      @potofs
      .filter f
      .map (o)-> o._id

    toggle: (o)->
      o.hide = ! o.hide
      @hide_ids = @potofs
      .filter (o)-> o.hide
      .map (o)-> o._id

    reverse: ->
      switch @order
        when "asc"
          @order = "desc"
        when "desc"
          @order = "asc"
    count: (unit, n)->
      switch n
        when 0, Infinity
          ""
        else
          "#{n}#{unit}"

</script>
<style lang="stylus" scoped>
.r
  text-align: right
.l
  text-align: left
.c
  text-align: center
.last
  min-width: 1000px

.portrate
  flex-basis: auto

.list
  background: #000
  padding: 2px
  display: flex
  flex-direction:  row
  flex-wrap:       nowrap
  align-items:     center
  align-content:   space-around
  justify-content: flex-start
  min-width: 100%
  img
    max-height: 65px
    height: 65px
  .bar
    height: 3px
  .btns
    border-radius: 3px
    max-height:   68px
    height:       68px
    span
      white-space: nowrap


.list-move
  transition: transform 0.3s

.list-enter-to
  transition: all 0.2s ease 0.1s

.list-leave-to
  position: absolute

.list-enter,
.list-leave-to
  opacity: 0
  transform: translateY(30px)
</style>

