
<template lang="pug">
.outframe
  .contentframe
    .inframe
      post(handle="SSAY")
        | {{ faces.length }}人を表示しています。
        ul
          li 人気度
          li
            a キャラクター名（詳細へリンク）
          li ♥ いちばん沢山、そのキャラクターで遊んだプレイヤー
  .fullframe
    .btns
    transition-group.list.faces(name="list" tag="div")
      portrate(v-for="chr in faces", :face_id="chr._id.face_id", :key="chr._id.face_id")
        p 登場{{chr.story_ids.length}}回
        nuxt-link(:to="show_url(chr._id.face_id)")
          p {{ chr.face.chr_jobs.list[0].job }}
          p {{ chr.face.name }}
        p ♥{{ sow_auth_id(chr) }}

</template>

<script lang="coffee">
{ Query } = require "~components/models/memory-record"

module.exports =
  default:
    data: ->
      part_id: ""
      self_id: ""
    mounted: ->
      @$store.dispatch "aggregate/faces"

    methods:
      show_url: (face_id)->
        "/summary/faces/" + face_id
      sow_auth_id: (chr)->
        chr.sow_auth._id.sow_auth_id
    computed:
      faces: ->
        @$store.state.aggregate.faces ? []

</script>

<style lang="stylus" scoped>
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

.portrate
  flex-basis: auto

.chrblank
  a
    display: block

</style>

