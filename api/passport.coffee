config = require '../nuxt.config.js'
passport = require "passport"

auth =
  slack:
    module: require("passport-slack").Strategy
    attr:
      clientID: process.env.SLACK_CLIENT_ID
      clientSecret: process.env.SLACK_CLIENT_SECRET
  google:
    module: require("passport-google-oauth2").Strategy
    attr:
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      passReqToCallback: true
  facebook:
    module: require("passport-facebook").Strategy
    attr:
      clientID:     process.env.FACEBOOK_APP_ID
      clientSecret: process.env.FACEBOOK_APP_SECRET
  github:
    module: require("passport-github2").Strategy
    attr:
      clientID:     process.env.GITHUB_CLIENT_ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET
  twitter:
    module: require("passport-twitter").Strategy
    attr:
      consumerKey:    process.env.TWITTER_CONSUMER_KEY
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET


module.exports = (app)->
  app.use passport.initialize()
  app.use passport.session()
  app.get "/logout", (req, res)->
    req.logout()
    res.redirect('/')

  for provider, { attr, module } of auth
    if config.dev
      attr.callbackURL = "http://lvh.me:4000/auth/#{provider}/callback"
    else
      attr.callbackURL = "http://giji.check.jp/auth/#{provider}/callback"
    

    passport.use new module attr, (accessToken, refreshToken, { provider, id, displayName, emails, photos }, done)->
      profile =
        icon: photos?[0].value
        mail: emails?[0].value
        nick: displayName
        write_at: new Date - 0
        provider: provider
        account: id
        token: accessToken
      Object.assign passport.session, profile

      process.nextTick ->
        done null, profile

    console.log "#{provider} authenticate set."
    app.get "/auth/#{provider}", passport.authenticate provider
    app.get "/auth/#{provider}/callback", passport.authenticate provider,
      failureRedirect: '/'
      successRedirect: '/'
  return
