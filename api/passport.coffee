passport = require "passport"
passport.serializeUser (user, done)->
  done null, user.id
passport.deserializeUser (obj, done)->
  done null, obj

port = process.env.PORT || '3000'
auth =
  slack:
    module: require("passport-slack").Strategy
    attr:
      clientID: process.env.SLACK_CLIENT_ID
      clientSecret: process.env.SLACK_CLIENT_SECRET
      callbackURL: "http://lvh.me:#{port}/auth/slack/callback",
  google:
    module: require("passport-google-oauth2").Strategy
    attr:
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://lvh.me:#{port}/auth/google/callback",
      passReqToCallback: true
  facebook:
    module: require("passport-facebook").Strategy
    attr:
      clientID:     process.env.FACEBOOK_APP_ID
      clientSecret: process.env.FACEBOOK_APP_SECRET
      callbackURL: "http://lvh.me:#{port}/auth/facebook/callback"
  github:
    module: require("passport-github2").Strategy
    attr:
      clientID:     process.env.GITHUB_CLIENT_ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET
      callbackURL: "http://localhost:#{port}/auth/github/callback"
  twitter:
    module: require("passport-twitter").Strategy
    attr:
      consumerKey:    process.env.TWITTER_CONSUMER_KEY
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET
      callbackURL: "http://localhost:#{port}/auth/twitter/callback"


module.exports = (app)->
  app.use passport.initialize()
  app.use passport.session()

  for provider, { attr, module } of auth
    passport.use new module attr, (accessToken, refreshToken, profile, done)->
      passport.session.id = profile.id
      passport.session.provider = provider
      process.nextTick ->
        done null, profile

    console.log "#{provider} authenticate set."
    app.get "/auth/#{provider}", passport.authenticate provider
    app.get "/auth/#{provider}/callback", passport.authenticate provider,
      failureRedirect: '/'
      successRedirect: '/'
  return
