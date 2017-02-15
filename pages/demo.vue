
<template lang="pug">
.outframe
  .summary(v-if="menu_show")
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
      chat(id="demo-0-1-24")
      chat(id="demo-0-1-25")
      report(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" deco="mono")
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY")
        nuxt-link.button(to="/timeago") About page
      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" face_id="c31")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      report(handle="GSAY" deco="center") 一日目
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" deco="mono")
        nuxt-link.button(to="/timeago") About page
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" to="おきる" sign="ななころび" handle="AIM")
        nuxt-link.button(to="/timeago") About page
      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" face_id="c32" log="ねろねろねろねろ")
      post(:write_at="now - 24 * 3600000", head="ねるねる" sign="ななころび" handle="SPSAY" deco="head")
        | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      report(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="MAKER")
        | 貴様、栃木か、栃木の工作員か！
      report(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="ADMIN")
        | 貴様、栃木か、栃木の工作員か！
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="XSAY" face_id="c91")
        | 123456789012345678901234567890123456789012345678901234567890
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SPSAY" face_id="c101")
        | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="GSAY" face_id="c111")
        | あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="VSAY" face_id="w30")
        | アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SSAY" face_id="w11")
        | 霜草蒼蒼蟲切切村南村北行人絶獨出門前望野田月出蕎麥花如雪
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SSAY" face_id="c71")
        | ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～

</template>

<script lang="coffee">

module.exports =
  default:
    created: ->
      @$store.dispatch "book/server", "demo"
      @$store.commit "book/client"
      console.log "created"

    mounted: ->

    computed:
      now: ->
        Date.now()
      menu_show: ->
        'sitemap' == @$store.state.menu.target

</script>