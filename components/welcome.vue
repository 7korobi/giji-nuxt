<script lang="coffee">

{ Query } = require "~components/models/memory-record"
require "~components/models/sow"

file = (path)->
  "http://s3-ap-northeast-1.amazonaws.com/giji-assets" + path

module.exports =
  default:
    props: ["top", "show"]

    data: ->
      export_to: "progress"

    computed:
      welcome_style: ->
        backgroundPosition: "left 50% top #{ @top }px"

    methods:
      vils: (id)->
        max_vils = Query.folders.hash[id].max_vils
        if max_vils && "progress" == @export_to
          "#{max_vils}村:"
        else
          ""

      url: (id)->
        switch @export_to
          when "progress"
            Query.folders.hash[id].href
          when "finish"
            file "/stories/all?folder=#{id}"

    components:
      sow:
        functional: true
        props: ["folder"]
        render: (m, ctx)->
          { folder } = ctx.props
          children = ctx.children ? [ folder.toLowerCase() ]

          vils = ctx.parent.vils folder
          href = ctx.parent.url  folder

          m "p", [
            vils
            if href
              m "a",{ attrs: { href }}, children
            else
              children
          ]

</script>
<template lang="pug">
#welcome(:style="welcome_style")
  table#export(v-if="show")
    thead
      tr
        th.btns ロビー
        th.btns 夢の形
        th.btns 陰謀
        th.btns ＲＰ
    tbody
      tr
        td.links
          sow(folder="LOBBY")
          sow(folder="OFFPARTY")
        td.links
          sow(folder="MORPHE")
          sow(folder="CABALA") cafe
        td.links
          sow(folder="WOLF")
          sow(folder="ULTIMATE")
          sow(folder="ALLSTAR")
        td.links
          sow(folder="RP") role-play
          sow(folder="PRETENSE") RP-advance
          sow(folder="PERJURY")
          sow(folder="XEBEC")
          sow(folder="CRAZY")
          sow(folder="CIEL")
    tfoot
      tr
        th.btns(colspan=4)
          btn(v-model="export_to" as="finish")   終了した村
          btn(v-model="export_to" as="progress") 進行中の村

  h2#title
    a(href="http://giji.check.jp") 人狼議事

  slot
  .filmline
</template>
<style lang="stylus" scoped>
#export
  border-collapse: separate
  border-spacing: 2px
  padding: 30px
  margin:   0px auto

  thead, tfoot
    text-align: center
  th
    background-color: #444
  td
    background-color: black
    vertical-align: top
    padding: 0 3px

#welcome
  background-size:  cover
  background-image: url(../assets/images/bg/fhd-giji.png)
  .btns
    background-color: rgba(77, 78, 70, 0.9)

.filmline
  margin: 0
  height: 11px
  background-repeat: repeat-x
  .contentframe
    background-image: none

.links
  white-space: pre

h2
  height: 100px
  margin:   0
  padding: 25px 0 0 0
  white-space: pre
  font-size: xx-large
  text-align: center
  line-height: 1.1em
  background-color: rgba(92, 92, 32, 0.5)
  sup
    font-size: large
  a
    font-size: xx-large
    line-height: 1.1em
    color: #fff
    &:hover, &:focus
      box-shadow:
        0 0 20px 3px lighten(#fff, 50%) inset
    &:active
      box-shadow:
        0 0 20px 3px lighten(rgba(2,92,32,0.5), 50%) inset

</style>