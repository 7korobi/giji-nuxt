mongoose = require "mongoose"
mongoose.Promise = global.Promise

ctxs = [
  require "./mongoose/book.coffee"
  require "./mongoose/passport.coffee"
]

module.exports = (app, conf)->
  return unless conf.db.mongo
  mongoose.connect conf.db.mongo,
    useMongoClient: true
    config:
      autoIndex: false
  , (err)->
    if err
      console.log "no #{conf.db.mongo}. disabled (passport, session)"

  for ctx in ctxs
    ctx app, mongoose, conf

  return
