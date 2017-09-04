<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  mixins: [
    require '~plugins/book'
  ]
  computed:
    show: ->
      @$store.state.menu.set.current && @chat

</script>

<template lang="pug">
.inframe(v-if="show")
  h6(:class="chat.handle") 参照されている
  chat(show="current", :id="chat.id")
  hr
  table
    transition-group.tlist(name="list" tag="tbody")
      tr-intro-chat(v-for="o in mentions" @anker="_events.anker", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="stylus" scoped>

table
  width: 100%
  border-collapse: collapse;

</style>
