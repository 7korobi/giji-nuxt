require 'coffeescript/register'
express = require 'express'

host = process.env.HOST || '127.0.0.1'
port = process.env.PORT || '4000'


app = express()
api = require "./api/index.coffee"
api app


config = require './nuxt.config.js'
Nuxt = require 'nuxt'
nuxt = new Nuxt config
if config.dev
  nuxt.build()
  .catch (err)->
    console.error err
    process.exit(1)

app.use nuxt.render


app.listen port, host
console.log("Server is listening on http://#{host}:#{port}")
