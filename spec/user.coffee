user =
  sign: "公開サイン"

module.exports = (app, { test, http, bless })->
  test.serial 'post api/user fail.', (t)->
    await http.post "/logout"

    { text } = await http
    .post "/api/user"
    .send
      user:
        sign: "公開サイン"

    bless t
    t.deepContain JSON.parse(text),
      message: "ログインしていません。"

  test.serial 'post api/user', (t)->
    await http.post "/test/session"

    { text } = await http
    .post "/api/user"
    .send { user }

    bless t
    t.deepContain JSON.parse(text), { user }
