
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
  .center-left
  .center-right

  .contentframe
    .inframe
      report.form(handle="footer" key="finder")
        .center
          span
            btn(v-model="mode", as="memo")
              | メモ
              sup(v-if="part") {{ now.memo(part_id).all }}
          span
            btn(v-model="mode", as="title")
              | タイトル
              sup(v-if="part") {{ now.title(part_id).all }}
          span
            btn(v-model="mode", as="full")
              | バレ
              sup(v-if="part") {{ now.full(part_id).all }}
            btn(v-model="mode", as="normal")
              | 通常
              sup(v-if="part") {{ now.normal(part_id).all }}
          span
            btn(v-model="mode", as="solo")
              | 独り言
              sup(v-if="part") {{ now.solo(part_id).all }}
            btn(v-model="mode", as="extra")
              | 非日常
              sup(v-if="part") {{ now.extra(part_id).all }}
            btn(v-model="mode", as="rest")
              | 墓休み
              sup(v-if="part") {{ now.rest(part_id).all }}
          span
        .center
          a(v-if="part_prev_id" @click="part_prev") 前の日へ
          a(v-if="part_next_id" @click="part_next") 次の日へ

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
      report(handle="footer" key="limitup")
        scroll-mine(v-if="page_next_id" @input="page_add", :as="page_next_id") 次頁
        .center(v-else)
          a(v-if="part_prev_id" @click="part_prev") 前の日へ
          a(v-if="part_next_id" @click="part_next") 次の日へ

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

    part_prev: ->
      @book =
        part_id: @part_prev_id ? @part_id
        page_idxs: [0]

    part_next: ->
      @book =
        part_id: @part_next_id ? @part_id
        page_idxs: [0]

  computed:
    part_prev_id: ->
      if @part && @book
        ids = @book.parts.pluck('id')
        idx = ids.indexOf @part_id
        ids[idx - 1]

    part_next_id: ->
      if @part && @book
        ids = @book.parts.pluck('id')
        idx = ids.indexOf @part_id
        ids[idx + 1]
    
    page_all_contents: ->
      @chats(@part_id)

</script>
