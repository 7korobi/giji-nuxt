<script lang="coffee">
module.exports = require("~components/chat.coffee").component_class()
</script>
<style lang="stylus" scoped>

.post
  padding-right: 12px
  margin 0 0 6px 107px

</style>

<template lang="pug">
.chat.post(:key="id", :class="handle")
  p.name(v-if="head")
    | {{ head }}
    sup.pull-right(v-if="sign") {{ sign }}
  p.text(v-if="log_html")
    span(v-html="log_html")
  p.text
    slot
  p.date
    abbr {{ id }}
    timeago(:since="write_at")

</template>
