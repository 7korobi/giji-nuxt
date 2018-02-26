_ = require "lodash"
passport = require "passport"
plugins =
  facebook: require "passport-facebook"
  twitter:  require "passport-twitter"
  slack:    require "passport-slack"
  github:   require "passport-github"
  google:   require "passport-google-oauth20"

{ YAML, API } = require "../helper.coffee"

module.exports = (app, m, { auth, url })->
  { Schema } = m

  Passport = m.model 'Passport', new Schema
    _id: String
    nick: String
    icon: String
    mail: String
    sign: String

    write_at: Number

    provider: String
    account: String
    token: String

  passport.serializeUser (o, done)->
    o._id = [o.provider, o.account].join("-")
    Passport.findByIdAndUpdate o._id, o,
      $setOnInsert:
        sign: o.mail ? o.nick
      new: false
      upsert: true
    .exec (err, o)->
      done err, o

  passport.deserializeUser (o, done)->
    done null, o

  app.use passport.initialize()
  app.use passport.session()

  app.post "/api/user", API ({
    body,
    session:
      passport: { user }
  })->
    unless user?._id
      return { message: "ログインしていません。" }
    
    Object.assign user, body.user
    user = await Passport.findByIdAndUpdate user._id, user,
      new: true
      upsert: false
    { user }

  app.get "/logout", (req, res)->
    req.logout()
    res.redirect('/')

  for provider, { attr, authenticate } of auth
    { Strategy } = plugins[provider]
    attr.callbackURL = "#{url.web}/auth/#{provider}/callback"

    passport.use new Strategy attr, (accessToken, refreshToken, { provider, id, displayName, emails, photos }, done)->
      profile =
        icon: photos?[0].value
        mail: emails?[0].value
        nick: displayName
        write_at: new Date - 0
        provider: provider
        account: id
        token: accessToken

      done null, profile
      console.log "passport-profile", profile

    app.get "/auth/#{provider}", passport.authenticate provider, authenticate
    app.get "/auth/#{provider}/callback", passport.authenticate provider,
      failureRedirect: '/'
      successRedirect: '/'
    console.log "#{provider} authenticate set."

  return
