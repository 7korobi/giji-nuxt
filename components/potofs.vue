<template lang="pug">
.table-swipe
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
      slot
</template>
