<script lang="coffee">
module.exports = require("~components/chat.vue").component_class()
</script>
<style lang="stylus" scoped>

.talk
  width: 100%
  table-layout: fixed
  border-collapse: collapse
  border-spacing:  0
  margin: 0 0 6px 0
  thead, tfoot, tbody, th, td
    border:  0
    padding: 0
    background: transparent
  td
    vertical-align: middle
    position: relative
  th
    width: 125px
    vertical-align: top
    .portrate
      margin:  0 19px 0 16px

.contentframe
  .baloon
    position: absolute
    content: ''
    width:  0
    height: 0
    top:   60px
    left:  -6px
    border-style: solid
    border-width:  6px
    border-radius: 6px 0 0 6px

</style>

<template lang="pug">
table.talk(:id="id", :key="id")
  tbody
    tr
      th
        portrate(:face_id="face_id")
      td
        .baloon(:class="classname")
        .chat(:key="id", :class="classname")
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
          .date
            abbr(v-if="anker") {{ anker }}
            timeago(v-if="write_at", :since="write_at")
</template>