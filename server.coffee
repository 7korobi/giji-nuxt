bodyParser = require 'body-parser'
express = require 'express'
session = require 'express-session'
Nuxt = require 'nuxt'

host = process.env.HOST || '127.0.0.1'
port = process.env.PORT || '3000'

# Body parser, to access req.body
app = express()
app.use bodyParser.json()
app.use session
  secret: process.env.SECRET_KEY_BASE
  resave: false
  saveUninitialized: false
  cookie: { maxAge: 60000 }
require("./api/passport.coffee")(app)

config = require('./nuxt.config.js')
config.dev = process.env.NODE_ENV != 'production'

nuxt = new Nuxt config
app.use nuxt.render
if config.dev
  nuxt.build()
  .catch (err)->
    console.error err
    process.exit(1)



app.get '/api/test', (req, res)->
  res.json
    a: 1
  res.status(401).json
    error: "bad credentials"

app.listen port, host
console.log("Server is listening on http://#{host}:#{port}")
