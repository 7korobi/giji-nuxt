bodyParser = require 'body-parser'
express = require 'express'
config = require './nuxt.config.js'
Nuxt = require 'nuxt'


host = process.env.HOST || '127.0.0.1'
port = 4000 + parseInt process.env.pm_id ? 0

app = express()
app.use bodyParser.json()
app.use (req,res,next)->
  res.header "Access-Control-Allow-Origin", "*"
  res.header "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  next()


require("./agenda.coffee")(app)
require("./mongodb.coffee")(app)
require("./mongoose.coffee")(app)
require("./session.coffee")(app)
require("./passport.coffee")(app)
require("./test-data.coffee")(app)


do ->
  nuxt = await new Nuxt config
  app.use nuxt.render
  app.listen port, host

  console.log process.env
  console.log("Server is listening on http://#{host}:#{port}")

  if config.dev
    try
      await nuxt.build()
    catch err
      console.error err
      process.exit(1)

