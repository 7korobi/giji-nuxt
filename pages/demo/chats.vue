
<template lang="pug">
.outframe
  .summary(v-if="show_sitemap")
    .inframe
      h6
        | 参照されている
        i.fa.fa-pin

      h6
        | よく見ていた
        i.fa.fa-pin
      h6 一日目の参加者
    .inframe.hover
      potofs

  .contentframe
    .inframe
      br
      br
      chat(v-for="(o, id) in $store.state.book.data.chats", :id="id")
      talk(:write_at="now - 20000", face_id="t10" head="ねるねるねるね ねる" sign="ななころび" handle="VSAY" deco="").
        モブのセリフがちょっとなやむ。
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="VSAY")
        nuxt-link.button(to="/demo/timeago") About page

      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="GSAY" face_id="c31").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="VGSAY" face_id="c32").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      post(:write_at="now - 24 * 3600000", head="ねるねる" sign="ななころび" handle="SPSAY" deco="head").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" to="おきる" sign="ななころび" handle="AIM")
        nuxt-link.button(to="/timeago") About page
      report(handle="GSAY" deco="center") 一日目
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" deco="mono")
        nuxt-link.button(to="/timeago") About page
      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" face_id="c32" log="ねろねろねろねろ")
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="XSAY" face_id="c91").
        123456789012345678901234567890123456789012345678901234567890
        123456789012345678901234567890123456789012345678901234567890
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SPSAY" face_id="c101").
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
        ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="GSAY" face_id="c111").
        あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
        あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="VSAY" face_id="w30").
        アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
        アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" to="おきる" sign="ななころび" handle="AIM").
        ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
      report(handle="TITLE" deco="center") 二日目
      report(handle="MAKER" deco="center") 二日目
      report(handle="ADMIN" deco="center") 二日目
      report(handle="TSAY" deco="center") 二日目
      report(handle="XSAY" deco="center") 二日目
      report(handle="SSAY" deco="center") 二日目
      report(handle="VSAY" deco="center") 二日目
      report(handle="WSAY" deco="center") 二日目
      report(handle="AIM" deco="center") 二日目
      report(handle="SPSAY" deco="center") 二日目
      report(handle="VGSAY" deco="center") 二日目
      report(handle="GSAY" deco="center") 二日目
      report(handle="SPORT" deco="center") 二日目
      talk(face_id="t01", :write_at="now - 3600000", to="おきる" sign="ななころび" head="TSAY" handle="TSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t02", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N06")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t04", :write_at="now - 3600000", to="おきる" sign="ななころび" head="VGSAY" handle="VGSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t03", :write_at="now - 3600000", to="おきる" sign="ななころび" head="GSAY" handle="GSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t05", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N09")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t06", :write_at="now - 3600000", to="おきる" sign="ななころび" head="SPORT" handle="SPORT")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t07", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="P09")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t08", :write_at="now - 3600000", to="おきる" sign="ななころび" head="ELSE" handle="P08")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t09", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="P07")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t10", :write_at="now - 3600000", to="おきる" sign="ななころび" head="XSAY" handle="XSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t11", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="P05")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t12", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="P04")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t13", :write_at="now - 3600000", to="おきる" sign="ななころび" head="SSAY" handle="SSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t14", :write_at="now - 3600000", to="おきる" sign="ななころび" head="VSAY" handle="VSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t15", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="P01")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t16", :write_at="now - 3600000", to="おきる" sign="ななころび" head="WSAY" handle="WSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t17", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N01")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t20", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N02")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t19", :write_at="now - 3600000", to="おきる" sign="ななころび" head="AIM" handle="AIM")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t18", :write_at="now - 3600000", to="おきる" sign="ななころび" head="SPSAY" handle="SPSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t21", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N05")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t22", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N06")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t24", :write_at="now - 3600000", to="おきる" sign="ななころび" head="VGSAY" handle="VGSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t23", :write_at="now - 3600000", to="おきる" sign="ななころび" head="GSAY" handle="GSAY")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t25", :write_at="now - 3600000", to="おきる" sign="ななころび" head="色ちぇっく" handle="N09")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      talk(face_id="t26", :write_at="now - 3600000", to="おきる" sign="ななころび" head="SPORT" handle="SPORT")
        a 霜草蒼蒼
        sup 人絶獨出
        sub 門前望野
        b 蟲切切村
        strong 南村北行
        | 霜草蒼蒼蟲切切村南村北行人絶獨出
        em /*門前望野*/
        | 田月出蕎麥花如雪
      div(v-if="! show_write")
        report(deco="center", :handle="phase.handle")
          span
            btn(v-for="o in parts" v-model="part", :as="o") {{ o.label }}
          span
            btn(v-for="o in phases" v-model="phase", :as="o") {{ o.label }}
          span
            btn(v-for="o in phases" v-model="phase", :as="o") {{ o.label }}

        talk(sign="ななころび" face_id="c71" head="発言投稿", :deco="deco", :handle="phase.handle" )
          text-editor(v-model="text", :max-row="10", :max-size="2000")
        post(sign="ななころび" face_id="c71" head="act投稿", :deco="deco", :handle="phase.handle" )
          text-editor(v-model="text", :max-size="120")
        report(sign="ななころび" face_id="c71" head="レポート投稿", :deco="deco", :handle="phase.handle" )
          text-editor(v-model="text", :max-size="120")
      br
      br
</template>

<style lang="stylus" scoped>
.per
  vertical-align: -0.2em
  font-size:       0.7em
  margin:  0 0 0  -0.2em
  padding: 0
  display: inline

.fa-check
  color: #060
.fa-warning
  color: #660
.fa-ban
  color: #600

</style>

<script lang="coffee">

module.exports =
  default:
    data: ->
      text: ""
      show: "talk"
      deco: ""
      part:  {}
      phase: { handle: "SSAY" }
    mounted: ->
      @$store.dispatch "book/server", "demo"

    computed:
      parts: ->
        @$store.state.book.data.parts
      phases: ->
        @$store.state.book.data.phases
      now: ->
        Date.now()
      show_sitemap: ->
        'sitemap' == @$store.state.menu.target
      show_write: ->
        @$store.state.menu.target == 'comment'

</script>