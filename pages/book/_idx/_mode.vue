
<template lang="pug">
no-ssr
  .outframe
    .sideframe
      .inframe
        .icons.form
          nuxt-link.item.active(replace, :to="back_url")
            i.mdi.mdi-map-marker
          check.item(v-model="menus" as="current")
            i.mdi.mdi-map-pin
          check.item(v-model="menus" as="toc")
            i.mdi.mdi-film
          check.item(v-model="menus" as="potof")
            i.mdi.mdi-users
    .summary(name="list" tag="div" key="summary")
      mentions(key="1" @anker="anker")
      toc(key="2")
      potofs(key="3")
    .contentframe
      .inframe
        report.form(handle="footer" key="finder")
          page-mode
          page-part

      .inframe(v-if="mode == 'title' && book")
        report.form(handle="MAKER" deco="head", :write_at="book.write_at", :head="book.head", :sign="book.sign", :log="book.log")

      .inframe(v-if="mode == 'memo'")
        report.form(handle="footer")
          span
            btn(v-model="mode", as="memos")
              i.mdi.mdi-timer
          span 最新のメモを表示しています。
      .inframe(v-if="mode == 'memos'")
        report.form(handle="footer")
          span
            btn(v-model="mode", as="memo")
              i.mdi.mdi-timer-off
          span メモ掲載の一覧を表示しています。

      .inframe(v-for="(chats, idx) in page_contents", :key="idx")
        chat(v-for="o in chats" @anker="anker" @focus="focus", :id="o.id", :key="o.id")

      .inframe
        report.form(v-if="page_next_idx" handle="footer" key="limitup")
          .center
            scroll-mine(@input="page_add", :as="page_next_idx") 次頁
        report.form(v-else handle="footer" key="limitup")
          page-part
          page-mode

</template>



<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        nuxt-link.item.active(replace, :to="editor_url")
          i.mdi.mdi-file-text
        nuxt-link.item.active(replace, :to="back_url")
          i.mdi.mdi-map-marker
        check.item(v-model="shows" as="mentions")
          i.mdi.mdi-map-pin
        check.item(v-model="shows" as="toc")
          i.mdi.mdi-film
        check.item(v-model="shows" as="potof")
          i.mdi.mdi-users
  .summary(name="list" tag="div" key="summary")
    a-mentions(key="1" @anker="anker")
    a-toc(key="2")
    a-potofs(key="3")
  .contentframe
    .inframe
      c-post(handle="footer" key="breadcrumb")
        bread-crumb
          li
            nuxt-link(:to="folder_url") 終了した村一覧

      c-report.form(handle="footer" key="finder")
        page-mode
        page-part

    .inframe(v-if="mode == 'memo'")
      c-report.form(handle="footer")
        span
          btn(v-model="mode", as="memos")
            i.mdi.mdi-expand
        span 最新のメモを表示しています。
    .inframe(v-if="mode == 'memos'")
      c-report.form(handle="footer")
        span
          btn(v-model="mode", as="memo")
            i.mdi.mdi-compress
        span メモ掲載の一覧を表示しています。

    .inframe(v-for="(chats, idx) in page_contents", :key="idx")
      chat(v-for="o in chats" @anker="anker" @focus="focus", :id="o.id", :key="o.id")

    .inframe
      c-report.form(v-if="page_next_idx" handle="footer" key="limitup")
        .center
          scroll-mine(@input="page_add", :as="page_next_idx") 次頁
      c-report.form(v-else handle="footer" key="limitup")
        page-part
        page-mode

      c-post(handle="footer" key="breadcrumb")
        bread-crumb
          li
            nuxt-link(:to="folder_url") 終了した村一覧

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
module.exports =
  mixins: [
    require("~/plugins/get-by-mount") "24h", "book/book",  -> @book_id
    require("~/plugins/get-by-mount")  "5m", "book/chats", -> @book_id
    require('~/plugins/pager')
    require('~/plugins/book')
      loader: true
  ]

  head: ->
    labels = [@part, @book].map (o)-> o?.label
    labels.push "人狼議事"
    title: labels.join(' ')

  methods:
    focus: (@idx)->
    anker: (book_id, a)->
      @$router.push
        path: "../#{@part_id}/anker"
        query: { a, @back }

  computed:
    editor_url: ->
      back = @$route.query.back
      back ?= @back
      path: "./editor"
      query: { back }

    folder_url: ->
      "/sow/village?folder_id=#{@folder_id.toUpperCase()}"
    page_all_contents: ->
      @chats(@part_id)

</script>
