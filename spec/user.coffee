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

  test 'get /auth/google/callback.', (t)->
    { redirect, header: { location } } = await http.get "/auth/google/callback"

    bless t
    t.is redirect, true
    t.match location, ///
      https://accounts.google.com/o/oauth2/v2/auth\?response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A\d\d\d\d\d%2Fauth%2Fgoogle%2Fundefined%2Fauth%2Fgoogle%2Fcallback&client_id=TEST-CLIENT-ID
    ///

  test 'get /auth/facebook/callback.', (t)->
    { redirect, header: { location } } = await http.get "/auth/facebook/callback"
    
    bless t
    t.is redirect, true
    t.match location, ///
      https://www.facebook.com/dialog/oauth\?response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A\d\d\d\d\d%2Fauth%2Ffacebook%2Fundefined%2Fauth%2Ffacebook%2Fcallback&client_id=TEST-CLIENT-ID
    ///
