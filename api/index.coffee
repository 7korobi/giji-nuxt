bodyParser = require 'body-parser'
express = require 'express'
config = require '../config/webpack/index.coffee'
# { Nuxt, Module, Renderer, Utils, Builder, Generator, Options } = require 'nuxt'
{ Nuxt, Builder } = require 'nuxt'

{ pm_id, HOST, ONLY_VUE } = process.env
process.on 'unhandledRejection', console.dir

host = HOST || '127.0.0.1'
port = 4000 + (pm_id - 0 || 0)

app = express()
app.use bodyParser.json()
app.use (req, res, next)->
  res.header "Access-Control-Allow-Origin", "*"
  res.header "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  next()


unless ONLY_VUE
  require("./agenda.coffee")(app)
  require("./mongodb.coffee")(app)
  require("./mongoose.coffee")(app)
  require("./session.coffee")(app)
  require("./passport.coffee")(app)
require("./test-data.coffee")(app)


console.log process.env

nuxt = new Nuxt config
if config.dev
  try
    builder = new Builder nuxt
    # builder = nuxt
    builder.build()
  catch err
    console.error err
    process.exit(1)

app.use nuxt.render
app.listen port, host
console.log("Server is listening on http://#{host}:#{port}")
