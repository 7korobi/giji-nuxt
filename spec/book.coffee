check = ->
  book:
    label: "testcase"
    chat:
      interval: 1
      night:    0
      player: 4
      mob:    0
    game:
      vote: "sign"
      vote_by: ["live"]
    tag_ids: ["god", "travel"]
    option: ["vote_by_live"]

  potof:
    _id: "test-1-NPC"
    face_id: "t29"
    job: "透明女子会"
    chr_job_id: "ririnra"
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

    { book } = check()
    { text } = await http
    .post "/api/books"
    .type 'json'
    .send { book }

    bless t
    t.deepContain JSON.parse(text),
      book: check().book
      parts: [
        idx: "0"
        label: "プロローグ"
      ]
      potofs: [
        idx: "NPC"
        passport_id: "local-test-user"
      ]
      phases: [
        idx: "村題"
        handle: "MAKER"
        update: true
      ,
        idx: "独題"
        handle: "private"
        update: false
      ,
        idx: "独言"
        handle: "TSAY"
        update: false
      ]
      chats: [
        idx: "welcome"
      ,
        idx: "nrule"
      ,
        idx: "vrule"
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
      potofs: check().potof
      phases: [
        _id: "test-1-0-発題"
        idx: "発題"
      ,
        _id: "test-1-0-発言"
        idx: "発言"
      ,
        _id: "test-1-0-見言"
        idx: "見言"
      ,
        _id: "test-1-0-内言"
        idx: "内言"
      ]
      chats: [
        _id: "test-1-0-発言-0"
        idx: "0"
      ,
        _id: "test-1-1-発言-0"
        idx: "0"
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
