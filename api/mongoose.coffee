mongoose = require "mongoose"

module.exports = (app, conf)->
  mongoose.connect conf.db.mongo,
    config:
      autoIndex: false
  , (err)->
    if err
      console.error "no #{conf.db.mongo}. disabled (passport, session)"
    else
      console.log "mongoose connected."

  ctx = require.context "./mongoose", true, ///(.+)\.coffee$///
  for fname in ctx.keys()
    ctx(fname)(app, mongoose, conf)

  return
