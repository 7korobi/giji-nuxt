<template lang="pug">
.outframe
  .contentframe
    .inframe
      report(handle="header" deco="center")
        tags(v-model="tag_id")
      report(handle="header" deco="center") 0人
      post(handle="TSAY")
        span(v-for="name in name_blanks") <{{name}}>
      div(v-for="group, count in name_counts" v-if="0 < count", :key="count")
        transition-group.posts(name="list" tag="div")
          report(handle="header" deco="center", :key="'h'+count") {{count}}人
          post(v-for="map in group" handle="SSAY", :key="map.id")
            | <{{map.id}}> {{ map.set.join("、") }}
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
</template>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"
BrowserValue = require "~plugins/browser-value"

q = new BrowserValue
q.query
  tag_id:  "all"

module.exports =
  default:
    watch: q.watch
    data: ->
      q.data @

    computed:
      name_blanks: ->
        Query.faces.name_blank()

      name_counts: ->
        Query.faces.name_head(@tag_id)

</script>
