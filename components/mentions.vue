<script lang="coffee">
{ Query } = require "~plugins/memory-record"
{ see } = require "~plugins/book"

module.exports =
  computed: {
    see...
    show: ->
      @chat && @$store.state.menu.set.current
  }

</script>

<template lang="pug">
.inframe(v-if="show")
  h6 参照されている
  chat(show="current", :id="chat.id")
  table
    transition-group.tlist(name="list" tag="tbody")
      tr-intro-chat(v-for="o in mentions" @anker="$listeners.anker", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="stylus" scoped>

table
  width: 100%
  border-collapse: collapse;

</style>
