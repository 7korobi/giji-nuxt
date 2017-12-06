
module.exports = (app, m)->
  { Schema } = m

  Passport = m.model 'Passport', new Schema
    _id: String
    nick: String
    icon: String
    mail: String
    sign: String

    write_at: Number

    provider: String
    account: String
    token: String

  passport = require "passport"
  passport.serializeUser (o, done)->
    _id = [o.provider, o.account].join("-")
    Passport.findByIdAndUpdate _id, o,
      $setOnInsert:
        sign: o.mail ? o.nick
      upsert: true
    .exec (err)->
      done err, o

  passport.deserializeUser (o, done)->
    done null, o
