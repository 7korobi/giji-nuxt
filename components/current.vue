<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.current
  padding: 0 2px
  margin:  0 0 0 8px

.chat
  border-bottom-width: 2px
  border-bottom-style: solid
  margin: 0 0 6px 0

</style>

<template lang="pug">
.chat(:id="id", :key="id")
  .current(@click="click", :class="classname")
    .date
      abbr(v-if="sign") {{ sign }}
      abbr(v-if="id", :chat_id="id") {{ anker }}
    .date
      timeago(v-if="write_at", :since="write_at")
</template>
