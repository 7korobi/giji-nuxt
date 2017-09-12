<script lang="coffee">


module.exports =
  mixins: [
    require("~plugins/browser-store")
      cookie:
        theme: "cinema"
        font:  "std"
      watch: (val, key)->
        key1 = key + 1
        key2 = key + 2
        href = @href[key]
        return unless window?
        window[key1].rel = 'stylesheet'
        window[key2].rel = 'stylesheet'
        window[key2].href = href
        setTimeout =>
          window[key1].href = href
          setTimeout =>
            window[key2].rel = 'prefetch'
          , 100
        , 100
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
    href: ->
      font:  "/css/font-#{@font}.styl.css"
      theme: "/css/theme-#{@theme}.styl.css"

  methods:
    poll: ->
      if @top == scrollY && @left == scrollX
        @center
      @top = scrollY
      @left = scrollX
      @width = innerWidth
      @height = innerHeight
      requestAnimationFrame @poll
  
  head: ->
    link: [
      { rel: 'stylesheet', type: 'text/css', href: "/css/index.styl.css" }
      { rel: 'stylesheet', type: 'text/css', href: "https://use.fontawesome.com/6348868528.css" }
      { type: 'text/css', id: 'font1' }
      { type: 'text/css', id: 'font2' }
      { type: 'text/css', id: 'theme1' }
      { type: 'text/css', id: 'theme2' }
    ]

</script>
<template lang="pug">
.header(:class="body_class")
  welcome(:top="top")
    .btns
      span.font
        btn(v-model="font" as="large") 大判
        btn(v-model="font" as="novel") 明朝
        btn(v-model="font" as="std") ゴシック
        btn(v-model="font" as="small") 繊細

      span.theme
        btn(v-model="theme" as="cinema") 煉瓦
        btn(v-model="theme" as="snow")   雪景
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
