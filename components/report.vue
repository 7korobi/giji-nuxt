<script lang="coffee">
module.exports = require("~components/chat.coffee").component_class()
</script>
<style lang="stylus" scoped>

.report
  border-style: double
  border-width: 4px
  margin: 0 -8px 6px -8px
  padding: 1px 16px

</style>

<template lang="pug">
.chat.report(:key="id", :class="handle")
  p.name(v-if="head")
    | {{ head }}
    sup.pull-right(v-if="sign") {{ sign }}
  p.text(v-if="log_html")
    span(v-html="log_html")
  p.text
    slot
  p.date(v-if="write_at")
    abbr {{ id }}
    timeago(:since="write_at")
</template>