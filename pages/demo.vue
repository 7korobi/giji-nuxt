
<template lang="pug">
.outframe
  .summary
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
      report(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      post(:write_at="1494567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY")
        nuxt-link.button(to="/about") About page
      talk(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" face="c31")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      report(handle="WSAY") 一日目
      post(:write_at="1494567890123", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY")
        nuxt-link.button(to="/about") About page
      talk(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" face="c32")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      talk(:write_at="1434567890123", sign="ななころび" handle="XSAY" face="c91")
        | 123456789012345678901234567890123456789012345678901234567890
      talk(:write_at="1434567890123", sign="ななころび" handle="SPSAY" face="c101")
        | ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      talk(:write_at="1434567890123", sign="ななころび" handle="GSAY" face="c111")
        | あいうえおかきくけこさしすせそたちつてとなにぬねのやゆよ
      talk(:write_at="1434567890123", sign="ななころび" handle="VSAY" face="c121")
        | アイウエオカキクケコサシスセソタチ、ツテトナニヌネノヤユヨ
      talk(:write_at="1434567890123", sign="ななころび" handle="SSAY" face="w11")
        | 霜草蒼蒼蟲切切村南村北行人絶獨出門前望野田月出蕎麥花如雪
      talk(:write_at="1434567890123", sign="ななころび" handle="SSAY" face="c71")
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

</script>