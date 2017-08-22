<script lang="coffee">
format =
  head: new Intl.DateTimeFormat 'ja-JP',
    weekday: "short"
    hour:    "2-digit"
  tail: new Intl.DateTimeFormat 'ja-JP',
    hour:    "2-digit"

module.exports =
  mixins: [
    require '~plugins/book'
    require('~plugins/pager') {}
  ]
  methods:
    time_label: (first, last)->
      span = last.write_at - first.write_at
      first_str = format.head.format first.write_at
      last_str  = format.head.format last.write_at
      if first_str == last_str
        first_str
      else
        if span < 23 * 3600 * 1000
          last_str = format.tail.format last.write_at
          first_str.replace "時", "-" + last_str
        else
          first_str + " - " + last_str

    part_label: (part_id)->
      [ first,..., last ] = @chats(part_id)
      [ first, ...] = first
      [ ...,  last] = last
      @time_label first, last

    page_label: (part_id, page_idx)->
      [ first,..., last ] = @chats(part_id)[page_idx]
      @time_label first, last

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
  h6 栞
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
          td.l.form
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
