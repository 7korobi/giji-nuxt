<script lang="coffee">


module.exports =
  mixins: [
    require("~plugins/browser-store")
      cookie:
        theme: "cinema"
        font:  "std"
      watch: (val, key)->
        return unless window?
        @use[key]?.unuse()
        @use[key] = require "~assets/css/#{key}-#{val}.styl.css"
        @use[key].use()
  ]
  data: ->
    top:    0
    width:  0
    height: 0
    use: {}

  created: ->
    return unless window?
    document.ontouchstart = ->
    @poll()

  computed:
    center: ->
      @$store.commit "menu/center", { @top, @left, @height, @width }
    body_class: ->
      [@theme, @font].join("~")

  methods:
    poll: ->
      if @top == scrollY && @left == scrollX
        @center
      @top = scrollY
      @left = scrollX
      @width = innerWidth
      @height = innerHeight
      requestAnimationFrame @poll

</script>
<template lang="pug">
div(:class="body_class")
  welcome(:top="top")
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
