mongoose = require "mongoose"
mongoose.Promise = global.Promise

module.exports = (app, conf)->
  return unless conf.db.mongo
  mongoose.connect conf.db.mongo,
    config:
      autoIndex: false
  , (err)->
    if err
      console.log "no #{conf.db.mongo}. disabled (passport, session)"

  require("./mongoose/book.coffee") app, conf
  require("./mongoose/part.coffee") app, conf
  require("./mongoose/phase.coffee") app, conf
  require("./mongoose/chat.coffee") app, conf

  require("./mongoose/potof.coffee") app, conf

  return
