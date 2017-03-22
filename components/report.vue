<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.report
  box-shadow: 0px -10px 20px -10px #000
  border-style: double dotted
  border-width: 4px 1px
  margin: 0 -10px 6px -10px
  padding: 1px 18px 1px 12px
  .name
    margin-left: 127px

.contentframe
  .report
    position: relative

    &::before,
    &::after
      top: -8px
      content: ""
      position: absolute
      border-style: solid
      border-width: 1px
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
  .name.center(v-if="head && (!! to)")
    span.pull-right {{ to }}
    | ▷
    span.pull-left {{ head }}
  .name(v-if="head && (! to)")
    sup.pull-right(v-if="sign") {{ sign }}
    | {{ head }}
  .text(:class="deco" v-if="$slots.default")
    slot
  .text(:class="deco" v-html="log_html" v-else)
  .date(v-if="write_at")
    abbr {{ anker }}
    timeago(:since="write_at")
</template>