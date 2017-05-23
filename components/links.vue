<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  computed:
    link: ->
      @$store.state.menu.set.link
</script>

<template lang="pug">
.inframe(v-if="link")
  h6 栞
  report(handle="header")
    p
      nuxt-link(v-for="o in $parent.sections", :key="o.id", :to="{query: {part_id: o.part.id, phase_id: o.part.phases.list.first.id, section_id: o.id}}")
        | {{o.label}}
        sup {{ o.chats.list.length }}
    p
      nuxt-link(v-for="o in $parent.parts", :key="o.id", :to="{query: {part_id: o.id, phase_id: o.phases.list.first.id, section_id: o.sections.list.first.id}}")
        | {{o.label}}
        sup {{ o.chats.list.length }}

</template>

<style lang="stylus" scoped>

table
  width: 100%
  border-collapse: collapse;

</style>
