mongoose = require "mongoose"

module.exports = (app, { MONGO_URL })->
  mongoose.connect MONGO_URL,
    config:
      autoIndex: false
  , (err)->
    if err
      console.error "no #{MONGO_URL}. disabled (passport, session)"
    else
      console.log "mongoose connected."

  ctx = require.context "./mongoose", true, ///(.+)\.coffee$///
  for fname in ctx.keys()
    ctx(fname)(app, mongoose)

  return
