{ Collection, Model, Query, Rule } = require "~components/models/memory-record"
require '~components/models/book'

if process.BROWSER_BUILD
  window.Query = Query
  window.Collection = Collection
  
module.exports =
  namespaced: true
  state:
    book_id: null
    part_id: null
    section_id: null
    chat_id: null
    data: {}

  mutations:
    see: (state, chat_id)->
      return unless chat_id
      state.chat_id = chat_id

    server: (state, o)->
      state.data = o
      state.book_id = o.books[0]._id
      state.part_id = o.parts[0]._id
      state.section_id = o.sections[0]._id

    client: (state)->
      Collection.book.merge    state.data.books
      Collection.part.merge    state.data.parts
      Collection.section.merge state.data.sections
      Collection.phase.merge   state.data.phases
      Collection.potof.merge   state.data.potofs
      Collection.chat.merge    state.data.chats

  actions:
    server: ({commit}, id)->
      commit "server",
        books: [{ _id: "demo", label: "デモページ" }]
        parts: [
          { _id: "demo-0", label: "プロローグ" }
          { _id: "demo-1", label: "一日目" }
          { _id: "demo-2", label: "エピローグ" }
        ]
        sections: [{ _id: "demo-0-1" }]
        phases: [
          { _id: "demo-0-0", handle: "TITLE", idx:  2 }
          { _id: "demo-0-1", handle: "SSAY",  idx: 26 }
          { _id: "demo-0-2", handle: "TSAY",  idx:  2 }
          { _id: "demo-0-3", handle: "MAKER", idx:  2 }
          { _id: "demo-0-4", handle: "ADMIN", idx:  2 }
          { _id: "demo-0-5", handle: "VSAY",  idx:  3 }
          { _id: "demo-0-6", handle: "WSAY",  idx:  3 }
        ]
        potofs: [
          { _id: "demo-0-10", face_id: "c30", live: "executed", side: "HATER", job: "R-", sign: "ななころ", date: 2, said: 33, pt: Infinity, give: 0, req: "村人", role: "村人", text: "仇" }
          { _id: "demo-0-9", face_id: "c40", live: "live", side: "GURU", job: "R-", sign: "ななころ", date: Infinity, said: 33, pt: Infinity, give: 0, req: "村人", role: "教祖", text: "" }
          { _id: "demo-0-8", face_id: "c50", live: "live", side: "LOVER", job: "R-", sign: "ななころ", date: Infinity, said: 33, pt: Infinity, give: 0, req: "村人", role: "村人、悪鬼", text: "恋" }
          { _id: "demo-0-7", face_id: "c87", live: "live", side: "HUMAN", job: "病人", sign: "ななころ", date: Infinity, said: 2, pt: 2000, give: 1, req: "村人", role: "村人", text: "" }
          { _id: "demo-0-6", face_id: "t05", live: "executed", side: "HUMAN", job: "開放的市民", sign: "noko", date: 5, said: 16, pt: Infinity, give: 0, req: "首なし騎士", role: "首なし騎士", text: "" }
          { _id: "demo-0-5", face_id: "c29", live: "victim", side: "HUMAN", job: "記者", sign: "うに", date: 6, said: 97, pt: Infinity, give: 0, req: "村人", role: "村人", text: "" }
          { _id: "demo-0-4", face_id: "c90", live: "live", side: "WOLF", job: "粉ひき", sign: "魚屋", date: Infinity, said: 54, pt: Infinity, give: 0, req: "村人", role: "村人", text: "" }
          { _id: "demo-0-3", face_id: "c70", live: "executed", side: "EVIL", job: "腐女子", sign: "namba", date: 4, said: 33, pt: Infinity, give: 0, req: "村人", role: "狂人", text: "" }
          { _id: "demo-0-2", face_id: "c80", live: "suddendead", side: "HUMAN", job: "少年", sign: "ななころ", date: 3, said: 33, pt: Infinity, give: 0, req: "村人", role: "青の聖痕者", text: "" }
          { _id: "demo-0-1", face_id: "c60", live: "mob", side: "NONE", job: "両家の末娘", sign: "ななころ", date: Infinity, said: 13, pt: Infinity, give: 0, req: "村人", role: "見物人", text: "" }
        ]
        chats:
          "demo-0-0-0":
            show: "report"
            deco: "center"
            log: """プロローグ"""
          "demo-0-0-1":
            show: "report"
            deco: null
            log: """
              この村にも恐るべき“人狼”の噂が流れてきた。
              ひそかに人間と入れ替わり、夜になると人間を襲うという魔物。不安に駆られた村人たちは、集会所へと集まるのだった……。
            """
          "demo-0-3-1":
            show: "report"
            log: """
              【業務連絡】【RP】
              今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。
              またPC向けの情報は【RP】とつけます。よろしくお願いいたします。

              ただいま、入村準備中のため、いましばらくお待ちください。
            """
          "demo-0-3-2":
            show: "talk"
            log: """
              【業務連絡】【RP】
              今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。
              またPC向けの情報は【RP】とつけます。よろしくお願いいたします。

              ただいま、入村準備中のため、いましばらくお待ちください。
            """
          "demo-0-4-1":
            show: "report"
            log: """
              【業務連絡】【RP】*/
              今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。
              またPC向けの情報は【RP】とつけます。よろしくお願いいたします。

              ただいま、入村準備中のため、いま/*しばらくお待ちください。
            """
          "demo-0-4-2":
            show: "talk"
            log: """
              【業務連絡】【RP】
              今後、村建てからのお知らせや、/*PL向けの情報*/は【業務連絡】と書きます。
              またPC向けの情報は【RP】とつけます。よろしくお願いいたします。

              ただいま、入村準備中のため、いましばらくお待ちください。
            """
          "demo-0-2-2":
            show: "report"
            log: """病人 エリアスが参加しました。"""
          "demo-0-1-1":
            potof_id: "demo-0-7"
            show: "talk"
            deco: "repo"
            log: """
              ― 美術室 ―

              　……あ。

              [キャンバスに向き合っていた視線を、左の手首へと落とした。銀色の小さな腕時計は、こちこちと始業の数分前を刻んでいる]

              　そろそろ、行かなくちゃ。

              [手早く道具を片付けると、美術室を後にする。
              向かうのはもちろん、2年3組の教室]
            """
          "demo-0-1-24":
            potof_id: "demo-0-6"
            write_at: Date.now()
            show: "talk"
            deco: null
            log: """
              ねっ、ねっ、これって降るかな？
              やっぱ、降っちゃうやつかな、これ？
              やった～、今度こそ３段いこうよ、３段！
              まっててね～わたしのオ○フ～

              [仰ぐように空に手をかざすと、雪が待ちきれないと言った表情で、少し前の流行歌を口ずさみはじめた]

              すこ～しもさむくないわぁ～♪
            """
          "demo-0-1-25":
            potof_id: "demo-0-6"
            write_at: Date.now() - 80000
            show: "talk"
            deco: "head"
            log: """
              さむいにきまってんだろ！！
            """
          "demo-0-5-1":
            potof_id: "demo-0-1"
            write_at: Date.now() - 60000
            show: "report"
            deco: "mono"
            log: """
              .　＿＿＿＿＿＿＿
              ／／[ゲリラ豪雨]＼＼
              |◎|　　 ^＿^　　 |◎|
              |◎|　　 (´･ω･) 　|◎|
              ＼＼ 　⊂　　⊃　／／
              　(⌒(⌒(⌒)⌒)⌒)
              (⌒＿(⌒)(⌒)＿⌒)
              (_(＿＿)(＿)(＿＿)_)
              ⚡//////⚡⚡\\\\\\⚡
            """

          "demo-0-5-2":
            potof_id: "demo-0-1"
            write_at: Date.now() - 40000
            show: "talk"
            deco: "mono"
            log: """
              .　＿＿＿＿＿＿＿
              ／／[ゲリラ豪雨]＼＼
              |◎|　　 ^＿^　　 |◎|
              |◎|　　 (´･ω･) 　|◎|
              ＼＼ 　⊂　　⊃　／／
              　(⌒(⌒(⌒)⌒)⌒)
              (⌒＿(⌒)(⌒)＿⌒)
              (_(＿＿)(＿)(＿＿)_)
              ⚡//////⚡⚡\\\\\\⚡
            """
          "demo-0-5-3":
            potof_id: "demo-0-1"
            write_at: Date.now() - 20000
            show: "post"
            deco: "mono"
            log: """
              .　＿＿＿＿＿＿＿
              ／／[ゲリラ豪雨]＼＼
              |◎|　　 ^＿^　　 |◎|
              |◎|　　 (´･ω･) 　|◎|
              ＼＼ 　⊂　　⊃　／／
              　(⌒(⌒(⌒)⌒)⌒)
              (⌒＿(⌒)(⌒)＿⌒)
              (_(＿＿)(＿)(＿＿)_)
              ⚡//////⚡⚡\\\\\\⚡
            """

