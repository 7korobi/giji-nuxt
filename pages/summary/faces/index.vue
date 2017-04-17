
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
    tags(v-model="tag_id")
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="chr in faces", :face_id="chr._id.face_id", :key="chr._id.face_id")
        p 登場{{chr.story_ids.length}}回
        nuxt-link(:to="show_url(chr._id.face_id)")
          p {{ chr.face.chr_jobs.list[0].job }}
          p {{ chr.face.name }}
        p ♥{{ sow_auth_id(chr) }}

  .contentframe
    .inframe
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る

</template>

<script lang="coffee">
{ Query } = require "~components/models/memory-record"

module.exports =
  default:
    data: ->
      part_id: ""
      self_id: ""
      tag_id:  "all"
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
.chrblank
  a
    display: block
</style>

