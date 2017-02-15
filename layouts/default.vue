<script lang="coffee">
require "~components/vue.coffee"

style_use = (key)-> ->
  val = @style[key]
  return val unless process.BROWSER_BUILD
  @use[key]?.unuse()
  @use[key] = require "~assets/styl/#{key}-#{val}.styl.use"
  @use[key].use()
  val

module.exports =
  default:
    data: ->
      @$store.commit "menu/set", [
        { name: "cog",     ext: "spin" }
        { name: "circle-o-notch", ext: "spin" }
        { name: "refresh", ext: "spin" }
        { name: "spinner", ext: "pulse" }
        { name: "user"    }
        { name: "sitemap" }
      ]

      theme = "cinema"
      font  = "std"
      top:    0
      width:  0
      height: 0
      use: {}
      style: { theme, font }
      welcome: @$route.name == 'demo'

    created: ->
      return unless process.BROWSER_BUILD
      document.ontouchstart = ->
      if css = @$cookie.get "css"
        [theme, font] = css.split "~"
        @style = { theme, font }
      @poll()

    computed:
      theme: style_use "theme"
      font:  style_use "font"
      center: ->
        @$store.commit "menu/center", @top + @height / 2
      body_class: ->
        str = [@theme, @font].join("~")
        if process.BROWSER_BUILD
          @$cookie.set "css", str,
            path: '/'
            expires: '7D'
        str

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
        btn(v-model="style.font" as="large") 大判
        btn(v-model="style.font" as="novel") 明朝
        btn(v-model="style.font" as="std") ゴシック
        btn(v-model="style.font" as="small") 繊細

      span.theme
        btn(v-model="style.theme" as="cinema") 煉瓦
        btn(v-model="style.theme" as="star")   蒼穹
        btn(v-model="style.theme" as="night")  闇夜
        btn(v-model="style.theme" as="moon")   月夜
        btn(v-model="style.theme" as="wa")   和の国

  writeframe(:top="top")
  .sideframe
    .inframe
      post(:id="$store.state.book.chat_id" log="")
      icons(:list="$store.state.menu.list")
  .outframe
    .contentframe
      .filmend
  nuxt

</template>
<style lang="stylus" scoped>
.outframe
  height: 0
  .contentframe
    text-align: left

.filmend
  margin: -11px 0 0 -2px
  height:  36px
  width:  126px
  display: inline-block

</style>
