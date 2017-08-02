<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  default:
    props: ["top", "show"]

    data: ->
      export_to: "progress"

    computed:
      root_path: ->
        env.WEB_URL
      welcome_style: ->
        backgroundImage: "url(#{env.STORE_URL}/images/bg/fhd-giji.png)"
        backgroundPosition: "left 50% top #{ @top }px"

    methods:
      vils: (id)->
        max_vils = Query.folders.find(id).max_vils
        if max_vils && "progress" == @export_to
          "#{max_vils}村:"
        else
          ""

      url: (id)->
        switch @export_to
          when "progress"
            Query.folders.find(id).href
          when "finish"
            "/sow/village?folder_id=#{id}"

    components:
      sow:
        functional: true
        props: ["folder"]
        render: (m, ctx)->
          { folder } = ctx.props
          children = ctx.children ? [ folder.toLowerCase() ]

          vils = ctx.parent.vils folder
          href = ctx.parent.url  folder
          outer = ctx.parent.export_to == "progress"
          m "p", [
            vils
            if href
              if outer
                m "a",{ attrs: { href }}, children
              else
                m "nuxt-link",{ attrs: {to: href}}, children

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
        td.links.form
          sow(folder="LOBBY")
          sow(folder="OFFPARTY")
        td.links.form
          sow(folder="MORPHE")
          sow(folder="CABALA") cafe
        td.links.form
          sow(folder="WOLF")
          sow(folder="ULTIMATE")
          sow(folder="ALLSTAR")
        td.links.form
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
      tr
        th.btns(colspan=4)
          a(:href="root_path") 総合トップ

  h2#title
    nuxt-link(to="/") 人狼議事

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