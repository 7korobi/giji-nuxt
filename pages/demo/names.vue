<template lang="pug">
.outframe
  .contentframe
    .inframe
      c-report(handle="header" deco="center")
        tags(v-model="tag_id")
      c-report(handle="header" deco="center") 0人
      c-post(handle="TSAY")
        span(v-for="name in name_blanks") <{{name}}>
      div(v-for="group, count in name_counts" v-if="0 < count", :key="count")
        transition-group.posts(name="list" tag="div")
          c-report(handle="header" deco="center", :key="'h'+count") {{count}}人
          c-post(v-for="map in group" handle="SSAY", :key="map.id")
            | <{{map.id}}> {{ map.set.join("、") }}
      c-report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
</template>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      replace:
        tag_id: "all"
  ]
  computed:
    name_blanks: ->
      Query.faces.name_blank()

    name_counts: ->
      Query.faces.name_head(@tag_id)

</script>
