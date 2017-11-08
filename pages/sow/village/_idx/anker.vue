<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        nuxt-link.item.active(replace, :to="back_url")
          i.fa.fa-map-marker

  .summary(name="list" tag="div" key="summary")
    mentions(key="1" @anker="anker")
  .contentframe
    .inframe
      report.form(handle="footer" key="finder")
        page-mode
    .inframe
      chat(v-for="o in anker_chats" @anker="anker" @focus="focus", :id="o.id", :key="o.id")
    .inframe
      report.form(handle="footer" key="finder")
        page-mode

</template>
<script lang="coffee">
{ Query } = require "~/plugins/memory-record"
{ uniq, relative_to } = require "~/plugins/struct"

module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "24h", "sow/story", -> @book_id
    require('~/plugins/book')
      loader: true
  ]
  mounted: ->
    @shows = [@shows..., "current"]

  methods:
    focus: (idx)->
      { name, params, query } = @$route
      params = { params..., idx }
      @$router.replace { name, params, query }
    
    anker: (book_id, a)->
      a = uniq @$route.query.a, a
      @$router.replace relative_to @$route, { a }

  computed:
    anker_chats: ->
      @read_at
      a = uniq @$route.query.a
      Query.chats.ankers(@book_id, a).list

</script>
