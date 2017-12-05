config = require './nuxt.config.js'
passport = require "passport"

module.exports = (app, env)->
  auth =
    slack:
      module: require("passport-slack").Strategy
      attr:
        clientID: env.SLACK_CLIENT_ID
        clientSecret: env.SLACK_CLIENT_SECRET
    google:
      module: require("passport-google-oauth2").Strategy
      attr:
        clientID:     env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
        passReqToCallback: true
    facebook:
      module: require("passport-facebook").Strategy
      attr:
        clientID:     env.FACEBOOK_APP_ID
        clientSecret: env.FACEBOOK_APP_SECRET
    github:
      module: require("passport-github2").Strategy
      attr:
        clientID:     env.GITHUB_CLIENT_ID
        clientSecret: env.GITHUB_CLIENT_SECRET
    twitter:
      module: require("passport-twitter").Strategy
      attr:
        consumerKey:    env.TWITTER_CONSUMER_KEY
        consumerSecret: env.TWITTER_CONSUMER_SECRET


  app.use passport.initialize()
  app.use passport.session()
  app.get "/logout", (req, res)->
    req.logout()
    res.redirect('/')

  for provider, { attr, module } of auth
    attr.callbackURL = "#{env.WEB_URL}/auth/#{provider}/callback"
    

    passport.use new module attr, (accessToken, refreshToken, { provider, id, displayName, emails, photos }, done)->
      profile =
        icon: photos?[0].value
        mail: emails?[0].value
        nick: displayName
        write_at: new Date - 0
        provider: provider
        account: id
        token: accessToken

      process.nextTick ->
        done null, profile

    console.log "#{provider} authenticate set."
    app.get "/auth/#{provider}", passport.authenticate provider
    app.get "/auth/#{provider}/callback", passport.authenticate provider,
      failureRedirect: '/'
      successRedirect: '/'
  return
