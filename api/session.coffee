session = require 'express-session'
MongoStore = require('connect-mongo')(session)

interval = 7 * 24 * 3600
day =          24 * 3600

module.exports = (app)->
  app.use session
    secret: process.env.SECRET_KEY_BASE
    resave: false
    saveUninitialized: false
    store: new MongoStore
      url: process.env.MONGO_URL
      ttl: interval
      autoRemove: 'native'
      collection: 'sessions'
      touchAfter: day
      stringify: false
    cookie:
      maxAge: interval * 1000
  return
