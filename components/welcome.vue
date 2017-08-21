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


    components:
      sow:
        functional: true
        props: ["folder_id"]
        render: (m, ctx)->
          { folder_id } = ctx.props
          { export_to } = ctx.parent
          children = ctx.children ? [ folder_id.toLowerCase() ]

          switch export_to
            when "progress"
              { href, max_vils } = Query.folders.find(folder_id)
              vils =
                if max_vils
                  "#{max_vils}村:"
                else
                  ""
              m "p", [
                vils
                m "a",{ attrs: { href }}, children
              ]

            when "finish"
              to =
                path: "/sow/village"
                query: { folder_id, pages: 1 }
              m "p", [
                m "nuxt-link",{ attrs: { to }}, children
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
          sow(folder_id="LOBBY")
          sow(folder_id="OFFPARTY")
        td.links.form
          sow(folder_id="MORPHE")
          sow(folder_id="CABALA") cafe
        td.links.form
          sow(folder_id="WOLF")
          sow(folder_id="ULTIMATE")
          sow(folder_id="ALLSTAR")
        td.links.form
          sow(folder_id="RP") role-play
          sow(folder_id="PRETENSE") RP-advance
          sow(folder_id="PERJURY")
          sow(folder_id="XEBEC")
          sow(folder_id="CRAZY")
          sow(folder_id="CIEL")
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