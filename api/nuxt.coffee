config = require '../config/webpack/index.coffee'
# { Nuxt, Module, Renderer, Utils, Builder, Generator, Options } = require 'nuxt'
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

module.exports = (app, env)->
  app.use nuxt.render
