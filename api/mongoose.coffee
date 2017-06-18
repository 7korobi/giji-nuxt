{ Schema } = mongoose = require "mongoose"
mongoose.connect "mongodb://localhost/giji"

Passport = mongoose.model 'Passport', new Schema
  _id: String
  nick: String
  icon: String
  mail: String

  write_at: Number

  provider: String
  account: String
  token: String

passport = require "passport"
passport.serializeUser (o, done)->
  id = [o.provider, o.account].join("-")
  Passport.findByIdAndUpdate id, o,
    upsert: true
  .exec (err, doc)->
    if err
      console.error err
    done err, id

passport.deserializeUser (id, done)->
  done null, id

module.exports = (app)->
  app.get '/api/user/:id', (req, res, next)->
    { id } = req.params
    Passport.findById id, (err, doc)->
      res.json doc
      next()
  return