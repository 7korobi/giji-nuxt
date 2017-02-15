app = require('express')()
Nuxt = require 'nuxt'
session = require 'express-session'
bodyParser = require 'body-parser'

host = process.env.HOST || '127.0.0.1'
port = process.env.PORT || '3000'

# Body parser, to access req.body
app.use bodyParser.json()
app.use session
  secret: 'super-secret-key'
  resave: false
  saveUninitialized: false
  cookie: { maxAge: 60000 }

app.get '/api/test', (req, res)->
  res.json
    a: 1
  res.status(401).json
    error: "bad credentials"


config = require('./nuxt.config.js')
config.dev = process.env.NODE_ENV != 'production'

nuxt = new Nuxt config
app.use nuxt.render
if config.dev
  nuxt.build()
  .catch (err)->
    console.error err
    process.exit(1)

app.listen port, host
console.log("Server is listening on http://#{host}:#{port}")
