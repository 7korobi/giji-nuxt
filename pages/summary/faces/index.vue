
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
      report(handle="header" deco="center")
        btn(as="story_length" v-model="order") 登場回数
        btn(as="fav_count"    v-model="order") 偏愛度
        btn(as="date_max"     v-model="order") 新着度
        btn(as="date_min"     v-model="order") 古参度

  .fullframe
    transition-group.portrates(name="list" tag="div")
      portrate(v-for="face in faces", :face_id="face.id", :key="face.id")
        p(v-if="'story_length' == order")
          | 登場{{face.story_length}}回
        p(v-if="'fav_count' == order")
          | {{face.fav_count}}人/pl
        p(v-if="'date_max' == order")
          timeago(:since="face.date_max")
          | まで
        p(v-if="'date_min' == order")
          timeago(:since="face.date_min")
          | から
        nuxt-link(:to="face.summary_url")
          p {{ face.chr_jobs.list[0].job }}
          p {{ face.name }}
        p ♥{{ face.sow_auth_id }}

  .contentframe
    .inframe
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る

</template>

<script lang="coffee">
{ Query, Set } = require "~plugins/memory-record"
_ = require "lodash"

module.exports =
  default:
    data: ->
      part_id: ""
      self_id: ""
      order: "story_length"
      tag_id:  "all"

    mounted: ->
      @$store.dispatch "aggregate/faces"

    computed:
      faces: ->
        asc =
          switch @order
            when "date_min"
              "asc"
            else
              "desc"
        { read_at } = @$store.state.aggregate
        Query.faces.tag(@tag_id).sort(@order, asc).list

</script>

<style lang="stylus" scoped>
.chrblank
  a
    display: block
</style>

