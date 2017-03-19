
<template lang="pug">
.outframe
  .contentframe
    .inframe
      report(handle="footer" deco="center")
        h1 {{ name }}の活躍
        .date
          | #[timeago(:since="face.date_min")] ～ #[timeago(:since="face.date_max")]
      talk(handle="SSAY" deco="", :face_id="face_id", :head="name")
        | 全部で#[b {{ all.length }}]の役職になりました。
      report(handle="footer")
        table
          thead
            tr.dark
              th 総合値
              th 一番長い発言
              th 総文字数
              th 総発言回数
          tbody(v-for="title, key in keys")
            tr(:class="key", :key="key")
              th {{ title }}
              td {{ 1234 | currency }} 字
              td {{ 1 | currency }} 字
              td {{ 1 | currency }} 回


      report(handle="footer")
        table
          thead
            tr.dark
              th 平均値
              th /村数
              th 文字数
              th 発言回数
          tbody(v-for="title, key in keys")
            tr(:class="key", :key="key")
              th {{ title }}
              td {{ 1 | currency }} 村
              td {{ 1 | currency }} 字
              td {{ 1 | currency }} 回

      talk(v-for="folder in folder_keys" handle="VSAY", :face_id="face_id", :head="folder_head(folder)")
        .flex
          a.label-mini(v-for="id in ids(folder)", :href="log_url(folder, id)") {{ id }}


      report(handle="VGSAY", :head="name")
        .flex
          a(v-for="o in sow_auths", :class="label_size(o.sow_auth_id)")
            .label {{ o.sow_auth_id }}
            .count {{ o.story_ids.length }}回



</template>

<script lang="coffee">
{ Query } = require "~components/models/memory-record"

_ = require "lodash"

module.exports =
  default:
    data: ->
      part_id: ""
      self_id: ""
    mounted: ->
      { id } = @$route.params
      @$store.dispatch "aggregate/face", id

    filters:
      currency: (num)->
        str = String(num)
        while str != str = str.replace /^(-?\d+)(\d{3})/, "$1,$2"
          true
        return str

    methods:
      ids: (folder)->
        @folders[folder]
      log_url: (folder, id)->
        "http://s3-ap-northeast-1.amazonaws.com/giji-assets/stories/#{folder}-#{id}"
      folder_head: (folder)->
        "#{ folder } #{ @ids(folder).length }回登場しました"

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
      all: ->
        @face.story_ids ? []
      folder_keys: ->
        keys = Object.keys @folders
        _.sortBy keys, (key)=> - @folders[key]?.length ? 0

      folders: ->
        obj = {}
        for key in @all
          [folder, id] = key.split("-")
          obj[folder] ?= []
          obj[folder].push id
        for key, ids of obj
          obj[key] = _.sortBy ids, (o)->  o - 0
        obj

      sow_auths: ->
        @$store.state.aggregate.read_at
        @$store.state.aggregate.sow_auths

      keys: ->
        @$store.state.aggregate.mestypes

      name: ->
        @face.face?.name
      face_id: ->
        @face._id?.face_id
      face: ->
        console.log @$store.state.aggregate
        @$store.state.aggregate.face

</script>

<style lang="stylus" scoped>
table
  width: 100%

th,
td
  border-radius: 3px
  padding:   2px 4px

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
      font-size: 0.8em
      margin:   -1.4em -2px -2px -2px
      padding: 0
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

