test = require 'ava'
express = require 'express'
mongoose = require "mongoose"
supertest = require 'supertest'

conf =
  session_key: "SECRET_SESSION_SECRET"
  game:
    folder_id: "test"
  db:
    mongo: "mongodb://localhost/giji"
    mongo_sow: "mongodb://localhost/giji"
  url:  {}
  auth: {}

user =
  _id: "local-test-user"
  provider: "local-test"
  icon: "https://s3-ap-northeast-1.amazonaws.com/giji-assets/images/portrate/w52.jpg"
  mail: "7korobi.sys@gmail.com"
  nick: "テスト中"
  sign: "SIGN.SPEC"
  write_at: new Date - 0
  token: "DEADBEEF"
  account: "user"

_ = require "lodash"
bless = (t)->
  t.deepContain = (tgt, chk)->
    chk = _.mergeWith chk, tgt, (c, o)->
      switch c?.constructor
        when null, undefined
          o
        when Array, Object
          undefined
        else
          c
    @deepEqual tgt, chk

app = express()
require("~/api/base"    )(app, conf)
require("~/api/session" )(app, conf)
require("~/api/mongodb" )(app, conf)
require("~/api/mongoose")(app, conf)

app.post '/test/session', (req, res, next)->
  req.session.passport ?= {}
  req.session.passport.user ?= user
  res.json req.session.passport

http = supertest.agent(app)


require("~/spec/user") app, { test, bless, http }
require("~/spec/book") app, { test, bless, http }

