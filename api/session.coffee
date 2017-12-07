session = require 'express-session'
MongoStore = require('connect-mongo')(session)

interval = 7 * 24 * 3600
day =          24 * 3600

module.exports = (app, { session_key, db })->
  app.use session
    secret: session_key
    resave: false
    saveUninitialized: false
    store: new MongoStore
      url: db.mongo
      ttl: interval
      autoRemove: 'native'
      collection: 'sessions'
      touchAfter: day
      stringify: false
    cookie:
      maxAge: interval * 1000
  console.log "session use #{db.mongo}"
