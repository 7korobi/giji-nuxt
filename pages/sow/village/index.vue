<template lang="pug">
.outframe
  .contentframe
    transition-group.inframe(name="list" tag="div")
      post(handle="TSAY" key="form")
        btn(as="vid"             v-model="order" @toggle="submenu") フォルダ
        btn(as="vpl.0"           v-model="order" @toggle="submenu") 人数
        btn(as="timer.updateddt" v-model="order" @toggle="submenu") 日時
        btn(as="sow_auth_id"     v-model="order" @toggle="submenu") 村建て人
        btn(as="rating"          v-model="order" @toggle="submenu") レーティング
        btn(:as="event_length"   v-model="order" @toggle="submenu") イベント種類
      report(handle="MAKER", v-for="o in villages", :write_at="o.timer.updateddt", :id="o._id", :key="o._id")
        .name
          sup.pull-right {{ o.sow_auth_id }}
          kbd
            img(:src="o.rating_img")
          a(:href="o.href") {{ o.name }}
        .cards
          table.btns.card
            tbody
              tr
                td(colspan="2") {{ o._id }}

              tr
                th 更新
                td {{ o.upd.range }}毎 {{ o.upd.at }}
              tr
                th 規模
                td {{ o.vpl[0] }}人　{{ o.type.say }}
              tr
                th ルール
                td
          .card(style="width: 26em")
            p
              a(v-for="option in o.options")
               .label {{ option }}
            p
              a(v-for="role in roles(o, 'event')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="role.suffix") {{ role.suffix }}
            p
              a(v-for="role in roles(o, 'config')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="role.suffix") {{ role.suffix }}
            p
              a(v-for="role in roles(o, 'discard')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="role.suffix") {{ role.suffix }}

</template>
<script lang="coffee">
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"

q = new BrowserValue
q.query
  folder: "all"
  order:  "vid"

module.exports =
  watch: q.watch (_, key, val)->
    switch key
      when "folder"
        @$store.dispatch "story/oldlog", @folder
  data: ->
    q.data @,
      asc: "desc"
      drill: false

  methods:
    event_length: ({id})->
      Query.sow_villages.where({id}).reduce.event?.summary?.length ? 0

    submenu: (as)->
      console.log(as)
      @submenu = ! @submenu

    roles: ({ id }, key)->
      base = Query.sow_villages.where({id}).reduce[key]?.summary ? []
      base.map ({ id,  length })->
        to = Query.roles.find(id)
        if to
          { win, label } = to
        else
          label = id
        suffix = if 1 < length then "x#{length}" else ""

        { label, win, length, suffix }

  computed:
    villages: ->
      @$store.state.story.read_at
      Query.sow_villages.oldlog(@folder).sort(@order, @asc).list

</script>
<style lang="stylus" scoped>
.cards
  display: flex
  flex-direction:  row
  flex-wrap:       wrap
  align-content:   space-around
  align-items:     flex-start
  justify-content: flex-start

.card
  padding: 2px
</style>
