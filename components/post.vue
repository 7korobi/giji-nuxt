<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.post
  padding-right: 12px
  margin 0 0 6px 7px

.contentframe
  .post
    margin 0 0 6px 107px
    // box-shadow: inset -30px 0px 45px -38px #222
    // 罫線にshadowが乗らない。

</style>

<template lang="pug">
.chat.post(@click="click", :id="id", :key="id", :class="classname")
  chat-head(v-if="head", :full="full" :head="head", :to="to", :sign="sign")
  .text(:class="deco" v-if="$slots.default")
    slot
  .text(:class="deco" v-html="log_html" v-else)
  chat-foot(:chat_id="id", :anker="anker", :write_at="write_at")
</template>
