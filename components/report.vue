<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.report
  border-style: double
  border-width: 4px
  margin: 0 -8px 6px -8px
  padding: 1px 16px
  .name
    margin-left: 117px

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
  p.text(:class="deco")
    slot
      span(v-html="log_html")
  p.date(v-if="write_at")
    abbr {{ id }}
    timeago(:since="write_at")
</template>