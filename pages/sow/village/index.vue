<template lang="pug">
.outframe
  .contentframe
    transition-group.inframe(name="list" tag="div")
      post.form(handle="btns" key="form")
        span
          btn(as="" @input="reset()")
            i.fa.fa-eraser
          btn(as="vid"             v-model="order" @toggle="submenu")
            | 州
            sup(v-if="folder_id.length") {{ folder_id.length }}
          btn(as="vpl.0"           v-model="order" @toggle="submenu")
            | 人数
            sup(v-if="size.length") {{ size.length }}
          btn(as="timer.updateddt" v-model="order" @toggle="submenu")
            | 日時
            sup(v-if="yeary.length + monthry.length") {{ yeary.length + monthry.length }}
          btn(as="upd_range"       v-model="order" @toggle="submenu")
            | 更新間隔
            sup(v-if="upd_range.length") {{ upd_range.length }}
          btn(as="upd_at"          v-model="order" @toggle="submenu")
            | 更新日時
            sup(v-if="upd_at.length") {{ upd_at.length }}
          btn(as="sow_auth_id"     v-model="order" @toggle="submenu")
            | 村建て人
            sup(v-if="sow_auth_id.length") {{ sow_auth_id.length }}
          btn(as="rating"          v-model="order" @toggle="submenu")
            | レーティング
            sup(v-if="rating.length") {{ rating.length }}
          btn(as="say.CAPTION"     v-model="order" @toggle="submenu")
            | 発言ルール
            sup(v-if="say.length") {{ say.length }}
          btn(as="card.discard"    v-model="order" @toggle="submenu")
            | 破棄役職
            sup(v-if="discard.length") {{ discard.length }}
          btn(as="card.config"     v-model="order" @toggle="submenu")
            | 参加役職
            sup(v-if="config.length") {{ config.length }}
          btn(as="card.event"      v-model="order" @toggle="submenu")
            | イベント
            sup(v-if="event.length") {{ event.length }}
        sub(style="width: 100%")
          | {{ villages_all.list.length }}村があてはまります。

      post.form(v-if="drill" handle="btns" key="subform")
        p(v-if="order === 'vid'")
          check(v-for="o in summary('folder_id')" v-model="folder_id", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'timer.updateddt'")
          check(v-for="o in summary('yeary')" v-model="yeary", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'timer.updateddt'")
          check(v-for="o in summary('monthry')" v-model="monthry", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'upd_range'")
          check(v-for="o in summary('upd_range')" v-model="upd_range", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'upd_at'")
          check(v-for="o in summary('upd_at')" v-model="upd_at", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'sow_auth_id'")
          check(v-for="o in summary('sow_auth_id')" v-model="sow_auth_id", :as="o.id", :key="o.id")
            | {{ o.id }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'rating'")
          check(v-for="o in summary('rating')" v-model="rating", :as="o.id", :key="o.id")
            img(:src="rating_img(o.id)")
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'vpl.0'")
          check(v-for="o in summary('size')" v-model="size", :as="o.id", :key="o.id")
            | {{ o.id }}人
            sup(v-if="1 < o.length") {{ o.length }}

        p(v-if="order === 'card.event'")
          check(v-for="o in summary('event')" v-model="event", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'card.config'")
          check(v-for="o in summary('config')" v-model="config", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.length") {{ o.length }}
        p(v-if="order === 'card.discard'")
          check(v-for="o in summary('discard')" v-model="discard", :as="o.id", :key="o.id")
            | {{ o.label }}
            sup(v-if="1 < o.length") {{ o.length }}

        p(v-if="order === 'say.CAPTION'")
          check(v-for="o in summary('say')" v-model="say", :as="o.id", :key="o.id")
            | {{ o.CAPTION }}
            sup(v-if="1 < o.length") {{ o.length }}

      report(handle="MAKER", v-for="o in villages", :write_at="o.timer.updateddt", :id="o._id", :key="o._id")
        .name
          sup.pull-right {{ o.sow_auth_id }}
          kbd
            img(:src="rating_img(o.rating)")
          a(:href="o.href") {{ o.name }}
        .cards
          table.btns.card
            tbody
              tr
                td(colspan="2") {{ o._id }}
              tr
                th 更新
                td {{ o.upd_range }}毎 {{ o.upd_at }}
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
                 sup(v-if="1 < role.length") {{ role.length }}
            p
              a(v-for="role in roles(o, 'config')", :class="role.win")
               .label
                 | {{ role.label }}
                 sup(v-if="1 < role.length") {{ role.length }}
      report(handle="btns" key="limitup")
        scroll-mine(key="add" v-model="limit", :as="limit_next") {{ limit_next }}件

</template>
<script lang="coffee">
_ = require "lodash"
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"
el = require "~plugins/dom"

q = new BrowserValue
q.query
  order:  "vid"
  folder_id: []
  yeary: []
  monthry: []
  upd_range: []
  upd_at: []
  sow_auth_id: []
  rating: []
  size: []
  say: []
  event: []
  discard: []
  config: []

module.exports =
  watch: q.watch (_, key, val)->
    @limit = 25
    @drill = true

  data: ->
    q.data @,
      mode: "oldlog"
      limit: 25
      asc: "desc"
      drill: false

  mounted: ->
    unless @all.length
      @$store.dispatch "story/oldlog"

  methods:
    reset: ->
      @$router.replace query: {}
      Object.assign @, q.base.query

    rating_img: (rating)->
      "http://s3-ap-northeast-1.amazonaws.com/giji-assets/images/icon/cd_#{rating}.png"

    option_label: (o)->
      Query.options.find(o)?.label || o

    submenu: (as)->
      console.log(as)
      @drill = ! @drill

    summary: (key)->
      @all.reduce?[key]?.summary

    roles: ({ id }, key)->
      @all.where({id}).reduce[key]?.summary ? []

  computed:
    query_in: ->
      obj = {}
      for key in ["event","discard","config"]
        continue unless @[key].length
        obj["card." + key] = @[key]
      obj

    query_where: ->
      obj = {}
      for key in ["folder_id","yeary","monthry","upd_range","upd_at","sow_auth_id","rating","size","say"]
        continue unless @[key].length
        obj["q." + key] = @[key]
      obj

    limit_next: ->
      if @villages_all.list.length < @limit + 10
        @villages_all.list.length
      else
        @limit + 10

    all: ->
      @$store.state.story.read_at
      Query.sow_villages

    villages_all: ->
      @all.in(@query_in).where(@query_where).where({ @mode }).sort(@order, @asc)

    villages: ->
      @villages_all.list[0..@limit]

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
