<script lang="coffee">
BrowserValue = require "~plugins/browser-value"
q = new BrowserValue
q.cookie
  theme: "cinema"
  font:  "std"

module.exports =
  default:
    watch: q.watch (_, key, val)->
      switch key
        when "theme", "font"
          @use[key]?.unuse()
          @use[key] = require "~assets/styl/#{key}-#{val}.styl.use"
          @use[key].use()
    data: ->
      q.data @,
        top:    0
        width:  0
        height: 0
        use: {}
        welcome: true # @$route.name == 'demo'

    created: ->
      return unless window?
      document.ontouchstart = ->
      @poll()

    computed:
      center: ->
        @$store.commit "menu/center", @top, @height
      body_class: ->
        [@theme, @font].join("~")

    methods:
      poll: ->
        if @top == scrollY
          @center
        @top = scrollY
        @width = innerWidth
        @height = innerHeight
        requestAnimationFrame @poll

</script>
<template lang="pug">
div(:class="body_class")
  welcome(:top="-top / 3", :show="welcome")
    .btns
      span.font
        btn(v-model="font" as="large") 大判
        btn(v-model="font" as="novel") 明朝
        btn(v-model="font" as="std") ゴシック
        btn(v-model="font" as="small") 繊細

      span.theme
        btn(v-model="theme" as="cinema") 煉瓦
        btn(v-model="theme" as="star")   蒼穹
        btn(v-model="theme" as="night")  闇夜
        btn(v-model="theme" as="moon")   月夜
        btn(v-model="theme" as="wa")   和の国

  writeframe(:top="top")
  .outframe.filmend-frame
    .contentframe
      .filmend

</template>
<style lang="stylus" scoped>
.filmend-frame
  height: 0
  .inframe
    padding: 0

.outframe
  .contentframe
    text-align: left

.filmend
  margin: -11px 0 0 -2px
  height:  36px
  width:  126px
  display: inline-block

</style>
