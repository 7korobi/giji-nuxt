mongoose = require "mongoose"

ctxs = [
  require "./mongoose/book.coffee"
  require "./mongoose/passport.coffee"
]

module.exports = (app, conf)->
  return unless conf.db.mongo
  mongoose.connect conf.db.mongo,
    config:
      autoIndex: false
  , (err)->
    if err
      console.error "no #{conf.db.mongo}. disabled (passport, session)"
    else
      console.log "mongoose connected."

  for ctx in ctxs
    ctx app, mongoose, conf

  return
