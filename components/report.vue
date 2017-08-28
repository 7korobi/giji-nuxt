<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.report
  box-shadow: 0px -10px 20px -10px #000
  border-style: double dotted
  border-width: 4px 1px
  margin: 0 -10px 6px -10px
  padding: 1px 8px 1px 10px
  .name
    margin-left: 127px
    margin-right: 13px
  .date
    margin-right: 13px
    

.contentframe
  .report
    position: relative

    &::before,
    &::after
      top: -8px
      content: ""
      position: absolute
      border-style: solid
      border-width: 1px
      border-top-color: transparent

    &::before
      border-width: 4px 8px 0 0
      left: 0

    &::after
      border-width: 4px 0 0 8px
      right: 0

</style>

<template lang="pug">
.chat.report(@click="click", :id="id", :key="id", :class="classname")
  chat-head(v-if="head", :full="full", :head="head", :to="to", :sign="sign")
  hr(v-if="head")
  .text(:class="deco" v-if="$slots.default")
    slot
  .text(:class="deco" v-html="log_html" v-else)
  chat-foot(v-if="anker", :chat_id="id", :anker="anker", :write_at="write_at")
</template>