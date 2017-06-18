{ model, Schema } = mongoose = require "mongoose"
mongoose.connect "mongodb://localhost/giji"

Passport = model 'Passport', new Schema
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
  .exec (err, doc, op)->
    console.log [err, doc, op]
    done null, _id

passport.deserializeUser (id, done)->
  Passport.findById id, (err, doc)->
    console.log [err, doc]
    done null, doc



module.exports = (app)->
  app.get '/api/test', (req, res)->
    res.json
      a: 1
    res.status(401).json
      error: "bad credentials"
  return