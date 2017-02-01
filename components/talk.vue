<script lang="coffee">
module.exports = require("~vue/_chat.coffee").component_class()
</script>
<style lang="stylus" scoped>

.w458
  .talk
    th img
      margin:  0 14px 6px  9px

.std-width
  .talk
    th img
      margin:  0 14px 6px  7px

.talk
  width: 100%
  tbody, th, td
    border:  0
    padding: 0
    background: transparent
    text-align: left
  th img
    margin:  0 15px 6px 16px
  th
    vertical-align: top
  td
    vertical-align: middle
  .chat
    margin:  0  7px 6px  0

.night-theme,
.moon-theme,
.star-theme
  .talk
    .chat
      border-style: none none solid solid
      border-width: 0 0 1px 3px
      margin:  0  7px 6px  -3px

</style>

<template lang="pug">
table.talk(:key="id")
  tbody
    tr
      th
        img(:src="face_url" width="90" height="130")
      td
        .chat(:class="handle")
          p.name(v-if="head")
            | {{ head }}
            sup.pull-right(v-if="sign") {{ sign }}
          p.text(:class="style", v-html="log_html")
          p.date
            timeago(:since="write_at")

</template>