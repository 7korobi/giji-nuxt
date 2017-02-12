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
  th
    width: 125px
    vertical-align: top
    .portrate
      margin:  0 19px 0 16px

</style>

<template lang="pug">
table.talk(:key="id")
  tbody
    tr
      th
        portrate(:face="face")
      td
        .chat(:key="id", :class="classname")
          p.name.center(v-if="head && (!! to)")
            span.pull-right {{ to }}
            | ▷
            span.pull-left {{ head }}
          p.name(v-if="head && (! to)")
            sup.pull-right(v-if="sign") {{ sign }}
            | {{ head }}
          p.text
            slot
              span(v-html="log")
          p.date(v-if="write_at")
            abbr {{ id }}
            timeago(:since="write_at")
</template>