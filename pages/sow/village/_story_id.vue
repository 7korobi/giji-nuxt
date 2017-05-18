
<template lang="pug">
.outframe
  .summary(v-if="show_sitemap")
    .inframe
      h6
        | 参照されている
        i.fa.fa-pin

      h6
        | よく見ていた
        i.fa.fa-pin
      h6 一日目の参加者
    .inframe.hover
      sow-potofs(:story_id="story_id")

  .contentframe
    .inframe
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
      chat(v-for="o in chats", :id="o._id", :key="o._id")

</template>

<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"

q = new BrowserValue
q.params
  story_id: ""

module.exports =
  default:
    watch: q.watch ->
    data: ->
      q.data @

    mounted: ->
      @$store.dispatch "sow/story", @story_id

    computed:
      chats: ->
        { read_at } = @$store.state.sow
        Query.sow_villages.where({ @story_id }).list
        Query.sow_turns.where({ @story_id }).list
        Query.potofs.where({ @story_id }).list
        Query.chats.where({ @story_id }).list

</script>