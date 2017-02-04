<template lang="pug">
.outframe
  .summary
    .inframe
      aside
        section.table-swipe
          table
            tfoot
              tr.btns
                th(colspan="2")
                  sup (スクロールします)
                th
                  a 日程
                th
                  a 状態
                th
                  a 発言
                th
                  a 残り
                th
                  a 促
                th
                  i.fa.fa-user
                th
                  a 希望
                th
                  a 発言
                th
                  a 勝敗
                th
                  a 陣営
                th
                  a 役割
                th
                  a 補足
            tbody
              tr
                th.victim 記者
                th.victim イアン
                td.victim 6日
                td.victim 襲撃
                td.victim 97回
                td.victim ∞
                td.victim
                td.victim
                  kbd うに
                td.victim
                  kbd 村人
                td.HUMAN 敗北
                td.HUMAN 村人陣営
                td.HUMAN 村人
                td.HUMAN
              tr
                th.live 粉ひき
                th.live ケヴィン
                td.live
                td.live 生存者
                td.live 54回
                td.live ∞
                td.live
                td.live
                  kbd 魚屋
                td.live
                  kbd 村人
                td.WOLF 勝利
                td.WOLF 人狼陣営
                td.WOLF 人狼
                td.WOLF
              tr
                th.executed 教え子
                th.executed シメオン
                td.executed 4日
                td.executed 処刑
                td.executed 54回
                td.executed ∞
                td.executed
                td.executed
                  kbd namba
                td.executed
                  kbd
                td.EVIL 敗北
                td.EVIL 村人陣営
                td.EVIL 占い師
                td.EVIL
              tr
                th.suddendead 教え子
                th.suddendead シメオン
                td.suddendead 4日
                td.suddendead 突然死
                td.suddendead 54回
                td.suddendead ∞
                td.suddendead
                td.suddendead
                  kbd ななころ
                td.suddendead
                  kbd
                td.EVIL 敗北
                td.EVIL 村人陣営
                td.EVIL 占い師
                td.EVIL
              tr
                th.mob 教え子
                th.mob シメオン
                td.mob
                td.mob 見物人
                td.mob 54回
                td.mob ∞
                td.mob
                td.mob
                  kbd ななころ
                td.mob
                  kbd
                td.NONE 敗北
                td.NONE 見物人
                td.NONE 見物人
                td.NONE
          h6
            | 参照されている
            i.fa.fa-pin

          h6
            | よく見ていた
            i.fa.fa-pin
  .sideframe
    .inframe
      .icons
        i.fa.fa-3x.fa-cog.fa-spin
        i.fa.fa-3x.fa-spinner.fa-spin
        i.fa.fa-3x.fa-user
        i.fa.fa-3x.fa-sitemap

  .contentframe
    .inframe
      report(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      post(:write_at="1494567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY")
        nuxt-link.button(to="/about") About page
      talk(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" face="c31")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      report(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      post(:write_at="1494567890123", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY")
        nuxt-link.button(to="/about") About page
      talk(:write_at="1504567890123", head="ねるねるねるね ねる" sign="ななころび" handle="WSAY" face="c32")
        img.logo(src="../assets/images/logo.png" alt="Nuxt.js Logo")
      talk(:write_at="1434567890123", head="ねるねるねるね ねる" sign="ななころび" handle="SSAY" face="c91")
        span 123456789012345678901234567890123456789012345678901234567890
</template>
