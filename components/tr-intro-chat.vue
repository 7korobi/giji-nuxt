<script lang="coffee">
module.exports = require("~/components/chat.vue").default.component_class()
</script>
<style lang="stylus" scoped>

.mention
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

</style>

<template lang="pug">
tr.chat(@click="click", :key="id", :class="classname")
  td
    q(v-if="id", :cite="id") {{ anker }}
  td.mention(v-html="log_html" :class="deco")
    slot
</template>
