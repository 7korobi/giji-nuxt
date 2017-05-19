<template lang="pug">
.date
  abbr(v-if="chat_id", :chat_id="chat_id") {{ anker }}
  timeago(v-if="write_at", :since="write_at")
</template>

<script lang="coffee">
module.exports =
  props: ["chat_id", "anker", "write_at"]
</script>
