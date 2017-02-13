
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
      report(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" deco="mono")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY")
        nuxt-link.button(to="/about") About page
      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" face="c31")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      report(handle="WSAY" deco="center") 一日目
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" deco="mono")
        nuxt-link.button(to="/about") About page
      post(:write_at="now - 3600000", head="ねるねるねるね ねる" to="おきる" sign="ななころび" handle="AIM")
        nuxt-link.button(to="/about") About page
      talk(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" face="c32" log="ねろねろねろねろ")
      post(:write_at="now - 24 * 3600000", head="ねるねる" sign="ななころび" handle="SPSAY" deco="head")
        | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      report(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="MAKER")
        | 貴様、栃木か、栃木の工作員か！
      report(:write_at="now - 20000", head="ねるねるねるね ねる" sign="ななころび" handle="ADMIN")
        | 貴様、栃木か、栃木の工作員か！
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="XSAY" face="c91")
        | 123456789012345678901234567890123456789012345678901234567890
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SPSAY" face="c101")
        | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="GSAY" face="c111")
        | あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="VSAY" face="w30")
        | アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SSAY" face="w11")
        | 霜草蒼蒼蟲切切村南村北行人絶獨出門前望野田月出蕎麥花如雪
      talk(:write_at="now - 24 * 3600000", sign="ななころび" handle="SSAY" face="c71")
        | ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～

</template>

<script lang="coffee">
{ Collection, Model, Query, Rule } = require "~components/models/memory-record"

require '~components/models/sow'

Collection.potof.merge [
  { _id: "demo-0-5", face_id: "c29", live: "victim", side: "HUMAN", job: "記者", user: "うに", date: 6, said: 97, pt: Infinity, give: 0, req: "村人", role: "村人", text: "" }
  { _id: "demo-0-4", face_id: "c90", live: "live", side: "WOLF", job: "粉ひき", user: "魚屋", date: Infinity, said: 54, pt: Infinity, give: 0, req: "村人", role: "村人", text: "" }
  { _id: "demo-0-3", face_id: "c70", live: "executed", side: "EVIL", job: "腐女子", user: "namba", date: 4, said: 33, pt: Infinity, give: 0, req: "村人", role: "狂人", text: "" }
  { _id: "demo-0-2", face_id: "c80", live: "suddendead", side: "HUMAN", job: "少年", user: "ななころ", date: 4, said: 33, pt: Infinity, give: 0, req: "村人", role: "青の聖痕者", text: "" }
  { _id: "demo-0-1", face_id: "c60", live: "mob", side: "NONE", job: "両家の末娘", user: "ななころ", date: Infinity, said: 13, pt: Infinity, give: 0, req: "村人", role: "赤の聖痕者", text: "" }
]

module.exports =
  default:
    computed:
      now: ->
        Date.now()
      menu_show: ->
        'sitemap' == @$store.state.target

</script>