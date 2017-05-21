<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.mention
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

</style>

<template lang="pug">
tr.chat(@click="click", :key="id", :class="classname")
  th
    abbr(v-if="id", :chat_id="id") {{ anker }}
  td.mention(v-html="log_mention")
</template>
