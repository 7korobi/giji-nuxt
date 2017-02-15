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
        parts: [{ _id: "demo-0", label: "プロローグ" }]
        sections: [{ _id: "demo-0-1" }]
        phases: [
          { _id: "demo-0-1", handle: "SSAY", label: "通常発言", idx: 26 }
        ]
        potofs: [
          { _id: "demo-0-6", face_id: "t05", live: "executed", side: "HUMAN", job: "開放的市民", user: "noko", date: 6, said: 16, pt: Infinity, give: 0, req: "首なし騎士", role: "首なし騎士", text: "" }
          { _id: "demo-0-5", face_id: "c29", live: "victim", side: "HUMAN", job: "記者", user: "うに", date: 6, said: 97, pt: Infinity, give: 0, req: "村人", role: "村人", text: "" }
          { _id: "demo-0-4", face_id: "c90", live: "live", side: "WOLF", job: "粉ひき", user: "魚屋", date: Infinity, said: 54, pt: Infinity, give: 0, req: "村人", role: "村人", text: "" }
          { _id: "demo-0-3", face_id: "c70", live: "executed", side: "EVIL", job: "腐女子", user: "namba", date: 4, said: 33, pt: Infinity, give: 0, req: "村人", role: "狂人", text: "" }
          { _id: "demo-0-2", face_id: "c80", live: "suddendead", side: "HUMAN", job: "少年", user: "ななころ", date: 4, said: 33, pt: Infinity, give: 0, req: "村人", role: "青の聖痕者", text: "" }
          { _id: "demo-0-1", face_id: "c60", live: "mob", side: "NONE", job: "両家の末娘", user: "ななころ", date: Infinity, said: 13, pt: Infinity, give: 0, req: "村人", role: "赤の聖痕者", text: "" }
        ]
        chats:
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
            write_at: Date.now()
            show: "talk"
            deco: "head"
            log: """
              さむいにきまってんだろ！！
            """
