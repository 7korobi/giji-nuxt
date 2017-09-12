<script lang="coffee">
timerange = require "~components/filters/timerange"

module.exports =
  mixins: [
    require '~plugins/book'
    require('~plugins/pager') {}
  ]
  methods:
    part_label: (part_id)->
      [ min,..., max ] = @chats(part_id)
      return "" unless min
      [ min, ...] = min
      return "" unless max
      [ ...,  max] = max
      min = min.write_at
      max = max.write_at
      timerange { min, max }

    page_label: (part_id, page_idx)->
      [ min,..., max ] = @chats(part_id)[page_idx]
      min = min.write_at
      max = max.write_at
      timerange { min, max }

    go_page: (part_id, page_idx)->
      return unless part_id && data = @chats(part_id)

      pages = 1 + page_idx

      if window?
        window.scrollTo 0, 0
      @$router.push
        path: "../#{part_id}/#{@mode}"
        query: { pages }

    page_btn_class: (part_id, page_idx)->
      if @part_id == part_id && page_idx in @page_idxs
        ["nuxt-link-exact-active"]
      else
        []
  computed:
    show: ->
      @$store.state.menu.set.toc && @book?.parts

</script>

<template lang="pug">
.inframe.TITLE(v-if="show")
  hr
  .swipe
    page-mode(style="white-space: nowrap")
    hr
    table
      tbody
        tr(v-for="(o, line) in book.parts.list", :key="o.id")
          th.r.form
            btn.tooltip-top(@input="go_page(o.id, 0)", :data-tooltip="part_label(o.id)", :value="part_id", :as="o.id")
              | {{o.label}}
              sup {{ chats(o.id).all }}
          th.l.form
            a.page.tooltip-top(v-for="(_, page_idx) in chats(o.id)" @click="go_page(o.id, page_idx)", :data-tooltip="page_label(o.id, page_idx)", :class="page_btn_class(o.id, page_idx)")
              | {{ page_idx + 1 }}

</template>

<style lang="stylus" scoped>
.nuxt-link-exact-active
.page
  min-width: 2.5ex
  text-align: center

.header
  padding-left: 20px
.r
  text-align: right
.l
  text-align: left
.c
  text-align: center

</style>
