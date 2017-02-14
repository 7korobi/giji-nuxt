<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.post
  padding-right: 12px
  margin 0 0 6px 107px

</style>

<template lang="pug">
.chat.post(:key="id", :class="classname")
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
  p.date
    abbr {{ anker }}
    timeago(:since="write_at")

</template>
