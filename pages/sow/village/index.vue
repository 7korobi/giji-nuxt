<template lang="pug">
.outframe
  .contentframe
    transition-group.inframe(name="list" tag="div")
      post(handle="btns" key="form")
        span
          btn(as="all" v-model="folder") ぜんぶ
        span
          btn(as="vid"             v-model="order" @toggle="submenu") 番号順
          btn(as="vpl.0"           v-model="order" @toggle="submenu") 人数
          btn(as="timer.updateddt" v-model="order" @toggle="submenu") 日時
          btn(as="upd.range"       v-model="order" @toggle="submenu") 更新間隔
          btn(as="upd.at"          v-model="order" @toggle="submenu") 更新日時
          btn(as="sow_auth_id"     v-model="order" @toggle="submenu") 村建て人
          btn(as="rating"          v-model="order" @toggle="submenu") レーティング
          btn(:as="event_length"   v-model="order" @toggle="submenu") イベント種類
      post(handle="btns" key="subform")
        p
          btn(v-for="o in summary('yeary')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('monthry')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('folder_id')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('upd_range')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('upd_at')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('sow_auth_id')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('rating_img')", :key="o.id")
            img(:src="o.id")
            sup {{ o.length }}
        p
          btn(v-for="o in summary('size')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('say')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('event')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('config')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
        p
          btn(v-for="o in summary('discard')", :key="o.id")
            | {{ o.id }}
            sup {{ o.length }}
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
                td {{ o.vpl[0] }}人 {{ o.say.CAPTION }}
              tr
                th ルール
                td
          .card(style="width: 26em")
            p
              a(v-for="option in o.options")
               .label {{ option_label(option) }}
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
      report(handle="btns" key="limitup")
        scroll-mine(key="add" v-model="limit", :as="limit_next") さらに表示 {{ limit_next }}

</template>
<script lang="coffee">
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"
el = require "~plugins/dom"

q = new BrowserValue
q.query
  folder: "all"
  order:  "vid"

module.exports =
  watch: q.watch (_, key, val)->
    switch key
      when "folder"
        unless @villages.length
          @$store.dispatch "story/oldlog"
  data: ->
    q.data @,
      limit: 10
      asc: "desc"
      drill: false

  methods:
    summary: (key)->
      Query.sow_villages.reduce?[key]?.summary
    event_length: ({id})->
      Query.sow_villages.where({id}).reduce.event?.summary?.length ? 0
    option_label: (o)->
      Query.options.find(o)?.label || o

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
    limit_next: ->
      if @villages_all.length < @limit + 10
        @villages_all.length
      else
        @limit + 10

    villages_all: ->
      @$store.state.story.read_at
      @limit = 10
      Query.sow_villages.oldlog(@folder).sort(@order, @asc).list

    villages: ->
      @villages_all[0..@limit]

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
