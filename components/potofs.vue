<template lang="pug">
.swipe
  table
    tfoot
      tr.btns
        th(colspan="2")
          sup (スクロールします)
        th
          btn(v-model="sort" as="date", @toggle="reverse") 日程
        th
          btn(v-model="sort" as="live", @toggle="reverse") 状態
        th
          btn(v-model="sort" as="said", @toggle="reverse") 発言
        th
          btn(v-model="sort" as="pt", @toggle="reverse") 残り
        th
          btn(v-model="sort" as="give", @toggle="reverse") 促
        th
          i.fa.fa-user
        th
          btn(v-model="sort" as="req", @toggle="reverse") 希望
        th
          btn(v-model="sort" as="win", @toggle="reverse") 勝敗
        th
          btn(v-model="sort" as="side", @toggle="reverse") 陣営
        th
          btn(v-model="sort" as="role", @toggle="reverse") 役割
        th
          btn(v-model="sort" as="text", @toggle="reverse") 補足
        th

    tbody
      tr(v-for="o in potofs", :key="o._id")
        th.r(:class="o.live") {{ o.job }}
        th.l(:class="o.live") {{ o.face.name }}
        td.r(:class="o.live") {{ count("日", o.date) }}
        td.c(:class="o.live") {{ o.live }}
        td.r(:class="o.live") {{ count("回", o.said) }}
        td.r(:class="o.live") {{ count("回", o.pt) || "∞" }}
        td.r(:class="o.live") {{ count("回", o.give) }}
        td.c(:class="o.live")
          kbd {{ o.sign }}
        td.c(:class="o.live")
          kbd {{ o.req }}
        td.c(:class="o.side") {{ o.win }}
        td.c(:class="o.side") {{ o.side }}
        td.c(:class="o.side") {{ o.role }}
        td.l(:class="o.side") {{ o.text }}
        td.last
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
  computed:
    potofs: ->
      Query.potofs.where(part_id: "demo-0").sort(@sort, @order).list

  methods:
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
</style>

