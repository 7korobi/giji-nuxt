data =
  books: [{ _id: "demo", label: "デモページ", winner: "WOLF", potof_size: 10 }]
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
  cards: [
    { _id: "demo-0-1-request",  role_id: "villager" }
    { _id: "demo-0-2-request",  role_id: "villager" }
    { _id: "demo-0-3-request",  role_id: "villager" }
    { _id: "demo-0-4-request",  role_id: "villager" }
    { _id: "demo-0-5-request",  role_id: "villager" }
    { _id: "demo-0-6-request",  role_id: "headless" }
    { _id: "demo-0-7-request",  role_id: "villager" }
    { _id: "demo-0-8-request",  role_id: "villager" }
    { _id: "demo-0-9-request",  role_id: "villager" }
    { _id: "demo-0-10-request", role_id: "villager" }

    { _id: "demo-0-1-live", role_id: "mob", date: Infinity }
    { _id: "demo-0-1-role", role_id: "juror" }
    { _id: "demo-0-2-live", role_id: "suddendead", date: 3 }
    { _id: "demo-0-2-role", role_id: "stigma" }
    { _id: "demo-0-3-live", role_id: "executed", date: 4 }
    { _id: "demo-0-3-role", role_id: "possess" }
    { _id: "demo-0-4-live", role_id: "live", date: Infinity }
    { _id: "demo-0-4-role", role_id: "villager" }
    { _id: "demo-0-5-live", role_id: "victim", date: 6 }
    { _id: "demo-0-5-role", role_id: "villager" }
    { _id: "demo-0-6-live", role_id: "executed", date: 5 }
    { _id: "demo-0-6-role", role_id: "headless" }
    { _id: "demo-0-7-live", role_id: "live", date: Infinity }
    { _id: "demo-0-7-role", role_id: "villager" }
    { _id: "demo-0-8-live", role_id: "live", date: Infinity }
    { _id: "demo-0-8-role", role_id: "villager" }
    { _id: "demo-0-8-gift", role_id: "ogre" }
    { _id: "demo-0-8-bond", role_id: "hater" }
    { _id: "demo-0-9-live", role_id: "live", date: Infinity }
    { _id: "demo-0-9-role", role_id: "guru" }
    { _id: "demo-0-10-live", role_id: "executed", date: 2 }
    { _id: "demo-0-10-role", role_id: "villager" }
    { _id: "demo-0-10-bond", role_id: "lover" }
  ]
  ables: [
    { _id: "demo-0-1-give", give: 0 }
    { _id: "demo-0-1-VSAY", pt: Infinity, said: 13 }
    { _id: "demo-0-1-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-1-commit", sw: true }
    { _id: "demo-0-1-vote", cmd: "vote", target: "demo-0-1" }
    { _id: "demo-0-1-entrust", target: null }

    { _id: "demo-0-2-give", give: 0 }
    { _id: "demo-0-2-GSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-2-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-2-aura" }
    { _id: "demo-0-2-stigma", code: "青" }
    { _id: "demo-0-2-human" }
    # { _id: "demo-0-2-commit", sw: true }

    { _id: "demo-0-3-give", give: 0 }
    { _id: "demo-0-3-GSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-3-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-3-aura" }
    { _id: "demo-0-3-human" }
    { _id: "demo-0-3-evil" }
    # { _id: "demo-0-3-commit", sw: true }

    { _id: "demo-0-4-give", give: 0 }
    { _id: "demo-0-4-SSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-4-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-4-AIM",  pt: Infinity, said: 1 }
    { _id: "demo-0-4-human" }
    { _id: "demo-0-4-commit", sw: true }
    { _id: "demo-0-4-vote", cmd: "vote", target: "demo-0-4" }
    { _id: "demo-0-4-entrust", cmd: "entrust", target: null }

    { _id: "demo-0-5-give", give: 0 }
    { _id: "demo-0-5-GSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-5-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-5-human" }
    # { _id: "demo-0-5-commit", sw: true }

    { _id: "demo-0-6-give", give: 0 }
    { _id: "demo-0-6-GSAY", pt: Infinity, said: 16 }
    { _id: "demo-0-6-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-6-aura" }
    { _id: "demo-0-6-wolf" }
    { _id: "demo-0-6-hunt", cmd: "role", target: null }
    # { _id: "demo-0-6-commit", sw: true }
    # { _id: "demo-0-6-WSAY", pt: Infinity, said: 1 }

    { _id: "demo-0-7-give", give: 0 }
    { _id: "demo-0-7-SSAY", pt: 2000, said: 2 }
    { _id: "demo-0-7-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-7-AIM",  pt: Infinity, said: 1 }
    { _id: "demo-0-7-human" }
    { _id: "demo-0-7-commit", sw: true }
    { _id: "demo-0-7-vote", cmd: "vote", target: "demo-0-7" }
    { _id: "demo-0-7-entrust", cmd: "entrust", target: null }

    { _id: "demo-0-8-give", give: 0 }
    { _id: "demo-0-8-SSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-8-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-8-AIM",  pt: Infinity, said: 1 }
    { _id: "demo-0-8-human" }
    { _id: "demo-0-8-commit", sw: true }
    { _id: "demo-0-8-vote", cmd: "vote", target: "demo-0-8" }
    { _id: "demo-0-8-entrust", cmd: "entrust", target: null }
    { _id: "demo-0-8-hater", cmd: "bond", target: "demo-10" }
    { _id: "demo-0-8-wolf" }
    { _id: "demo-0-8-hunt", cmd: "role", target: null }
    { _id: "demo-0-8-friend" }
    { _id: "demo-0-8-WSAY", pt: Infinity, said: 1 }

    { _id: "demo-0-9-give", give: 0 }
    { _id: "demo-0-9-SSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-9-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-9-AIM",  pt: Infinity, said: 1 }
    { _id: "demo-0-9-aura" }
    { _id: "demo-0-9-human" }
    { _id: "demo-0-9-guru" }
    { _id: "demo-0-9-commit", sw: true }
    { _id: "demo-0-9-vote", cmd: "vote", target: "demo-0-9" }
    { _id: "demo-0-9-entrust", cmd: "entrust", target: null }

    { _id: "demo-0-10-give", give: 0 }
    { _id: "demo-0-10-GSAY", pt: Infinity, said: 33 }
    { _id: "demo-0-10-TSAY", pt: Infinity, said: 1 }
    { _id: "demo-0-10-human" }
    # { _id: "demo-0-10-commit", sw: true }
    { _id: "demo-0-10-lover", cmd: "bond", target: "demo-10" }
  ]
  potofs: [
    { _id: "demo-0-10", face_id: "c30", hide: false, side: "HATER", job: "R-", sign: "七転び" }
    { _id: "demo-0-9",  face_id: "c40", hide: false, side: "GURU",  job: "R-", sign: "七転び" }
    { _id: "demo-0-8",  face_id: "c50", hide: false, side: "LOVER", job: "R-", sign: "ななころ" }
    { _id: "demo-0-7",  face_id: "c87", hide: false, side: "HUMAN", job: "病人", sign: "七転び" }
    { _id: "demo-0-6",  face_id: "t05", hide: false, side: "HUMAN", job: "開放的市民", sign: "noko" }
    { _id: "demo-0-5",  face_id: "c29", hide: false, side: "HUMAN", job: "記者", sign: "うに" }
    { _id: "demo-0-4",  face_id: "c90", hide: false, side: "WOLF",  job: "粉ひき", sign: "魚屋" }
    { _id: "demo-0-3",  face_id: "c70", hide: false, side: "EVIL",  job: "腐女子", sign: "namba" }
    { _id: "demo-0-2",  face_id: "c80", hide: true,  side: "HUMAN", job: "少年", sign: "ななころ" }
    { _id: "demo-0-1",  face_id: "c60", hide: false, side: "NONE",  job: "両家の末娘", sign: "ななころ" }
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
        また/*PC向けの情報は【RP】とつけます。*/よろしくお願いいたします。

        ただいま、入村準備中のため、いましばらくお待ちください。
      """
    "demo-0-3-2":
      show: "talk"
      log: """
        【業務連絡】【RP】
        今後、村建てからのお知らせや、PL向けの情報は【業務連絡】と書きます。
        また/*PC向けの情報は【RP】とつけます。*/よろしくお願いいたします。

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
module.exports = (app)->
  app.get '/api/books/demo/0', (req, res)->
    res.json data
