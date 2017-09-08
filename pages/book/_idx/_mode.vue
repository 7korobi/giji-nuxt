
<template lang="pug">
.outframe
  .sideframe
    .inframe
      .icons.form
        nuxt-link.item.active(replace, :to="back_url")
          i.fa.fa-map-marker
        check.item(v-model="menus" as="current")
          i.fa.fa-map-pin
        check.item(v-model="menus" as="toc")
          i.fa.fa-film
        check.item(v-model="menus" as="potof")
          i.fa.fa-users
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
            i.fa.fa-expand
        span 最新のメモを表示しています。
    .inframe(v-if="mode == 'memos'")
      report.form(handle="footer")
        span
          btn(v-model="mode", as="memo")
            i.fa.fa-compress
        span メモ掲載の一覧を表示しています。

    .inframe(v-for="(chats, idx) in page_contents", :key="idx")
      chat(v-for="o in chats" @anker="anker" @focus="focus", :id="o.id", :key="o.id")

    .inframe
      report.form(v-if="page_next_id" handle="footer" key="limitup")
        .center
          scroll-mine(@input="page_add", :as="page_next_id") 次頁
      report.form(v-else handle="footer" key="limitup")
        page-part
        page-mode

</template>


<style lang="stylus" scoped>
</style>

<script lang="coffee">
module.exports =
  mixins: [
    require("~plugins/get-by-mount") "24h", "sow/story", -> @book_id
    require '~plugins/book'
    require('~plugins/pager')
      watch: (val, key)->
        { chat_id } = @
        if chat_id
          @$nextTick ->
            @$store.commit "menu/focus", chat_id
  ]
  methods:
    focus: (@idx)->
    anker: (book_id, a)->
      @$router.push
        path: "../#{@part_id}/anker"
        query: { a, @back }

  computed:
    page_all_contents: ->
      @chats(@part_id)

</script>
