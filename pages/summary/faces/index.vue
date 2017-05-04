
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
      report(handle="header" deco="center")
        tags(v-model="tag_id")
  .fullframe
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
{ Query, Set } = require "~components/models/memory-record"
_ = require "lodash"

module.exports =
  default:
    data: ->
      part_id: ""
      self_id: ""
      order: "story_ids.length"
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
        hash = Query.faces.tag(@tag_id).hash
        _.chain @$store.state.aggregate.faces
        .orderBy @order, "desc"
        .filter (o)->
          o.face && hash[o._id.face_id]
        .value()

</script>

<style lang="stylus" scoped>
.chrblank
  a
    display: block
</style>

