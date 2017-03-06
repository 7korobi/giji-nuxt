passport = require "passport"
passport.serializeUser (user, done)->
  done null, user.id
passport.deserializeUser (obj, done)->
  done null, obj

port = process.env.PORT || '3000'
auth =
  slack:
    name: "passport-slack"
    attr:
      clientID: process.env.SLACK_CLIENT_ID
      clientSecret: process.env.SLACK_CLIENT_SECRET
  google:
    name: "passport-google-oauth2"
    attr:
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://lvh.me:#{port}/auth/google/callback",
      passReqToCallback: true
  facebook:
    name: "passport-facebook"
    attr:
      clientID:     process.env.FACEBOOK_APP_ID
      clientSecret: process.env.FACEBOOK_APP_SECRET
      callbackURL: "http://lvh.me:#{port}/auth/facebook/callback"
  github:
    name: "passport-github2"
    attr:
      clientID:     process.env.GITHUB_CLIENT_ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET
      callbackURL: "http://localhost:#{port}/auth/github/callback"
  twitter:
    name: "passport-twitter"
    attr:
      consumerKey:    process.env.TWITTER_CONSUMER_KEY
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET
      callbackURL: "http://localhost:#{port}/auth/twitter/callback"

for provider, o of auth
  { attr, name } = o
  { Strategy } = require name
  strategy = new Strategy attr, (accessToken, refreshToken, profile, done)->
    console.log attributes
    passport.session.id = profile.id
    passport.session.provider = provider
    process.nextTick ->
      done null, profile

module.exports = (app)->
  app.use passport.initialize()
  app.use passport.session()

  for provider of auth
    console.log "#{provider} authenticate set."
    app.get "/auth/#{provider}", passport.authenticate provider
    app.get "/auth/#{provider}/callback", passport.authenticate provider, { failureRedirect: '/' }, (req, res)->
      console.log "#{provider} auth success"
      # success
      res.redirect '/'
