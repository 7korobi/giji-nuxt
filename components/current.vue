<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>
.current
  border-bottom-style: solid
  border-bottom-width: 1px
</style>

<template lang="pug">
.chat.current(@click="click", :key="id", :class="classname")
  .date
    span(v-if="sign")
      abbr {{ sign }}
    span(v-if="id")
      abbr {{ chat.part.label }}
      abbr(:chat_id="id") {{ anker }}
    span(v-if="write_at")
      timeago(:since="write_at")
</template>
