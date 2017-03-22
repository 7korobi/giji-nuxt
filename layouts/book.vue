<script lang="coffee">
require "~components/vue.coffee"

module.exports =
  default:
    data: ->
      @$store.commit "menu/set", [
        { name: "cog",     ext: "spin" }
        { name: "circle-o-notch", ext: "spin" }
        { name: "refresh", ext: "spin" }
        { name: "spinner" }
        { name: "user"    }
        { name: "sitemap" }
      ]
      {}
</script>
<template lang="pug">
div
  layout-header
  .sideframe
    .inframe
      icons(:list="$store.state.menu.list")
  nuxt
  layout-footer

</template>
<style lang="stylus" scoped>
</style>
