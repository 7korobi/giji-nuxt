<template lang="pug">
.inframe(v-if="show")
  h6 {{ part.label }}の参加者
  .swipe.potofs
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
            btn(v-model="sort" as="say.count", @toggle="reverse") 発言
          th
            btn(v-model="sort" as="say.all", @toggle="reverse") 発言
          th
            btn(v-model="sort" as="give.give", @toggle="reverse") 促
          th
            btn(v-model="sort" as="sign", @toggle="reverse")
              i.fa.fa-user
          th
            btn(v-model="sort" as="request.role_id", @toggle="reverse") 希望
          th
            btn(v-model="sort" as="win", @toggle="reverse") 勝敗
          th
            btn(v-model="sort" as="winner_id", @toggle="reverse") 陣営
          th
            btn(v-model="sort" as="role_labels", @toggle="reverse") 役割
          th
            btn(v-model="sort" as="text", @toggle="reverse") 補足
          th

      transition-group.tlist(name="list" tag="tbody")
        tr(v-for="o in potofs", :key="o.id" v-if="! o.hide")
          th.r(:class="o.live.role_id") {{ o.job }}
          th.l(:class="o.live.role_id") {{ o.face && o.face.name }}
          td.r(:class="o.live.role_id") {{ count("日", o.live.date) }}
          td.c(:class="o.live.role_id") {{ o.live.role.label }}
          td.r(:class="o.live.role_id") {{ count("回", o.say(part.id).count) }}
          td.r(:class="o.live.role_id") {{ count("字", o.say(part.id).all) }}
          td.r(:class="o.live.role_id") {{ count("回", o.give && o.give.give) }}
          td.c(:class="o.live.role_id")
            kbd {{ o.sign }}
          td.c(:class="o.live.role_id")
            kbd(v-if="o.request") {{ o.request.role.label }}
          td.c(:class="o.winner_id") {{ o.win }}
          td.c(:class="o.winner_id") {{ o.winner && o.winner.label }}
          td.c(:class="o.winner_id") {{ o.role_labels.join("、") }}
          td.l(:class="o.winner_id") {{ o.text }}
          td.last
  transition-group.swipe.list(v-if="part" name="list" tag="div")
    table.btns(key="btns")
      tbody
        tr
          td
            btn(v-model="hide_potof_ids", :as="live_on")  参加者
          td
            btn(v-model="hide_potof_ids", :as="live_off") リタイア
        tr
          td
            btn(v-model="hide_potof_ids", :as="full_on")  全表示
          td
            btn(v-model="hide_potof_ids", :as="full_off") クリア

    portrate(v-for="o in potofs", :key="o.face_id", :face_id="o.face_id", :hide="o.hide", @click="toggle(o)")
      .bar(:class="bgc(o)")
</template>


<script lang="coffee">
{ Query, read_at } = require "~plugins/memory-record"
{ computed } = require "~plugins/book"

module.exports =
  data: ->
    sort: "live"
    order: "asc"
    full_mode: true
    live_mode: true
    read_at: read_at

  computed: {
    computed...
    full_on:  ->  @potof_ids -> false
    full_off: ->  @potof_ids -> true
    live_on:  ->  @potof_ids (o)-> ! o.commit
    live_off: ->  @potof_ids (o)-> o.commit

    potofs: ->
      hides = @hide_potof_ids
      if @part
        { list } = Query.potofs.catalog(@book_id, @part_id, @sort, @order)
        for o in list
          o.hide = false
        for id in hides
          Query.potofs.find(id).hide = true
        list
      else
        []

    bgc: ->
      switch @sort
        when "text", "role_labels", "winner_id", "win"
          (o)-> o.winner_id
        else
          (o)-> o.live.role_id

    show: ->
      @part && @$store.state.menu.set.potof

  }
  methods:
    potof_ids: (f)->
      @potofs
      .filter f
      .map (o)-> o.id
      .sort()

    toggle: (o)->
      o.hide = ! o.hide
      @hide_potof_ids = @potof_ids (o)-> o.hide

    reverse: ->
      switch @order
        when "asc"
          @order = "desc"
        when "desc"
          @order = "asc"

    count: (unit, n)->
      switch n
        when 0, undefined, null, Infinity
          " "
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
    max-height:   65px
    height:       65px
  .bar
    height:        3px
    border-radius: 3px
  .btns
    border-radius: 3px
    max-height:   68px
    height:       68px
    span
      white-space: nowrap
</style>

