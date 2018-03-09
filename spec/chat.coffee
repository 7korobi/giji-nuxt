check = ->
  potof:
    face_id: "sf10"
    job: "保安技師"
    sign: '公開サイン'
  
  part:
    _id: "test-1-1"
    idx: "1"
    label: "一日目"

module.exports = (app, { test, http, bless })->
  test 'post api/books/test-1/potof.', (t)->
    await http.post "/test/session"

    { potof } = check()
    { text } = await http
    .post "/api/books/test-1/potof"
    .type 'json'
    .send { potof, phase_id: 'test-1-1-SSAY' }

    bless t
    t.deepContain JSON.parse(text),
      stat:
        idx: 'SSAY'
        give: 0
        sw: false
      card:
        idx: 'request'
        role_id: null
      chat: {}
      potof
