
<template lang="pug">
no-ssr
  .outframe
    .contentframe
      .inframe
        br
        div(v-for="o in talks")
          c-talk(:head="o.head", :deco="o.deco", :handle="o.handle", :face_id="o.face_id", :write_at="o.write_at", :log="o.log")
          c-report(:head="o.deco", :deco="o.deco", :handle="o.handle", :write_at="o.write_at") {{ o.log }}
</template>

<script lang="coffee">
module.exports =
  data: ->
    now = Date.now()
    talks: [
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "SSAY"
      face_id: "c100"
      write_at: now - 1000000
      log: """
        ## ヘッドライン
        
        大きなテーブルも作れます。

        | Tables        | Are           | Cool  |
        | ------------- |:-------------:| -----:|
        | col 3 is      | right-aligned | $1600 |
        | col 2 is      | centered      |   $12 |
        | zebra stripes | are neat      |    $1 |
      """
    ,
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "GSAY"
      face_id: "c101"
      write_at: now - 2000000
      log: """
        ―電脳都市―
        ===
        ―電脳都市―
        ---

        ### ―電脳都市―


        #### ―[電脳都市](《ｴﾚｸﾄﾛ・ｼﾃｨ》)―
        ##### ―電脳都市―
        ###### ―電脳都市―
        [振り仮名](ふりがな)はあったほうが[嬉](うれ)しいと[思](おも)う。
        [沢山](たくさん)[使](つか)うと[幅](はば)をとってしまうし、
      """
    ,
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "WSAY"
      face_id: "c102"
      write_at: now - 3000000
      log: """
        [ｷﾞﾀｰ]: 《ｷﾞﾀｰ》 "五弦や四弦ではいかんのである。"
        [アンカー](http://google.com)と[紛](まぎ)らわしいかもしれないけれど。
        などと。
        <auto@test>
        <ftp://test>
        ****
        ````


        鞭打つように唸る[六弦][ｷﾞﾀｰ]に　熱狂の声は暫しの沈黙
        従順にも従う小悪魔達の顔を　一瞥　見渡して

        覚醒の時を待つ[低音太鼓](《ﾊﾞｽﾄﾞﾗﾑ》)の　重低音に酔わされ


        唄の寵愛を受けし罪人は　[拡声器](《ﾏｲｸ》)を握る……
        ````
      """
    ,
      head: "発言レンダーてすと"
      deco: "giji"
      handle: "PSAY"
      face_id: "c103"
      write_at: now - 4000000
      log: """
        あとさ、
        1. [x] HTMLかくのは**禁止** <hr>
        2.[ ] ~~検閲により削除~~したら`strikeout`するほうがいいかしら。
      """
    ,
      head: "発言レンダーてすと"
      deco: "mermaid"
      handle: "TSAY"
      face_id: "c104"
      write_at: now - 5000000
      log: """
        graph LR
          A[Square Rect] -- Link text --> B((Circle))
          A --> C(Round Rect)
          B --> D{Rhombus}
          C --> D
      """
    ]

  computed:
    now: ->
      Date.now()

</script>


