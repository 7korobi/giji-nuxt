
<template lang="pug">
.outframe
  .summary(v-if="show_sitemap")
    .inframe
      h6
        | 参照されている
        i.mdi.mdi-pin

      h6
        | よく見ていた
        i.mdi.mdi-eye
      h6 一日目の参加者
    .inframe.hover
      a-potofs

  .contentframe
    .inframe
      br

      c-report(v-for="handle in handles" :key="'A' + handle" :handle="handle" deco="center")
        | 二日目
        .date
          abbr
            | {{handle}}

      c-post(v-for="handle in handles" :key="'C' + handle" :handle="handle" deco="giji")
        .name
          abbr {{handle}}
        hr
        | アクション、ト書きサンプル

      c-talk(v-for="(handle, idx) in handles" :key="'E' + handle" :face_id="'c' + (10 + idx)", :write_at="now - 3600000", to="おきる" sign="ななころび" :head="handle" :handle="handle")
        sup 霜草蒼蒼
        a(title="Hello World") 人絶獨出
        sub 門前望野
        strong 蟲切切村
        | 南村北行
        em 霜草蒼蒼
        | 蟲切切村南村北行
        b 人絶獨出
        del /*門前望野*/
        | 田月出
        a(title="Hello World")
          | 蕎麥花
          sup 如
          sub 雪
        code
          | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
          | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        h1 h1
        h2 h2
        h3 h3
        h4 h4
        h5 h5
        h6 h6
        hr
        blockquote
          | ABCDEFGHIJKL 
          code MNOPQRSTUVWXYZ
          | abcdefghijklmnopqrstuvwxyz
          blockquote
            | ABCDEFGHIJKL MNOPQRSTUVWXYZ

        ul.task-list
          li.task-list-item one
          li.task-list-item two
          ol
            li three
            li four

        table
          thead
            tr
              th Tables
              th(style="text-align: center;") Are
              th(style="text-align: right;") Cool
          tbody
            tr
              td col 3 is
              td(style="text-align: center;")
                em right-aligned
              td(style="text-align: right;") $1600
            tr
              td col 2 is
              td(style="text-align: center;")
                strong centered
              td(style="text-align: right;") $12
        .date
          abbr anker

      br
      chat(v-for="o in chats", :id="o._id", :key="o._id")
      c-talk(:write_at="now - 20000", face_id="t10" head="ねるねるねるね ねる" sign="ななころび" handle="VSAY" deco="").
        モブのセリフがちょっとなやむ。
      c-post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="VSAY")
        nuxt-link(to="/demo/timeago") About page

      c-talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="GSAY" face_id="c31").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      c-post(:write_at="now - 24 * 3600000", head="ねるねる" sign="ななころび" handle="SPSAY" deco="head").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      c-post(:write_at="now - 3600000", head="ねるねるねるね ねる" to="おきる" sign="ななころび" handle="AIM")
        nuxt-link(to="/timeago") About page
      c-report(handle="GSAY" deco="center") 一日目
      c-post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" deco="mono")
        nuxt-link(to="/timeago") About page
      c-talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" face_id="c32" log="ねろねろねろねろ")
      c-talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="XSAY" deco="mono" face_id="c91").
        123456789012345678901234567890123456789012345678901234567890
        123456789012345678901234567890123456789012345678901234567890
      c-talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SPSAY" face_id="c101").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      c-talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="GSAY" face_id="c111").
        あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
        あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
      c-talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="VSAY" face_id="w30").
        アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
        アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
      c-post(:write_at="now - 3600000", head="ねるねるねるね ねる" to="おきる" sign="ななころび" handle="AIM").
        ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～

      a-myself(v-if="! show_write", :self_id="self_id")

      c-report(handle="footer" deco="center")
        nuxt-link(to="/") 戻る
</template>

<style lang="stylus" scoped>
</style>

<script lang="coffee">
{ Query } = require "~/plugins/memory-record"

module.exports =
  mixins: [
    require("~/plugins/browser-store")
      replace:
        chat_id: ""
        part_id: ""
        self_id: ""
  ]
  mounted: ->
    @$store.dispatch "book/book", "demo-0"
    .then =>
      @$store.dispatch "book/part", "demo-0-0"
    .then =>
      @$store.dispatch "book/section", "demo-0-0-1"
    .then =>
      @self_id = "demo-0-0-8"
      @part_id = @$store.state.book.part_id

  computed:
    now: ->
      Date.now()
    show_sitemap: ->
      'sitemap' == @$store.state.menu.target
    show_write: ->
      @$store.state.menu.target == 'comment'
    chats: ->
      { read_at, @chat_id, book_id } = @$store.state.book
      book = Query.books.find(book_id)
      if book
        book.chats.list
      else
        []
    
    says: ->
      """WSAY N01 N02 N03 N04 N05 N06 N07 N08 N09 SPORT P09 P08 P07 P06 P05 P04 P03 P02 P01 WSAY""".split /\s/
    sepia: ->
      """S000 SN01 SN02 SN03 SN04 SN05 SN06 SN07 SN08 SN09 Ssport SP09 SP08 SP07 SP06 SP05 SP04 SP03 SP02 SP01 S000""".split /\s/
    world: ->
      """W000 WN01 WN02 WN03 WN04 WN05 WN06 WN07 WN08 WN09 Wsport WP09 WP08 WP07 WP06 WP05 WP04 WP03 WP02 WP01 W000""".split /\s/
    metal: ->
      """M000 MN01 MN02 MN03 MN04 MN05 MN06 MN07 MN08 MN09 Msport MP09 MP08 MP07 MP06 MP05 MP04 MP03 MP02 MP01 M000""".split /\s/
    infos: ->
      """HATER PIXI EVIL HUMAN WOLF LOVER NONE executed leave footer btns welcome-btns icons""".split /\s/
    handles: ->
      [
        @says...
        @sepia...
        @world...
        @metal...
        @infos...
      ]

</script>


