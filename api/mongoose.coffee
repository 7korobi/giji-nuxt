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
  _id = [o.provider, o.account].join("-")
  Passport.findByIdAndUpdate _id, o,
    upsert: true
  .exec (err, doc)->
    if err
      console.error err
    else
      console.log doc
    done err, _id

passport.deserializeUser (id, done)->
  Passport.findById id, (err, doc)->
    if err
      console.error err
    else
      console.log doc
    done err, doc


module.exports = (app)->
  app.get '/api/user', (req, res)->
    res.json
      a: 1
    res.status(401).json
      error: "bad credentials"
  return