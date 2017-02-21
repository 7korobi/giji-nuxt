<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.report
  border-style: double dotted
  border-width: 4px 1px
  margin: 0 -8px 6px -8px
  padding: 1px 18px
  .name
    margin-left: 117px



.contentframe
  .report
    position: relative

    &::before,
    &::after
      top: -8px
      content: ""
      position: absolute
      border: 1px #666 solid
      border-top-color: transparent

    &::before
      border-width: 4px 8px 0 0
      left: 0

    &::after
      border-width: 4px 0 0 8px
      right: 0

</style>

<template lang="pug">
.chat.report(:key="id", :class="classname")
  p.name.center(v-if="head && (!! to)")
    span.pull-right {{ to }}
    | ▷
    span.pull-left {{ head }}
  p.name(v-if="head && (! to)")
    sup.pull-right(v-if="sign") {{ sign }}
    | {{ head }}
  p.text(:class="deco" v-if="$slots.default")
    slot
  p.text(:class="deco" v-html="log_html" v-else)
  p.date(v-if="write_at")
    abbr {{ anker }}
    timeago(:since="write_at")
</template>