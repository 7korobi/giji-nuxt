check = ->
  book:
    label: "testcase"
    chat:
      interval: "1d"
      night:    "0"
      player: 4
      mob:    0
    game:
      vote: "sign"
      vote_by: ["live"]
    tag_ids: ["god", "travel"]
    option: ["vote_by_live"]

  potof:
    _id: "test-1-NPC"
    face_id: "sf10"
    job: "保安技師"
    passport_id: 'local-test-user'
  
  chats: [
    idx: "welcome"
  ,
    idx: "vrule"
    log: """
1. 多重ログインをしない。
2. システムの出力内容を、そのまま書き写さない。
3. エピローグまで秘密を守る。参加中の村の内容は秘密だ。
4. エピローグまで秘密を守る。希望した能力、画面を見ているきみが何者なのかは秘密だ。
      """
  ]

  part:
    _id: "test-1-1"
    idx: "1"
    label: "一日目"

module.exports = (app, { test, http, bless })->
  test.serial 'post api/books', (t)->
    await http.post "/test/session"

    { book, potof } = check()
    { text } = await http
    .post "/api/books"
    .type 'json'
    .send { book, potof }

    bless t
    t.deepContain JSON.parse(text),
      book: check().book
      potof:
        idx: "NPC"
        passport_id: "local-test-user"
      part:
        idx: "0"
        label: "プロローグ"
      phases: [
        idx: "BM"
        handle: "MAKER"
        update: true
      ,
        idx: "MM"
        handle: "SSAY"
        update: true
      ,
        idx: "TM"
        handle: "private"
        update: false
      ,
        idx: "SM"
        handle: "public"
        update: false
      ,
        idx: "TS"
        handle: "TSAY"
        update: false
      ,
        idx: "Aim"
        handle: "AIM"
        update: false
      ,
        idx: "SS"
        handle: "SSAY"
        update: false
      ,
        idx: "VS"
        handle: "VSAY"
        update: false
      ]
      chats: [
        idx: "welcome"
      ,
        idx: "nrule"
      ,
        idx: "vrule"
      ,
        idx: "0"
      ]


  test 'post api/books/:book_id', (t)->
    { book, potof } = check()

    { text } = await http
    .post "/api/books/test-1"
    .type 'json'
    .send { book, potof }

    bless t
    t.deepContain JSON.parse(text),
      book: check().book
      potof: check().potof
      phases: [
        _id: "test-1-0-BM"
        idx: "BM"
      ,
        _id: "test-1-0-MM"
        idx: "MM"
      ]
      chats: [
        _id: "test-1-0-BM-welcome"
        idx: "welcome"
      ,
        _id: "test-1-0-BM-nrule"
        idx: "nrule"
      ,
        _id: "test-1-0-BM-vrule"
        idx: "vrule"
      ]

  test 'post api/books/:book_id/part', (t)->
    { part } = check()

    { text } = await http
    .post "/api/books/test-1/part"
    .type 'json'
    .send { part }

    bless t
    t.deepContain JSON.parse(text),
      part: check().part
      phases: [
        idx: "TM"
        handle: "private"
        update: false
      ,
        idx: "SM"
        handle: "public"
        update: false
      ,
        idx: "TS"
        handle: "TSAY"
        update: false
      ,
        idx: "Aim"
        handle: "AIM"
        update: false
      ,
        idx: "SS"
        handle: "SSAY"
        update: false
      ,
        idx: "VS"
        handle: "VSAY"
        update: false
      ]
      chats: [
        idx: "0"
      ]


  test 'get api/books', (t)->
    { text } = await http
    .get "/api/books"

    bless t
    for book in JSON.parse(text).books
      t.deepContain book, check().book

  test 'get api/books/:book_id', (t)->
    { text } = await http
    .get "/api/books/test-1"

    bless t
    t.deepContain JSON.parse(text),
      book: check().book
      potofs: []
      stats: []
      cards: []
      parts: []
      phases: []

  test 'get api/books/:book_id/chats', (t)->
    { text } = await http
    .get "/api/books/test-1/chats"

    bless t
    t.deepContain JSON.parse(text),
      chats: []
