<script lang="coffee">
module.exports = require("~components/chat.coffee").component_class()
</script>
<style lang="stylus" scoped>

.post
  padding:    2px 12px 2px   4px
  margin:   0    0   6px 107px

.w458,
.std-width
  .post
    margin:   0    0   6px  97px

.ririnra-theme,
.wa-theme
  .post
    border-style: solid none solid solid
    border-width: 2px  0   2px  18px
    border-color: #222

.cinema-theme
  .post
    border-style: dashed none dashed solid
    border-width: 2px  0   2px  18px
    border-color: #663

.night-theme,
.moon-theme,
.star-theme
  .post
    border-style: none none solid solid
    border-width: 0 0 1px 18px

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
