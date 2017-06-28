session = require 'express-session'
MongoStore = require('connect-mongo')(session)

interval = 7 * 24 * 3600

module.exports = (app)->
  app.use session
    secret: process.env.SECRET_KEY_BASE
    resave: false
    saveUninitialized: false
    store: new MongoStore
      db: 'sessions'
      host: 'localhost'
      clear_interval: interval
    cookie:
      maxAge: interval * 1000
  return
