
<template lang="pug">
.outframe
  .contentframe
    .inframe
      report(handle="footer" deco="center")
        h1 {{ face.name }}の活躍
        .date
          | #[timeago(:since="face.date_min")] ～ #[timeago(:since="face.date_max")]
      talk(handle="TSAY" deco="", :face_id="face.id", :head="face.name")
        | #[b {{ lives.sum }}]人が村にいました。
        .flex
          a.label3(v-for="o in lives", :class="o._id.live")
            .label {{ o.role.label }}
            .count {{ o.story_ids.length }}回
        | 全部で#[b {{ roles.length }}]種類、のべ#[b {{ roles.sum }}]の能力を持ちました。
        .flex
          a.label3(v-for="o in roles", :class="o.role.win")
            .label {{ o.role.label }}
            .count {{ o.story_ids.length }}回


      report(handle="footer")
        table
          thead
            tr.dark
              th 総合値
              th 一番長い発言
              th 総文字数
              th 総発言回数
          tbody.calc(v-for="o in mestypes")
            tr(:class="o.handle", :key="o.handle")
              th {{ o.title }}
              td {{ o.max | currency }} 字
              td {{ o.all | currency }} 字
              td {{ o.count | currency }} 回


      report(handle="footer")
        table
          thead
            tr.dark
              th 平均値
              th /村数
              th 文字数
              th 発言回数
          tbody.calc(v-for="o in mestypes")
            tr(:class="o.handle", :key="o.handle")
              th {{ o.title }}
              td {{ o.per | currency }} 村
              td {{ o.all / o.per | currency }} 字
              td {{ o.count / o.per | currency }} 回

      talk(v-for="folder in folders" handle="VSAY", :face_id="face.id", :head="folder.nation", :key="folder.nation")
        | {{ folder.length }}回登場しました
        .flex
          a.label-mini(v-for="id in folder", :href="log_url(id)") {{ id[1] }}


      report(handle="VGSAY" deco="center", :head="face.name + 'で活躍した人達'")
        btn(as="story_ids.length" v-model="order") 参加村数
        btn(as="count" v-model="order") 総発言回数
        btn(as="all" v-model="order") 総発言文字数
        btn(as="date_min" v-model="order") 古参度
        btn(as="date_max" v-model="order") 新着度
        table
          transition-group.tlist(name="list" tag="tbody")
            tr(v-for="o in sow_auths", :key="o._id.sow_auth_id")
              td
                .sow_auth_id {{ o._id.sow_auth_id }}
              td.r {{ o.story_ids.length }}村
              td.r {{ o.count }}回
              td.r {{ o.all }}文字
              td.timer
                timeago.count(:since="o.date_min")
              td
                .pad ～
              td.timer
                timeago.count(:since="o.date_max")

      report(handle="footer" deco="center")
        nuxt-link(to=".") 戻る

</template>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"
HrefQuery = require "~plugins/href-query"

{ data, watch } = HrefQuery
  order: "story_ids.length"

_ = require "lodash"

module.exports =
  default:
    watch: watch
    data: ->
      data @
    mounted: ->
      { id } = @$route.params
      @$store.dispatch "aggregate/face", id

    filters:
      currency: (num)->
        str = String Math.ceil num
        while str != str = str.replace /^(-?\d+)(\d{3})/, "$1,$2"
          true
        return str

    methods:
      log_url: ([folder, id])->
        "http://s3-ap-northeast-1.amazonaws.com/giji-assets/stories/#{folder}-#{id}"

      label_size: (str)->
        width  = 0.8 * (str.match(/[iIjl]/g) ? []).length
        width += 1.0 * (str.match(/[0-9a-hkm-z]/g) ? []).length
        width += 1.3 * (str.match(/[A-HJ-Z]/g) ? []).length
        width += 2.0 * (str.match(/[^0-9a-zA-Z]/g) ? []).length
        switch
          when width <  6.5
            "label2"
          # when width < 13
          #   "label3"
          when width < 20.5
            "label4"
          # when width < 28
          #   "label5"
          else
            "label6"

    computed:
      id: ->
        @$route.params.id

      roles: ->
        @$store.state.aggregate[@id].roles

      lives: ->
        @$store.state.aggregate[@id].lives

      sow_auths: ->
        asc =
          switch @order
            when "date_min"
              "asc"
            else
              "desc"
        _.orderBy @$store.state.aggregate[@id].sow_auths, @order, asc

      mestypes: ->
        @$store.state.aggregate[@id].mestypes

      folders: ->
        @$store.state.aggregate[@id].folders

      face: ->
        Query.faces.find @id

</script>

<style lang="stylus" scoped>
table
  width: 100%

th,
td
  border-radius: 3px
  padding:   2px 4px

.timer
  white-space: nowrap
  width: 17ex

.r
  white-space: nowrap
  text-align: right

.sow_auth_id
  text-align: center
  margin: 0 -2ex 0 0

.pad
  text-align: left
  font-size: 0.8em
  margin: 0 -4ex 0 -1ex

.chat
  .text
    td.count,
    td .count,
    a  .count
        font-size: 0.8em
        padding: 0

.calc
  td
    font-weight: bold
    text-align:  right

.flex
  align-items:     center
  align-content:   space-around
  justify-content: flex-end
  display: flex
  flex-direction: row
  flex-wrap: wrap

  a
    white-space: nowrap
    display: block
    flex-grow: 0
    .label
      margin: 0 2.5ex 0 0
      text-align: center
      display: block

    .count
      margin: -1.4em -2px -2px -2px
      text-align: right
      display: block

.label-mini
  width: 4ex
  text-align: right
.label2
  width: "calc( %s -  4px )" % 16%
.label3
  width: "calc( %s -  4px )" % 24%
.label4
  width: "calc( %s -  4px )" % 32%
.label5
  width: "calc( %s -  4px )" % 40%
.label6
  width: "calc( %s -  4px )" % 48%

.list
  background: #000
  padding: 2px
  display: flex
  flex-direction:  row
  flex-wrap:       wrap
  align-items:     center
  align-content:   space-around
  justify-content: space-around

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

