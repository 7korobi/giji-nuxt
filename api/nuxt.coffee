config = require '../config/webpack/index.coffee'
config.dev = ! ( process.env.NODE_ENV == 'production' )

{ Nuxt, Builder } = require 'nuxt'

nuxt = new Nuxt config

if config.dev
  try
    builder = new Builder nuxt
    # builder = nuxt
    builder.build()
  catch err
    console.error err
    process.exit(1)

module.exports = (app)->
  app.use nuxt.render
