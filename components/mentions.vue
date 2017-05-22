<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  computed:
    mentions: ->
      { read_at, chat_id } = @$store.state.book
      Query.chats.reduce?.mention_to?[chat_id]?.summary ? []

</script>

<template lang="pug">
table
  transition-group.tlist(name="list" tag="tbody")
    tr-intro-chat(v-for="o in mentions", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="stylus" scoped>

table
  width: 100%
  border-collapse: collapse;

</style>
