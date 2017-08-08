<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  computed:
    chat: ->
      { chat_id } = @$store.state.book
      Query.chats.find chat_id
    current: ->
      @$store.state.menu.set.current
    mentions: ->
      { chat_id } = @$store.state.book
      Query.chats.reduce?.mention_to?[chat_id]
</script>

<template lang="pug">
.inframe(v-if="current")
  h6 参照されている
  chat(v-if="chat" show="current", :id="chat.id")
  table
    transition-group.tlist(name="list" tag="tbody")
      tr-intro-chat(v-for="o in mentions" @anker="$listeners.anker", :key="o.id", :id="o.id", :handle="o.phase.handle", :deco="o.deco", :log="o.log")
</template>

<style lang="stylus" scoped>

table
  width: 100%
  border-collapse: collapse;

</style>
