_ = require "lodash"
passport = require "passport"

plugins =
  facebook: require "passport-facebook"
  twitter:  require "passport-twitter"
  slack:    require "passport-slack"
  github:   require "passport-github2"
  google:   require "passport-google-oauth2"

module.exports = (app, { auth, url })->
  app.use passport.initialize()
  app.use passport.session()
  app.get "/logout", (req, res)->
    req.logout()
    res.redirect('/')

  for provider, { attr, Strategy } of auth
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

      process.nextTick ->
        console.log "profile", profile
        done null, profile

    console.log "#{provider} authenticate set."
    app.get "/auth/#{provider}", passport.authenticate provider
    app.get "/auth/#{provider}/callback", passport.authenticate provider,
      failureRedirect: '/'
      successRedirect: '/'
  return
