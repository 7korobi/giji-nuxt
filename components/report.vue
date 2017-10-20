<script lang="coffee">
module.exports = require("~/components/chat.vue").default.component_class()
</script>

<template lang="pug">
.chat.report(@click="click", :id="id", :key="id", :class="classname")
  chat-head(v-if="head", :full="full", :head="head", :to="to", :sign="sign")
  hr(v-if="head")
  .text(:class="deco" v-if="$slots.default")
    slot
  .text(:class="deco" v-html="log_html" v-else)
  chat-foot(v-if="anker", :full="full", :chat_id="id", :anker="anker", :write_at="write_at")
</template>