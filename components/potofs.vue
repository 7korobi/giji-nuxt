<template lang="pug">
div
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

      transition-group.tlist(name="list" tag="tbody")
        tr(v-for="o in potofs", :key="o._id" v-if="! o.hide")
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
  transition-group.swipe.list(name="list" tag="div")
    portrate(v-for="o in potofs", :key="o.face_id", :face_id="o.face_id", :hide="o.hide", @click="toggle(o)")
      .bar(:class="o.live")
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
    toggle: (potof)->
      potof.hide = ! potof.hide
      console.log potof
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

.portrate
  flex-basis: auto
</style>

