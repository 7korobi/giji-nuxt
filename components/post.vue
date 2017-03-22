<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.post
  padding-right: 12px
  margin 0 0 6px 7px

.contentframe
  .post
    margin 0 0 6px 107px
    // box-shadow: inset -30px 0px 45px -38px #222
    // 罫線にshadowが乗らない。

</style>

<template lang="pug">
.chat.post(:key="id", :class="classname")
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
