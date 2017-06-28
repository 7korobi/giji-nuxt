require 'coffeescript/register'
express = require 'express'

host = process.env.HOST || '127.0.0.1'
port = 4000 + parseInt process.env.pm_id ? 0

console.log process.env

app = express()
api = require "./api/index.coffee"
api app


config = require './nuxt.config.js'
Nuxt = require 'nuxt'

do ->
  nuxt = await new Nuxt config
  app.use nuxt.render
  app.listen port, host
  console.log("Server is listening on http://#{host}:#{port}")

  if config.dev
    try
      await nuxt.build()
    catch err
      console.error err
      process.exit(1)

