<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>
.current
  border-bottom-style: solid
  border-bottom-width: 1px
</style>

<template lang="pug">
.chat.current(@click="click", :id="id", :key="id", :class="classname")
  .date
    span
      abbr(v-if="sign") {{ sign }}
    span
      abbr(v-if="id", :chat_id="id") {{ anker }}
    span
      timeago(v-if="write_at", :since="write_at")
</template>
