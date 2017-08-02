session = require 'express-session'
MongoStore = require('connect-mongo')(session)
{ MONGO_URL, SECRET_KEY_BASE } = process.env


interval = 7 * 24 * 3600
day =          24 * 3600

module.exports = (app)->
  app.use session
    secret: SECRET_KEY_BASE
    resave: false
    saveUninitialized: false
    store: new MongoStore
      url: MONGO_URL
      ttl: interval
      autoRemove: 'native'
      collection: 'sessions'
      touchAfter: day
      stringify: false
    cookie:
      maxAge: interval * 1000
  return
