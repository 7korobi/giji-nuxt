<template lang="pug">
.outframe
  .contentframe
    .inframe
      report(handle="header" deco="center")
        tags(v-model="tag_id")
      report(handle="header" deco="center") 0人
      post(handle="TSAY")
        span(v-for="name in name_blanks") {{name}}
      div(v-for="names, count in name_counts" v-if="0 < count", :key="count")
        transition-group.posts(name="list" tag="div")
          report(handle="header" deco="center", :key="'h'+count") {{count}}人
          post(v-for="name in names" handle="SSAY", :key="name") {{name}}
      report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
</template>

<script lang="coffee">
{ Query } = require "~plugins/memory-record"

module.exports =
  default:
    data: ->
      { tag_id: "all" }

    computed:
      name_blanks: ->
        Query.faces.name_blank()

      name_counts: ->
        Query.faces.name_head(@tag_id)

</script>
