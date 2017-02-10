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

.right-layout
  #export
    margin: 0 0 0 auto

.left-layout
  #export
    margin: 0 auto 0 0

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

.filmline
  margin: 0
  height: 11px
  background-repeat: repeat-x
  .contentframe
    background-image: none

.filmend
  margin: -11px 0 0 -2px
.outframe
  height: 0
  .contentframe
    text-align: left

#welcome
  background-size:  cover
  background-image: url(../assets/images/bg/fhd-giji.png)
  .btns
    background-color: rgba(77, 78, 70, 0.9)
</style>

<script lang="coffee">
require "~components/models/sow"
{ Query } = require "~components/models/memory-record"
require "~components/vue.coffee"

file = (path)->
  "http://s3-ap-northeast-1.amazonaws.com/giji-assets" + path

bg = (name)->
  file "/images/bg/#{name}"

if document?
  document.ontouchstart = ->

module.exports =
  default:
    fetch: ({ store, params })->

    data: ->
      @$store.commit "menus", [
        { name: "cog",     ext: "spin" }
        { name: "circle-o-notch",     ext: "spin" }
        { name: "refresh", ext: "spin" }
        { name: "spinner", ext: "pulse" }
        { name: "user"    }
        { name: "sitemap" }
      ]

      css = @$cookie?.get("css") ? "cinema~wide~center~std"
      [theme, width, layout, font] = css.split("~")

      style: { theme, width, layout, font }
      use: {}
      mode: if @$route.name == "demo" then "full" else null
      export_to: "progress"
      active: true
      y: 0

    created: ->
      return unless process.BROWSER_BUILD
      @poll()

    destroyed: ->
      @active = false

    computed:
      body_class: ->
        { theme, width, layout, font } = @style
        str = [theme, width, layout, font].join("~")
        if process.BROWSER_BUILD
          @use.width?.unuse()
          @use.width = require "~assets/styl/width-#{width}.styl.use"
          @use.width.use()
          @use.font?.unuse()
          @use.font = require "~assets/styl/font-#{font}.styl.use"
          @use.font.use()
          @use.theme?.unuse()
          @use.theme = require "~assets/styl/theme-#{theme}.styl.use"
          @use.theme.use()
          @$cookie.set "css", str,
            path: '/'
            expires: '7D'

        for k,v of @style
          "#{v}-#{k}"

      welcome_style: ->
        backgroundPosition: "left 50% top #{ -@y / 2 }px"

      filmend_url: ->
        switch @style.theme
          when "wa", "moon"
            bg "film-wa-end.png"
          else
            bg "film-end.png"

    methods:
      btn: (val, chk)->
        if val == chk
          ["active"]
        else
          []
      poll: ->
        return unless process.BROWSER_BUILD
        return unless @active
        @y = scrollY
        requestAnimationFrame? @poll

      slide: (to)->
        @export_to = to

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
div(:class="body_class")
  #welcome(:style="welcome_style")
    table#export(v-if="mode")
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

    .btns
      span.font
        btn(v-model="style.font" as="large") 大判
        btn(v-model="style.font" as="novel") 明朝
        btn(v-model="style.font" as="std") ゴシック
        btn(v-model="style.font" as="small") 繊細

      span.width
        btn(v-model="style.width" as="full") 最大
        btn(v-model="style.width" as="wide") 広域
        btn(v-model="style.width" as="std")  狭域

      span.theme
        btn(v-model="style.theme" as="cinema") 煉瓦
        btn(v-model="style.theme" as="star")   蒼穹
        btn(v-model="style.theme" as="night")  闇夜
        btn(v-model="style.theme" as="moon")   月夜
        btn(v-model="style.theme" as="wa")   和の国
    .filmline

  writeframe(:top="y", :show="true")
  .sideframe
    .inframe
      icons(:list="$store.state.menus")
  .outframe
    .contentframe
      img.filmend(:src="filmend_url")
  nuxt

</template>
